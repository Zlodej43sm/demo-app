import { makeStyles } from "@mui/styles";

export const COMPONENT_NAME = "Spreadsheet";

const selectedStyles = (color: string) => ({
  position: "relative",
  zIndex: 5,
  cursor: "pointer",
  borderColor: "transparent",
  outline: "1px solid transparent",
  borderRadius: 5,
  boxShadow: `-1px 0 5px ${color}`,
});

export default makeStyles(
  (theme: any) => ({
    tableContainerRoot: {
      paddingTop: theme.spacing(0.5),
      maxWidth: 615,
      minWidth: 615,

      "& $tableSearchBarCellRoot": {
        padding: 0,
        border: "0 none",
      },
      "& $tableCellRoot": {
        ...theme.typography.body1,
        color: theme.palette.primary.main,
        padding: theme.spacing(),
        border: "0 none",
      },

      "& $addRowButtonRoot": {
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: theme.spacing(1.25),
      },
    },
    tableHeadRoot: {
      top: theme.spacing(1.25),
      position: "sticky",
      zIndex: 3,
    },
    tableHeadRowRoot: {
      borderBottom: `${theme.spacing(1.25)} solid white`,
      "& $tableCellRoot": {
        backgroundColor: theme.palette.grey["50"],
      },
      "& $tableCellRoot:first-child": {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
      "& $tableCellRoot:last-child": {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      },
    },
    tableBodyRoot: {
      "& $tableRowRoot:not($error) $tableCellRoot": {
        backgroundColor: theme.palette.grey["10"],
      },
      "& $tableRowRoot": {
        border: "3px solid white",
        outline: "1px solid transparent",
        "&$selected": selectedStyles(theme.palette.grey["200"]),
        "&:hover:not($error)": selectedStyles(theme.palette.grey["200"]),
      },
      "& $error": selectedStyles(theme.palette.error.main),
    },
    tableCellRoot: {
      "&:not(:last-of-type)": {
        width: "30%",
      },
      "&:last-of-type": {
        width: "40%",
      },
    },
    tableRowRoot: {},
    tableSearchBarCellRoot: {},
    tableCellHead: {},
    addRowButtonRoot: {},
    selected: {},
    error: {
      "& td": {
        backgroundColor: theme.palette.error.light,
      },
    },
  }),
  { name: COMPONENT_NAME }
);
