import React from "react";
import { render } from "@testing-library/react";
import {
  mock as mockUserService,
  mockReject,
} from "../services/__mocks__/GitHubUserService";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Router } from "react-router-dom";
import UserContext from "./UserContext";

jest.mock("./../services/GitHubUserService");

beforeEach(() => {
  mockUserService();
});

test("fetch user", async () => {
  const { container } = await act(async () =>
    render(
      <UserContext.UserProvider>
        <div data-testid="children">test text</div>
      </UserContext.UserProvider>,
      { wrapper: BrowserRouter }
    )
  );

  expect(container.textContent).toEqual("test text");
});

test("fetching", async () => {
  const { container } = render(
    <UserContext.UserProvider>
      <div data-testid="children">test text</div>
    </UserContext.UserProvider>,
    { wrapper: BrowserRouter }
  );

  expect(container.textContent).toEqual("Fetching...");
});

test("error", async () => {
  mockReject();

  const { container } = await act(async () =>
    render(
      <UserContext.UserProvider>
        <div data-testid="children">test text</div>
      </UserContext.UserProvider>,
      { wrapper: BrowserRouter }
    )
  );

  expect(container.textContent).toEqual("Error: reject-mockFetchUsertest text");
});
