import { type FC } from "react";

export interface TestComponentConfig<TProps, TArgs> {
  Component: FC<TProps>;
  createProps?: (args: Partial<TArgs>) => Promise<TProps>;
  updateProps?: (currentProps: TProps) => TProps;
  Settings?: FC<{ [key: string]: string }>;
}

export type BaseTestSettings = {
  testRunCount: string;
};

export function randomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export const renderCompleteEvent = "reactTestRenderComplete" as const;
