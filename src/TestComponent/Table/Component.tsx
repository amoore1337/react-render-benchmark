import { useMeasureComponentRender } from "../useMeasureComponentRender";
import { type Props } from "./types";

export function Component({ data, columns }: Props) {
  useMeasureComponentRender();

  return (
    <table>
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c}
              className="border border-r-0 border-solid border-gray-800 bg-gray-200 last:border-r"
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((c, i) => (
              <td
                key={`${index}_${i}_${row[c]}`}
                className="border border-r-0 border-solid border-gray-800 p-1 last:border-r"
              >
                {row[c]}
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
