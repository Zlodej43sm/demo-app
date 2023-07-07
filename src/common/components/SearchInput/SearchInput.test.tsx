import React from "react";

import { render } from "../../../test-utils";
import SearchInput from ".";

describe("SearchInput", () => {
  const props = {
    onSearch: jest.fn(),
  };

  it("SHOULD match snapshot", () => {
    const { container } = render(<SearchInput {...props} />);
    expect(container).toMatchSnapshot();
  });
});
