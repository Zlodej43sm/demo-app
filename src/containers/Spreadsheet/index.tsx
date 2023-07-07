import React, { useState, useEffect, ComponentType } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

import {
  HEADER_COLUMNS_LIST,
  SERVICE_TEXT,
  PROGRESS_STATUS,
} from "../../common/constants";
import {
  selectSpreadsheetData,
  selectSpreadsheetError,
  selectSpreadsheetProgressStatus,
} from "../../selectors";
import { AppDispatch } from "../../redux/store";
import { fetchData, getStatus } from "../../redux/SpreadsheetSlice";
import SearchInput from "../../common/components/SearchInput";
import CellInput, {
  CurrentSelectedRowProp,
} from "../../common/components/CellInput";
import useStyles from "./styles";

const Spreadsheet: ComponentType = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const [currentEditRow, setCurrentEditRow] =
    useState<CurrentSelectedRowProp>(null);
  const spreadsheetData = useSelector(selectSpreadsheetData);
  const isError = useSelector(selectSpreadsheetError);
  const currentProgressStatus = useSelector(selectSpreadsheetProgressStatus);
  const { formatMessage } = useIntl();
  const getActiveRowClass = (rowIndex: number): string => {
    let rowClassName = currentEditRow === rowIndex ? classes.selected : "";

    if (isError && currentProgressStatus?.rowIndex === rowIndex) {
      rowClassName = classes.error;
    }

    return rowClassName;
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const { status, done_at, id } = currentProgressStatus;
    let getStatusTimeout: any;
    if (PROGRESS_STATUS.IN_PROGRESS === status && id && done_at) {
      const doneAtTs = new Date(done_at).getTime();
      const nowTs = new Date().getTime();
      // @TODO: dont ask why, just because fast and demo usage
      const diffTs = Math.abs(doneAtTs - nowTs);
      getStatusTimeout = setTimeout(() => {
        dispatch(getStatus({ id }));
      }, diffTs);
    }
    return () => {
      clearTimeout(getStatusTimeout);
    };
  }, [dispatch, currentProgressStatus]);

  const onAddRowHandler = () => {
    alert(SERVICE_TEXT);
  };
  const onFilterSearchHandler = () => {
    alert(SERVICE_TEXT);
  };

  return (
    <TableContainer
      classes={{ root: classes.tableContainerRoot }}
      style={{ overflowX: "initial" }}
    >
      <Table>
        <TableHead classes={{ root: classes.tableHeadRoot }}>
          <TableRow>
            <TableCell
              classes={{ root: classes.tableSearchBarCellRoot }}
              colSpan={3}
            >
              <SearchInput onSearch={onFilterSearchHandler} />
            </TableCell>
          </TableRow>
          <TableRow classes={{ root: classes.tableHeadRowRoot }}>
            {HEADER_COLUMNS_LIST.map((colValue) => (
              <TableCell
                key={`col-${colValue}`}
                align="center"
                classes={{ root: classes.tableCellRoot }}
              >
                {colValue}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody classes={{ root: classes.tableBodyRoot }}>
          {spreadsheetData.map((row, rowIndex) => (
            <TableRow
              classes={{ root: classes.tableRowRoot }}
              className={getActiveRowClass(rowIndex)}
              key={`row-${rowIndex}`}
            >
              {row.map(({ id, value, formula }, colIndex) => (
                <TableCell
                  key={`row-${colIndex}`}
                  align="center"
                  classes={{ root: classes.tableCellRoot }}
                >
                  <CellInput id={id} setCurrentEditRow={setCurrentEditRow} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="outlined"
        onClick={onAddRowHandler}
        classes={{ root: classes.addRowButtonRoot }}
      >
        {formatMessage({ id: "button.add.row" })}
      </Button>
    </TableContainer>
  );
};

export default Spreadsheet;
