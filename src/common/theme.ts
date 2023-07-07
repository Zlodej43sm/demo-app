import "@fontsource/montserrat";

const themeOptions = {
  palette: {
    primary: {
      main: "#000",
    },
    grey: {
      "10": "#FAFAFA",
      "50": "#EFEFEF",
      "100": "#F3F3F3",
      "200": "rgba(0, 0, 0, 0.25)",
      "300": "rgba(0, 0, 0, 0.3)",
    },
    error: {
      main: "#AF3434",
      light: "#FFEFEF",
    },
  },
  typography: {
    h1: {
      fontFamily: "montserrat",
      fontSize: 20,
      fontWeight: 700,
    },
    body1: {
      fontFamily: "montserrat",
      fontSize: 11,
      fontWeight: 400,
    },
  },
};

export default themeOptions;
