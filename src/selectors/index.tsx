import { RootState } from "../redux/store";

const selectSpreadsheet = (state: RootState) => state.spreadsheet;

export const selectSpreadsheetData = (state: RootState) =>
  selectSpreadsheet(state).data;
export const selectSpreadsheetDataById = (state: RootState) =>
  selectSpreadsheet(state).byId;

export const selectSpreadsheetProgressStatus = (state: RootState) =>
  selectSpreadsheet(state).progress;
export const selectSpreadsheetError = (state: RootState) =>
  selectSpreadsheet(state).error;
