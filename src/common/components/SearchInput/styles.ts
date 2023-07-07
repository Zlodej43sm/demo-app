import { makeStyles } from "@mui/styles";

export const COMPONENT_NAME = "SearchInput";

export default makeStyles(
  (theme: any) => ({
    root: {
      width: "100%",
      position: "relative",
      borderRadius: 5,
      minHeight: 29,
      backgroundColor: theme.palette.grey["100"],
      marginBottom: theme.spacing(2),
    },
    searchIconRoot: {
      position: "absolute",
      left: theme.spacing(),
      color: theme.palette.grey["300"],
    },
    inputWrapperRoot: {
      "& .MuiInputBase-input": {
        position: "relative",
        zIndex: 333,
        padding: theme.spacing(0.75, 0.75, 0.75, 4.5),
        fontSize: "12px",
      },
    },
  }),
  { name: COMPONENT_NAME }
);
