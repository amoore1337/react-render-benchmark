# React Render Benchmark

A framework for deeply measuring the render performance of a component.

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

5. Click `Run` or `Begin Benchmark`:

```
'Run': Execute a single test of the selected type.
'Begin Benchmark': Execute a series test runs to obtain a more accurate average of render timings. The number of test runs can be configured in the Settings modal in the top right.
```
