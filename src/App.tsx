import clsx from "clsx";
import React from "react";
import { RenderSettings } from "./RenderSettings";
import testConfig from "./TestComponent";
import { measureDoneEvent, measureRender } from "./measureRender";
import { useGenerateProps } from "./useGenerateProps";
import { renderCompleteEvent, type BaseTestSettings } from "./utils";

type Settings = Parameters<NonNullable<typeof testConfig.createProps>>[0] &
  BaseTestSettings;

const warmupCount = 5 as const;

function App() {
  const [settings, setSettings] = React.useState<Settings>({
    testRunCount: "10",
  });

  const [testType, setTestType] = React.useState<"initial" | "rerender">(
    "initial"
  );
  const [renderComponent, setRenderComponent] = React.useState(false);

  const { props, buildComponentProps, updateComponentProps } = useGenerateProps(
    testConfig.createProps,
    testConfig.updateProps
  );

  const benchmarkRun = React.useRef<{
    active: boolean;
    count: number;
    log: number[];
  }>({ active: false, count: 0, log: [] });

  const rerenderRun = React.useRef<{
    rendered: boolean;
    updated: boolean;
  }>({ rendered: false, updated: false });

  const handleStartReRender = React.useCallback(() => {
    if (!rerenderRun.current.rendered) {
      rerenderRun.current = { rendered: true, updated: false };
      setRenderComponent(true);
    } else if (!rerenderRun.current.updated) {
      updateComponentProps();
      measureRender.clear();
      measureRender.start();
      rerenderRun.current.updated = true;
    }
  }, [updateComponentProps]);

  const handleStartRender = React.useCallback(() => {
    buildComponentProps(settings);
    setRenderComponent(true);
    measureRender.start();
  }, [buildComponentProps, settings]);

  const handleRun = React.useCallback(() => {
    if (testType === "initial") {
      handleStartRender();
    } else {
      handleStartReRender();
    }
  }, [handleStartReRender, handleStartRender, testType]);

  const handleReset = React.useCallback(() => {
    setRenderComponent(false);
    rerenderRun.current = { rendered: false, updated: false };
    benchmarkRun.current = { active: false, count: 0, log: [] };
    measureRender.clear();
    clearResults();
    actionButtonsDisabled(false);
  }, []);

  const saveRenderSettings = React.useCallback(
    (newSettings: Settings) => {
      setSettings(newSettings);
      handleReset();
      buildComponentProps(newSettings);
    },
    [handleReset, buildComponentProps]
  );

  const handleTestRunStep = React.useCallback(() => {
    if (benchmarkRun.current.active) {
      const { duration } = measureRender.getEllapsedTime();
      benchmarkRun.current.log.push(duration);
      benchmarkRun.current.count++;
      const maxTestRuns = parseInt(settings.testRunCount, 10) + warmupCount;
      displayBenchmarkResult(benchmarkRun.current.log, maxTestRuns);
      if (benchmarkRun.current.count < maxTestRuns) {
        if (testType === "initial") {
          setRenderComponent(false);
          rerenderRun.current = { rendered: false, updated: false };
        } else {
          rerenderRun.current = { rendered: true, updated: false };
        }
        setTimeout(() => handleRun(), 500);
      } else {
        benchmarkRun.current.active = false;
      }
    }
  }, [settings.testRunCount, testType, handleRun]);

  const handleMeasureDone = React.useCallback(() => {
    if (rerenderRun.current.rendered) {
      rerenderRun.current.updated = true;
    }
    if (benchmarkRun.current.active) {
      handleTestRunStep();
    } else {
      displayResults();
    }
  }, [handleTestRunStep]);

  const handleRenderDone = React.useCallback(() => {
    if (
      testType === "rerender" &&
      rerenderRun.current.rendered &&
      !rerenderRun.current.updated
    ) {
      handleStartReRender();
    }
  }, [handleStartReRender, testType]);

  React.useEffect(() => {
    document.addEventListener(measureDoneEvent, handleMeasureDone);

    return () =>
      document.removeEventListener(measureDoneEvent, handleMeasureDone);
  }, [handleMeasureDone]);

  React.useEffect(() => {
    document.addEventListener(renderCompleteEvent, handleRenderDone);

    return () =>
      document.removeEventListener(renderCompleteEvent, handleRenderDone);
  }, [handleRenderDone]);

  const handleStartBenchmark = React.useCallback(() => {
    actionButtonsDisabled(true);
    benchmarkRun.current = { active: true, count: 0, log: [] };
    if (benchmarkRun.current.count < parseInt(settings.testRunCount, 10)) {
      handleRun();
    }
  }, [settings.testRunCount, handleRun]);

  return (
    <>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <div className="flex flex-shrink-0 items-center justify-between bg-gray-800 px-6 py-4">
          <h1 className="text-lg font-bold text-white">
            React Render Benchmark
          </h1>
          <RenderSettings
            currentSettings={settings}
            onSave={saveRenderSettings}
          />
        </div>
        <div className="flex w-full flex-shrink-0 items-center justify-between px-6 py-8 text-gray-800">
          <div className="testActions flex items-center">
            {testConfig.updateProps && (
              <button
                className={clsx(
                  "mr-4 rounded border disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
                  {
                    ["border-sky-600 bg-sky-600 p-2 text-white hover:bg-sky-800"]:
                      testType === "initial",
                    ["border-green-600 bg-green-600 p-2 text-white hover:bg-green-800"]:
                      testType === "rerender",
                  }
                )}
                onClick={() =>
                  setTestType((t) => (t === "initial" ? "rerender" : "initial"))
                }
              >
                {`Test Type: ${
                  testType === "initial" ? "Initial Render" : "Re-Render"
                }`}
              </button>
            )}
            <button
              className=" ml-4 rounded border border-gray-800 p-2 hover:bg-gray-200 disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
              onClick={handleStartBenchmark}
            >
              Begin Benchmark
            </button>
            <div className="px-6">
              <div id="result-display" />
            </div>
          </div>
          {renderComponent && (
            <button
              className="rounded border border-gray-800 p-2 hover:bg-gray-200"
              onClick={() => handleReset()}
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex-1 overflow-auto">
          {renderComponent && props && <testConfig.Component {...props} />}
        </div>
      </div>
    </>
  );
}

function displayResults() {
  const { duration } = measureRender.getEllapsedTime();
  const displayTarget = document.getElementById("result-display");
  if (displayTarget) {
    displayTarget.innerHTML = `Total render time: <span class="font-bold">${Math.round(
      duration
    )}ms</span>`;
  }
}

function displayBenchmarkResult(log: number[], maxRuns: number) {
  const displayTarget = document.getElementById("result-display");
  const numOfRuns = log.length;
  if (displayTarget) {
    if (numOfRuns < warmupCount) {
      displayTarget.innerHTML = "Warming up...";
      return;
    }
    const lastRun = Math.round(log[numOfRuns - 1]);
    const adjustedLogs = log.slice(warmupCount);
    const adjustedMaxRuns = maxRuns - warmupCount;
    const adjustedNumOfRuns = numOfRuns - warmupCount;
    if (adjustedNumOfRuns < 1) {
      return;
    }
    const avg = Math.floor(
      adjustedLogs.reduce((sum, v) => sum + v, 0) / adjustedNumOfRuns
    );

    displayTarget.innerHTML = `
      Render ${adjustedNumOfRuns} of ${adjustedMaxRuns}: <span class="font-bold">${lastRun}ms</span> 
      Avg: <span class="font-bold">${avg}ms</span> 
      Min: <span class="font-bold">${Math.round(
        Math.min(...adjustedLogs)
      )}ms</span> 
      Max: <span class="font-bold">${Math.round(
        Math.max(...adjustedLogs)
      )}ms</span> 
    `;
  }
}

function actionButtonsDisabled(disabled: boolean) {
  document.querySelectorAll(".testActions button").forEach((btn) => {
    (btn as HTMLButtonElement).disabled = disabled;
  });
}

function clearResults() {
  const displayTarget = document.getElementById("result-display");
  if (displayTarget) {
    displayTarget.innerHTML = "";
  }
}

export default App;
