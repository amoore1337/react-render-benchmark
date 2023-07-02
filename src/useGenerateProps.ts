import React from "react";
import { type TestComponentConfig } from "./utils";

export function useGenerateProps<TProps, TArgs>(
  createProps: TestComponentConfig<TProps, TArgs>["createProps"],
  updateProps: TestComponentConfig<TProps, TArgs>["updateProps"]
) {
  const [props, setProps] = React.useState<TProps>();
  const [loading, setLoading] = React.useState(false);

  const nonReactiveProps = React.useRef<TProps | undefined>(props);

  const buildComponentProps = React.useCallback(
    async (args: Partial<TArgs>) => {
      // (async () => {
      // })();
      setLoading(true);
      const result = await createProps?.(args);
      nonReactiveProps.current = result;
      setProps(result);
      setLoading(false);
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

  return { props, loading, buildComponentProps, updateComponentProps };
}
