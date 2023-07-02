import { randomNumber } from "../../utils";
import { type BuildArgs, type Props } from "./types";

export async function createProps({
  numRows = "1000",
  numColumns = "50",
}: Partial<BuildArgs>): Promise<Props> {
  const columns = Array.from(Array(parseInt(numColumns, 10)).keys());

  const data = Array.from(Array(parseInt(numRows, 10))).map((_, index) => {
    const d: { [key: number]: number } = {};
    columns.forEach((c) => (d[c] = randomNumber(10_000)));
    d[0] = index;

    return d;
  });

  return { columns, data };
}

export function updateProps(props: Props): Props {
  // return { ...props };
  const newProps = { ...props };
  newProps.data[0][0] = randomNumber(100);
  return newProps;
}
