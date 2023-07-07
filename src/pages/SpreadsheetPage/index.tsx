import React, { ComponentType } from "react";
import { useIntl } from "react-intl";
import { Container, Typography } from "@mui/material";

import Spreadsheet from "../../containers/Spreadsheet";
import useStyles from "./styles";

const SpreadsheetPage: ComponentType = () => {
  const { formatMessage } = useIntl();
  const classes = useStyles();

  return (
    <Container classes={{ root: classes.root }}>
      <Typography variant="h1">
        {formatMessage({ id: "spreadsheetpage.title" })}
      </Typography>
      <Spreadsheet />
    </Container>
  );
};

export default SpreadsheetPage;
