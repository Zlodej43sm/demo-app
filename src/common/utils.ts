export type Data = Record<"id" | "value" | "formula", string>;
export type DataProps = Data[][] | [];
export type DataByIdProps = Record<string, number[]>;
export type ProgressProps = {
  rowIndex: number;
  id?: string;
  status?: string;
  done_at?: string;
};

const celCoordinateRegExp = new RegExp(/^=|([A-Z][0-9])|,/gi);

export const getComputedFormula = (
  formula: string,
  dataById: DataByIdProps,
  data: DataProps
): string => {
  try {
    const formattedFormula = formula.replaceAll(
      celCoordinateRegExp,
      (x: string) => {
        // TODO: AlecP extend in case more real Math support
        switch (x) {
          case "=": {
            return "";
          }
          case ",": {
            return ".";
          }
          default: {
            const celCoordinate = (x[0].toUpperCase() +
              +x.slice(1)) as keyof DataByIdProps;
            if (dataById[celCoordinate]) {
              const [rowIdx, colIdx] = dataById[celCoordinate];
              const celData = data[rowIdx][colIdx] as Data;
              return celData?.value ?? "0";
            } else {
              return "0";
            }
          }
        }
      }
    );
    // TODO: AlecP bad but working practice, never execute in a such way
    return eval(formattedFormula);
  } catch (e) {
    return "N/A";
  }
};
