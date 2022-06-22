import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import waitForExpect from "wait-for-expect";
import { user } from "./__test__/GitHubUser";

const mockfetchUser = jest.fn();

jest.mock("./services/GitHubUserService", () => ({
  __esModule: true,
  fetchUser: () => mockfetchUser(),
}));

const mockMain = jest.fn();

jest.mock("./components/Main", () => (props) => {
  mockMain(props);
  return props.user != {} ? (
    <mock-MainComponent data-testid="mockMain" />
  ) : (
    <mock-MainComponent data-testid="noUser" />
  );
});

it("when userService.fetchUser fails Promise.reject then show empty user", async () => {
  mockfetchUser.mockImplementation(() => Promise.reject("reject"));

  render(<App />, { wrapper: BrowserRouter });

  await screen.findByTestId("mockMain");

  await waitForExpect(() => {
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
});

it("when userService.fetchUser successed, then pass user to Main component", async () => {
  mockfetchUser.mockImplementation(() => Promise.resolve(user));

  render(<App />, { wrapper: BrowserRouter });

  await screen.findByTestId("mockMain");

  await waitForExpect(() => {
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
});
