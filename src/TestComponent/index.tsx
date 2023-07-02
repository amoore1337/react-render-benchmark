import { type TestComponentConfig } from "../utils";
import {
  Component,
  SettingsOptions,
  createProps,
  updateProps,
  type BuildArgs,
  type Props,
} from "./Table";

const testConfig: TestComponentConfig<Props, BuildArgs> = {
  Component,
  createProps,
  updateProps,
  Settings: SettingsOptions,
};

export default testConfig;
