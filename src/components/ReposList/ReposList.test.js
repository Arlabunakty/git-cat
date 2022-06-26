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
  const data = [repos_raw[0]];
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
  const capturedTableArguments = mockDataTable.mock.calls[1][0];
  expect(capturedTableArguments.description).toEqual("Overiew of GitHub repos");
  expect(capturedTableArguments.title).toEqual("Repositories");
  expect(capturedTableArguments.headers.length).toEqual(5);
});
