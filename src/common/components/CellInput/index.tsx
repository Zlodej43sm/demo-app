import React, {
  useState,
  useEffect,
  ComponentType,
  SetStateAction,
  Dispatch,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Input } from "@mui/material";

import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import {
  selectSpreadsheetData,
  selectSpreadsheetDataById,
} from "../../../selectors";
import { AppDispatch } from "../../../redux/store";
import useStyles from "./styles";
import {
  computeCellValue,
  setProgressStatus,
  saveData,
} from "../../../redux/SpreadsheetSlice";

export type CurrentSelectedRowProp = null | number;

export type Props = {
  id: string;
  setCurrentEditRow: Dispatch<SetStateAction<CurrentSelectedRowProp>>;
};

const CellInput: ComponentType<Props> = ({ id, setCurrentEditRow }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const spreadsheetDataById = useSelector(selectSpreadsheetDataById);
  const spreadsheetData = useSelector(selectSpreadsheetData);
  const [rowIndex, colIndex] = spreadsheetDataById[id];
  const { value, formula } = spreadsheetData[rowIndex][colIndex];
  const [inputValue, setInputValue] = useState(formula || value);

  useEffect(() => {
    dispatch(computeCellValue({ id, val: inputValue }));
  }, [dispatch, id, inputValue, spreadsheetData]);

  const onEditClick = () => {
    setIsEdit(true);
    setCurrentEditRow(rowIndex);
  };
  const onInputBlur = () => {
    setIsEdit(false);
    setCurrentEditRow(null);
    dispatch(setProgressStatus({ rowIndex }));
    dispatch(saveData({ id, data: spreadsheetData }));
  };
  const onInputChange = (val: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(val.currentTarget.value);
  };

  return (
    <Box
      onClick={onEditClick}
      className={
        colIndex === 2
          ? `${classes.editBoxLast} ${classes.editBoxRoot}`
          : classes.editBoxRoot
      }
    >
      {isEdit ? (
        <Input
          disableUnderline
          classes={{ root: classes.editFieldRoot }}
          onBlur={onInputBlur}
          onChange={onInputChange}
          autoFocus
          value={inputValue}
        />
      ) : (
        value || "NaN"
      )}
      <EditIcon className={classes.editIcon} />
    </Box>
  );
};

export default CellInput;
