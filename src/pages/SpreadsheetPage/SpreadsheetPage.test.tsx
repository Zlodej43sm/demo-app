import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { render, mockAppStore } from "../../test-utils";
import SpreadsheetPage from ".";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("SpreadsheetPage", () => {
  const mockedUseSelector = useSelector as jest.Mock<typeof useSelector>;
  const mockedDispatch = useDispatch as jest.Mock<typeof useDispatch>;
  const mockStore = {
    ...mockAppStore,
  };

  beforeEach(() => {
    mockedDispatch.mockReturnValue(jest.fn());
    mockedUseSelector.mockImplementation((selector) => selector(mockStore));
  });

  it("SHOULD match snapshot", () => {
    const { container } = render(<SpreadsheetPage />);
    expect(container).toMatchSnapshot();
  });
});
