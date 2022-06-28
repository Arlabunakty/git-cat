import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { user } from "./__test__/GitHubUser";
import { mock, mockReject } from "./services/__mocks__/GitHubUserService";
import App from "./App";

jest.mock("./services/GitHubUserService");
const mockMain = jest.fn();
jest.mock("./components/Main/Main", () => (props) => mockMain(props));

beforeEach(() => {
  mockMain.mockImplementation((props) =>
    props.user != {} ? (
      <mock-MainComponent data-testid="mockMain" />
    ) : (
      <mock-MainComponent data-testid="noUser" />
    )
  );
});

it("when userService.fetchUser fails Promise.reject then show empty user", async () => {
  mockReject();
  await act(async () => render(<App />, { wrapper: BrowserRouter }));

  await screen.findByTestId("mockMain");

  expect(mockMain).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({ user: {}, isFetching: true })
  );
  expect(mockMain).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({ user: {}, isFetching: true })
  );
  expect(mockMain).toHaveBeenNthCalledWith(
    3,
    expect.objectContaining({ user: {}, isFetching: false })
  );
});

it("when userService.fetchUser successed, then pass user to Main component", async () => {
  mock();

  await act(async () => render(<App />, { wrapper: BrowserRouter }));

  await screen.findByTestId("mockMain");

  expect(mockMain).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({ user: {}, isFetching: true })
  );
  expect(mockMain).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({ user: {}, isFetching: true })
  );
  expect(mockMain).toHaveBeenNthCalledWith(
    3,
    expect.objectContaining({ user: user, isFetching: false })
  );
});
