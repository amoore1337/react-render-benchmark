export interface Props {
  data: { [key: string | number]: string | number }[];
  columns: (string | number)[];
}

export interface BuildArgs {
  numRows: string;
  numColumns: string;
}
