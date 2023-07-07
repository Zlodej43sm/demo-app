import { combineReducers } from "redux";
import SpreadsheetReducer from "./SpreadsheetSlice";

const appReducers = combineReducers({
  spreadsheet: SpreadsheetReducer,
});

export default appReducers;
