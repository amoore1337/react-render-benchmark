import { MixerVerticalIcon } from "@radix-ui/react-icons";
import testConfig from "./TestComponent";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTrigger,
} from "./shared/Modal";
import { type BaseTestSettings } from "./utils";

type Settings = { [key: string]: string } & BaseTestSettings;

interface Props<S extends Settings> {
  currentSettings: S;
  onSave: (settings: S) => void;
}

const settingsForm = "renderSettingsForm" as const;

export function RenderSettings<S extends Settings>({
  currentSettings,
  onSave,
}: Props<S>) {
  const handleSave = () => {
    const form = document.getElementById(settingsForm) as HTMLFormElement;
    const settings: Settings = { testRunCount: "10" };
    if (form) {
      const formData = new FormData(form);
      formData.forEach((value, key) => (settings[key] = value as string));
    }

    onSave(settings as S);
  };

  return (
    <Modal>
      <ModalTrigger asChild>
        <button className="mr-3 rounded-full border border-solid border-white bg-white p-1 text-gray-800 hover:bg-gray-200">
          <MixerVerticalIcon className="" />
        </button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader title="Render Settings" />
        <div className="p-4">
          <form id={settingsForm} className="grid grid-cols-2 gap-4">
            <label className="flex items-center" htmlFor="numTestRuns">
              Test Runs:
            </label>
            <input
              id="numTestRuns"
              type="number"
              name="testRunCount"
              className="rounded border border-gray-800 p-1"
              defaultValue={currentSettings.testRunCount}
            />
            {testConfig.Settings && (
              <testConfig.Settings {...currentSettings} />
            )}
          </form>
          <div className="mt-8 flex w-full items-center justify-center">
            <ModalClose asChild>
              <button
                className="rounded border border-gray-800 px-3 py-1 hover:bg-gray-200"
                onClick={handleSave}
              >
                Save
              </button>
            </ModalClose>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
