import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { user, followers_raw } from "./../../__test__/GitHubUser";

jest.mock("./../../services/GitHubUserService");
import {
  mock,
  mockFetchUserFollowers,
} from "./../../services/__mocks__/GitHubUserService";

beforeEach(() => {
  mock();
});

// const mockDataTableSource = jest.fn();
// jest.mock("./../DataTableSource/DataTableSource", () => (props) => {
//   mockDataTableSource(props);
//   return (
//     <mock-DataTableSourceComponent>
//       {props.children}
//     </mock-DataTableSourceComponent>
//   );
// });

const mockDataTable = jest.fn();
jest.mock("./../DataTable/DataTable", () => (props) => {
  mockDataTable(props);
  return <mock-DataTableComponent />;
});

import FollowersList from "./FollowersList";

test("has custom rendered first column", async () => {
  await act(async () => render(<FollowersList user={user} />));

  expect(mockDataTable).toBeCalledTimes(2);
  expect(mockFetchUserFollowers).toBeCalledTimes(1);
  expect(mockFetchUserFollowers).toBeCalledWith(user);
  const data = [followers_raw[0]];
  expect(data[0].avatar).toEqual(
    <img
      className="follower-avatar"
      src="https://avatars.githubusercontent.com/u/32126091?v=4"
      alt="avatar"
    />
  );
  const capturedTableArguments = mockDataTable.mock.calls[1][0];
  expect(capturedTableArguments.description).toEqual(
    "Overiew of GitHub followers"
  );
  expect(capturedTableArguments.title).toEqual("Followers");
  expect(capturedTableArguments.headers.length).toEqual(2);
});
