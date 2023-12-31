# [POC] React Render Benchmark

A framework for deeply measuring the render performance of a component.

> **NOTE:** To be really useful, this would need to be an installable module that could live alongside an existing codebase. Similar to Storybook, but for performance measuring. This project exists for some quick experimentation and prove out the utility.

## Setup Steps

1. Clone this repo locally and install dependencies.

```bash
$ git clone git@github.com:amoore1337/react-render-benchmark.git
$ cd react-render-benchmark && npm install
```

> **Note**: Ensure you are using Node 18. 2. Define the component you'd like to benchmark within the `src/TestComponent` directory. Check out the README within the directory for detailed steps for how to wire up your component with the benchmarker.

3. For a prod-like performance benchmark, build and statically serve the JS assets:

```bash
$ npm run build && npm run preview
```

4. Toggle which type of benchmark you'd like to run:

```
'Initial Render': Test rendering the component from scratch. The benchmark will measure the entire time required to build the tree and paint to the browser

'Re-Render': Measure the time taken to apply prop updates to the already rendered component.
```

5. Click `Begin Benchmark`. This will execute a series test runs to an average of render timings. The number of test runs can be configured in the Settings modal in the top right.
   > **Note**: A series of 'warmup' runs will occur before the actual benchmark. This is to help reduce _cold start_ impacts.
