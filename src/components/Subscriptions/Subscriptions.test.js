import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { user, subscriptions_raw } from "./../../__test__/GitHubUser";

jest.mock("./../../services/GitHubUserService");
import {
  mock,
  mockFetchUserSubscriptions,
} from "./../../services/__mocks__/GitHubUserService";

beforeEach(() => {
  mock();
});

const mockDataTable = jest.fn();
jest.mock("./../DataTable/DataTable", () => (props) => {
  mockDataTable(props);
  return <mock-DataTableComponent />;
});

import Subscriptions from "./Subscriptions";

test("has custom rendered first column", async () => {
  await act(async () => render(<Subscriptions user={user} />));

  expect(mockDataTable).toBeCalledTimes(2);
  expect(mockFetchUserSubscriptions).toBeCalledTimes(1);
  expect(mockFetchUserSubscriptions).toBeCalledWith(user);
  const data = [subscriptions_raw[0]];
  expect(data[0].ownerCell).toEqual(
    <div className="subscription-owner-cell">
      <img
        className="subscription-owner-avatar"
        src="https://avatars.githubusercontent.com/u/997114?v=4"
        alt="avatar"
      />
      <div className="subscription-owner-text">
        <span>jaliss</span>
      </div>
    </div>
  );
  const capturedTableArguments = mockDataTable.mock.calls[1][0];
  expect(capturedTableArguments.description).toEqual(
    "Overiew of GitHub subscriptions"
  );
  expect(capturedTableArguments.title).toEqual("Subscriptions");
  expect(capturedTableArguments.headers.length).toEqual(6);
});
