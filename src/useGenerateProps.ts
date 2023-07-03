import React from "react";
import { type TestComponentConfig } from "./utils";

export function useGenerateProps<TProps, TArgs>(
  createProps: TestComponentConfig<TProps, TArgs>["createProps"],
  updateProps: TestComponentConfig<TProps, TArgs>["updateProps"]
) {
  const [props, setProps] = React.useState<TProps>();

  const nonReactiveProps = React.useRef<TProps | undefined>(props);

  const buildComponentProps = React.useCallback(
    (args: Partial<TArgs>) => {
      const result = createProps?.(args);
      nonReactiveProps.current = result;
      setProps(result);
    },
    [createProps]
  );

  const updateComponentProps = React.useCallback(() => {
    if (nonReactiveProps.current && updateProps) {
      const updatedProps = updateProps(nonReactiveProps.current);
      nonReactiveProps.current = updatedProps;
      setProps(updatedProps);
    }
  }, [updateProps]);

  React.useEffect(() => {
    buildComponentProps({});
  }, [buildComponentProps]);

  return { props, buildComponentProps, updateComponentProps };
}
