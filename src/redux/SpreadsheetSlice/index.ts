import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";

import { DUMMY_ROWS_LIST, PROGRESS_STATUS } from "../../common/constants";
import {
  DataProps,
  DataByIdProps,
  ProgressProps,
  getComputedFormula,
} from "../../common/utils";
import { LOCAL_SAVE_TEST_RES, fakeRequest } from "../utils";
import API_ROUTES from "../../api/routes";

const IS_MOCK_API = false;

const fetchData = createAsyncThunk("spreadsheet/fetchData", async () => {
  try {
    const data = fakeRequest({ data: [...DUMMY_ROWS_LIST] });
    return data;
  } catch (err) {
    console.error(err);
  }
});

const saveData = createAsyncThunk(
  "spreadsheet/saveData",
  async (params: { id: string; data: DataProps }) => {
    try {
      if (IS_MOCK_API) {
        // const data = await fakeRequest(LOCAL_SAVE_TEST_RES.FAIL, 700, true); //Error
        // const data = await fakeRequest(LOCAL_SAVE_TEST_RES.DONE); // Done
        const res = await fakeRequest(LOCAL_SAVE_TEST_RES.IN_PROGRESS); // In progress
        return res;
      } else {
        const res: any = await fetch(API_ROUTES.save.url, {
          method: API_ROUTES.save.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: params.data }),
        });
        return await res.json();
      }
    } catch (err) {
      console.error(err);
    }
  }
);

const getStatus = createAsyncThunk(
  "spreadsheet/getStatus",
  async (params: { id: string }) => {
    try {
      if (IS_MOCK_API) {
        const data = fakeRequest(LOCAL_SAVE_TEST_RES.FAIL, 700, true); //Error
        // const data = await fakeRequest(LOCAL_SAVE_TEST_RES.DONE); // Done
        // const data = await fakeRequest(LOCAL_SAVE_TEST_RES.IN_PROGRESS); // In progress
        return data;
      } else {
        const res: any = await fetch(`${API_ROUTES.getStatus.url}?${new URLSearchParams({ id: params.id })}`, {
          method: API_ROUTES.getStatus.method,
          headers: {
            "Content-Type": "application/json",
          },
        });
        return await res.json();
      }
    } catch (err) {
      console.error(err);
    }
  }
);

const computeCellValue = createAction<Record<"id" | "val", string>>(
  "spreadsheet/computeData"
);
const setProgressStatus = createAction<Record<"rowIndex", number>>(
  "spreadsheet/setProgressStatus"
);

const initialState = {
  byId: {} as DataByIdProps,
  data: [] as DataProps,
  progress: {} as ProgressProps,
  loading: false,
  error: false,
};

const SpreadsheetReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchData.fulfilled, (state, { payload }) => {
    try {
      const { data } = payload;
      const byId = data.reduce(
        (
          acc: Record<string, any>,
          row: Record<string, any>[],
          rowIdx: number
        ) => {
          row.forEach(({ id, ...rest }, colIdx) => {
            acc[id] = [rowIdx, colIdx];
          });
          return acc;
        },
        {}
      );
      for (const id in byId) {
        const [rowIdx, colIdx] = byId[id];
        const { formula } = data[rowIdx][colIdx];

        if (formula) {
          data[rowIdx][colIdx].value = getComputedFormula(formula, byId, data);
        }
      }

      return {
        data,
        byId,
        progress: state.progress,
        loading: false,
        error: false,
      };
    } catch (e) {
      return state;
    }
  });
  builder.addCase(fetchData.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(fetchData.rejected, (state) => ({
    ...state,
    loading: false,
    error: true,
  }));
  builder.addCase(saveData.fulfilled, (state, { payload }) => {
    return {
      ...state,
      progress: {
        ...state.progress,
        ...payload,
      },
      loading: false,
      error: !payload,
    };
  });
  builder.addCase(saveData.pending, (state, { payload }) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(saveData.rejected, (state, { payload }) => ({
    ...state,
    progress: {
      ...state.progress,
      status: PROGRESS_STATUS.FAILED,
    },
    loading: false,
    error: true,
  }));
  builder.addCase(getStatus.fulfilled, (state, { payload }) => ({
    ...state,
    progress: {
      ...state.progress,
      ...payload,
    },
    loading: false,
    error: false,
  }));
  builder.addCase(getStatus.pending, (state, { payload }) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getStatus.rejected, (state, { payload }) => ({
    ...state,
    loading: false,
    error: true,
  }));

  builder.addCase(setProgressStatus, (state, { payload }) => {
    const { rowIndex } = payload;
    const progress = {
      rowIndex,
    };

    return {
      ...state,
      progress,
    };
  });
  builder.addCase(computeCellValue, (state, { payload }) => {
    const { id, val } = payload;
    const { byId, data } = state;
    const isFormula = val.startsWith("=");
    const [rowIdx, colIdx] = byId[id];

    if (isFormula) {
      data[rowIdx][colIdx].value = getComputedFormula(val, byId, data);
      data[rowIdx][colIdx].formula = val;
    } else {
      data[rowIdx][colIdx].value = val;
    }

    return state;
  });
});

export { fetchData, saveData, getStatus, setProgressStatus, computeCellValue };
export default SpreadsheetReducer;
