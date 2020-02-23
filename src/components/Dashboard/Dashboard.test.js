import { cleanup } from "@testing-library/react";
import { renderWithRedux } from "../../__test__/storeFactory";
import Dashboard from "./Dashboard";
import React from "react";

afterEach(cleanup);

test("Should render Dashboard ", () => {
  const { getByTestId } = renderWithRedux(<Dashboard />);
  const header = getByTestId("dashboard");

  expect(header).toBeTruthy();
});
