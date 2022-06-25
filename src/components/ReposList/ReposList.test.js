import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { user, repos_raw } from "./../../__test__/GitHubUser";

jest.mock("./../../services/GitHubUserService");
import {
  mock,
  mockFetchUserRepositories,
} from "./../../services/__mocks__/GitHubUserService";

beforeEach(() => {
  mock();
});

const mockDataTableSource = jest.fn();
jest.mock("./../DataTableSource/DataTableSource", () => (props) => {
  mockDataTableSource(props);
  return (
    <mock-DataTableSourceComponent>
      {props.children}
    </mock-DataTableSourceComponent>
  );
});

const mockDataTable = jest.fn();
jest.mock("./../DataTable/DataTable", () => (props) => {
  mockDataTable(props);
  return <mock-DataTableComponent />;
});

import ReposList from "./ReposList";

test("has custom rendered first column", async () => {
  await act(async () => render(<ReposList user={user} />));

  expect(mockDataTableSource).toBeCalledTimes(1);
  expect(mockDataTable).toBeCalledTimes(1);
  const capturedSourceArguments = mockDataTableSource.mock.calls[0][0];
  expect(await capturedSourceArguments.dataSourceFunction()).toEqual(repos_raw);
  expect(mockFetchUserRepositories).toBeCalledTimes(1);
  expect(mockFetchUserRepositories).toBeCalledWith(user);
  const data = [repos_raw[0]];
  capturedSourceArguments.dataTransformFunction(data);
  expect(data[0].ownerCell).toEqual(
    <div className="owner-cell">
      <img
        className="owner-avatar"
        src="https://avatars.githubusercontent.com/u/3165275?v=4"
        alt="avatar"
      />
      <div className="owner-celltext">
        <span>Denys Durniev</span>
        <span>Arlabunakty</span>
      </div>
    </div>
  );
  const capturedTableArguments = mockDataTable.mock.calls[0][0];
  expect(capturedTableArguments.description).toEqual("Overiew of GitHub repos");
  expect(capturedTableArguments.title).toEqual("Repositories");
  expect(capturedTableArguments.headers.length).toEqual(5);
});
