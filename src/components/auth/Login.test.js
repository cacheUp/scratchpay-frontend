import { cleanup } from "@testing-library/react";
import { renderWithRedux } from "../../__test__/storeFactory";
import Login from "./Login";
import React from "react";
import App from "../App/App";

afterEach(cleanup);

test("should render email input", () => {
  const { getByTestId } = renderWithRedux(<Login />);
  const emailInput = getByTestId("email-input");

  expect(emailInput).toBeTruthy();
});

test("should render password input", () => {
  const { getByTestId } = renderWithRedux(<Login />);
  const emailInput = getByTestId("password-input");

  expect(emailInput).toBeTruthy();
});
