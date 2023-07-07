import { makeStyles } from "@mui/styles";

export const COMPONENT_NAME = "Spreadsheet";

export default makeStyles(
  (theme: any) => ({
    editBoxRoot: {
      position: "relative",
      zIndex: 1,

      "&:not($editBoxLast)::after": {
        content: "''",
        borderRight: `1px solid ${theme.palette.grey["300"]}`,
        position: "absolute",
        opacity: 0.4,
        top: -6,
        bottom: -6,
        right: -10,
      },
    },
    editIcon: {
      position: "absolute",
      right: -2,
      bottom: -2,
    },
    editBoxLast: {},
    editFieldRoot: {
      "& input": {
        textAlign: "center",
      },
    },
  }),
  { name: COMPONENT_NAME }
);
