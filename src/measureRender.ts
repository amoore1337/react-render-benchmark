const markName = "reactRender" as const;
export const measureDoneEvent = `${markName}_done` as const;

function RenderTimer() {
  let timerActive = false;

  return {
    start: () => {
      timerActive = true;
      window.performance.mark(`${markName}_start`);
    },
    stop: () => {
      if (timerActive) {
        window.performance.mark(`${markName}_stop`);
        timerActive = false;
        const event = new Event(measureDoneEvent);
        window.document.dispatchEvent(event);
      }
    },
    getEllapsedTime: () =>
      window.performance.measure(
        `${markName}_time`,
        `${markName}_start`,
        `${markName}_stop`
      ),
    clear: () => {
      window.performance.clearMarks();
      window.performance.clearMeasures();
    },
  };
}

export const measureRender = RenderTimer();
