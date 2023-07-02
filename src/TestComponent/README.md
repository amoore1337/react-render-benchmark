# `TestComponent` Wiring Instructions

In order to integrate your component with the benchmarker, it is expected that you provide valid React `Component` for testing. The `index.tsx` file in this directory is intended to define and export valid `testConfig` object that the benchmarker will then consume.

The `testConfig` object consists of the following fields:

1. `Component: FC<TProps>`: This is the only required field. Its value should be the component you would like to benchmark.

2. `createProps?: (args: Partial<TArgs>) => Promise<TProps>`: Optional function used to create any props needed by your component. The execution time to build these props will not impact the measured render time of your `Component` so expensive computations are ok. When the benchmarker calls this function, it will provide any settings values established via the `Settings` component config option.

3. `updateProps?: (currentProps: TProps) => TProps`: This function is only necessary if you'd like to evaluate re-render time of your `Component`. When called by the benchmarker, it will provide the current `props` definition for easy modification.

4. `Settings?: FC<{ [key: string]: string }>`: Optional Settings UI that will be slotted into the benchmarker's settings modal in the top right of the screen. When settings are saved, the `name` attribute used on `<input />` elements will comprise the key/value pair when passed to the `createProps` function.
