import React, { ComponentType } from "react";
import { Provider } from "react-redux";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { appMessages } from "./lang";
import { LANG_CODES } from "./common/constants";
import themeOptions from "./common/theme";
import AppStore from "./redux/store";
import SpreadsheetPage from "./pages/SpreadsheetPage";

const cache = createIntlCache();

const App: ComponentType = () => {
  const theme = createTheme({ ...(themeOptions as ThemeOptions) });
  const intl = createIntl(
    {
      locale: LANG_CODES.EN,
      messages: appMessages(LANG_CODES.EN),
    },
    cache
  );

  return (
    <Box id="DummyApp">
      <Provider store={AppStore}>
        <ThemeProvider theme={theme}>
          <RawIntlProvider value={intl} key={LANG_CODES.EN}>
            <SpreadsheetPage />
          </RawIntlProvider>
        </ThemeProvider>
      </Provider>
    </Box>
  );
};

export default App;
