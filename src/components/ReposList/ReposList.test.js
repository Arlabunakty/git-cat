import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { user } from "./../../__test__/GitHubUser";

jest.mock("./../../services/GitHubUserService");
import {
  mock,
  mockFetchUserRepositories,
} from "./../../services/__mocks__/GitHubUserService";

beforeEach(() => {
  mock();
});

const mockDataTable = jest.fn();
jest.mock("./../DataTable/DataTable", () => (props) => {
  mockDataTable(props);
  return <mock-DataTableComponent />;
});

import ReposList from "./ReposList";

test("has custom rendered first column", async () => {
  await act(async () => render(<ReposList user={user} />));

  expect(mockDataTable).toBeCalledTimes(2);
  expect(mockFetchUserRepositories).toBeCalledTimes(1);
  expect(mockFetchUserRepositories).toBeCalledWith(user);
  const capturedTableArguments = mockDataTable.mock.calls[1][0];
  expect(capturedTableArguments.description).toEqual("Overiew of GitHub repos");
  expect(capturedTableArguments.title).toEqual("Repositories");
  expect(capturedTableArguments.headers.length).toEqual(5);
  expect(capturedTableArguments.headers[0].avatar).toBeDefined();
});
