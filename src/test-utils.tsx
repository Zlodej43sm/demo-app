import React, { ComponentType, PropsWithChildren } from "react";
import { createIntl, RawIntlProvider } from "react-intl";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { LANG_CODES } from "./common/constants";
import { appMessages } from "./lang";

const theme = createTheme({
  palette: {},
});
const intl = createIntl({
  locale: LANG_CODES.EN,
  messages: appMessages(LANG_CODES.EN),
});

const AllTheProviders: ComponentType<PropsWithChildren> = ({
  children,
}): any => (
  <ThemeProvider theme={theme}>
    <RawIntlProvider value={intl}>{children}</RawIntlProvider>
  </ThemeProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

const mockAppStore = {
  spreadsheet: {
    data: [
      [
        {
          id: "A0",
          value: "3",
          formula: "",
        },
        {
          id: "B0",
          value: "18",
          formula: "",
        },
        {
          id: "C0",
          value: 13.5,
          formula: "=12 + 3 / (2)",
        },
      ],
    ],
    byId: {
      A0: [0, 0],
      B0: [0, 1],
      C0: [0, 2],
    },
    progress: {},
    loading: false,
    error: false,
  },
};

export { customRender as render, mockAppStore };
