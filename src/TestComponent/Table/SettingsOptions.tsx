export function SettingsOptions(props: { [key: string]: string }) {
  return (
    <>
      <label className="flex items-center" htmlFor="numCols">
        Number of Columns:
      </label>
      <input
        id="numCols"
        type="number"
        name="numColumns"
        className="rounded border border-gray-800 p-1"
        defaultValue={props.numColumns ?? 50}
      />
      <label className="flex items-center" htmlFor="numCols">
        Number of Rows:
      </label>
      <input
        id="numRows"
        type="number"
        name="numRows"
        className="rounded border border-gray-800 p-1"
        defaultValue={props.numRows ?? 1000}
      />
    </>
  );
}
