import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { names } from "./Routes";
import { createMemoryHistory } from "history";
import App from "./App";

const mockfetchUser = jest.fn();

jest.mock("./services/GitHubUserService", () => ({
  __esModule: true,
  fetchUser: () => mockfetchUser(),
}));

function mockUser() {
  mockfetchUser.mockImplementation(() => Promise.resolve({}));
}

it("defaults to Repositories menu element and Repository List Component", async () => {
  mockUser();
  const { container } = render(<App />, { wrapper: BrowserRouter });

  await screen.findByTestId("main");

  const activeLinkElements = container.getElementsByClassName("active");
  expect(activeLinkElements.length).toBe(1);
  expect(activeLinkElements[0].textContent).toBe("Repositories");

  const rightElements = container.getElementsByClassName("right");
  expect(rightElements.length).toBe(1);
  expect(rightElements[0].textContent).toBe("ReposList Component");
});

it.each([
  {
    menuElement: names.followers,
    expectedTextOnTheRight: "FollowersList Component",
  },
  {
    menuElement: names.subscriptions,
    expectedTextOnTheRight: "Subscriptions Component",
  },
  { menuElement: names.about, expectedTextOnTheRight: "About Component" },
])("clicks on the menu item and related component appears", async (test) => {
  mockUser();
  const { container } = render(<App />, { wrapper: BrowserRouter });
  await screen.findByTestId("main");

  await userEvent.click(screen.getByTestId(test.menuElement));

  const rightElements = container.getElementsByClassName("right");
  expect(rightElements.length).toBe(1);
  expect(rightElements[0].textContent).toBe(test.expectedTextOnTheRight);
});

it("opens non existing page with error", async () => {
  mockUser();
  const history = createMemoryHistory();
  history.push("/non-existing-path");

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  await screen.findByTestId("main");

  expect(screen.getByTestId("no-page-error")).toBeInTheDocument();
});
