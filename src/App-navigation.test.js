jest.mock("./services/GitHubUserService");
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { names } from "./Routes";
import { createMemoryHistory } from "history";
import { mock } from "./services/__mocks__/GitHubUserService";

beforeEach(() => {
  mock();
});

import App from "./App";

it("defaults to Repositories menu element and Repository List Component", async () => {
  const { container } = await act(async () =>
    render(<App />, { wrapper: BrowserRouter })
  );

  await screen.findByTestId("repositories-table-container");

  const activeLinkElements = container.getElementsByClassName("active");
  expect(activeLinkElements.length).toBe(1);
  expect(activeLinkElements[0].textContent).toBe("Repositories");

  const rightElements = container.getElementsByClassName("content");
  expect(rightElements.length).toBe(1);
  expect(rightElements[0].textContent).toContain("Repositories");
});

it.each([
  {
    menuElement: names.followers,
    expectedTextOnTheRight: "Followers",
    dataTestId: "followers-table-container",
  },
  {
    menuElement: names.subscriptions,
    expectedTextOnTheRight: "Subscriptions",
    dataTestId: "subscriptions-table-container",
  },
  {
    menuElement: names.about,
    expectedTextOnTheRight: "ACCOUNT DETAILS",
    dataTestId: "about",
  },
])("clicks on the menu item and related component appears", async (test) => {
  const { container } = await act(async () =>
    render(<App />, { wrapper: BrowserRouter })
  );

  await act(async () => screen.getByTestId(test.menuElement).click());

  const activeLinkElements = container.getElementsByClassName("active");
  expect(activeLinkElements.length).toBe(1);
  expect(activeLinkElements[0].textContent).toBe(test.menuElement);

  const rightElements = container.getElementsByClassName("content");
  expect(rightElements.length).toBe(1);
  expect(rightElements[0].textContent).toContain(test.expectedTextOnTheRight);
});

it("opens non existing page with error", async () => {
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
