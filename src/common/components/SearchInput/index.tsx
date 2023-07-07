import React, { ComponentType } from "react";
import { useIntl } from "react-intl";
import { Box, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import useStyles from "./styles";

type Props = {
  onSearch: () => void;
};

const SearchInput: ComponentType<Props> = ({ onSearch }) => {
  const { formatMessage } = useIntl();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Input
        fullWidth
        disableUnderline
        onInput={onSearch}
        startAdornment={
          <SearchIcon className={classes.searchIconRoot} fontSize="small" />
        }
        classes={{ root: classes.inputWrapperRoot }}
        placeholder={formatMessage({ id: "input.filter.placeholder" })}
        type="search"
      />
    </Box>
  );
};

export default SearchInput;
