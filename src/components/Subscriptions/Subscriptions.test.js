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

import Subscriptions from "./Subscriptions";

test("has custom rendered first column", async () => {
  await act(async () => render(<Subscriptions user={user} />));

  expect(mockDataTableSource).toBeCalledTimes(1);
  expect(mockDataTable).toBeCalledTimes(1);
  const capturedSourceArguments = mockDataTableSource.mock.calls[0][0];
  expect(await capturedSourceArguments.dataSourceFunction()).toEqual(
    subscriptions_raw
  );
  expect(mockFetchUserSubscriptions).toBeCalledTimes(1);
  expect(mockFetchUserSubscriptions).toBeCalledWith(user);
  const data = [subscriptions_raw[0]];
  capturedSourceArguments.dataTransformFunction(data);
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
  const capturedTableArguments = mockDataTable.mock.calls[0][0];
  expect(capturedTableArguments.description).toEqual(
    "Overiew of GitHub subscriptions"
  );
  expect(capturedTableArguments.title).toEqual("Subscriptions");
  expect(capturedTableArguments.headers.length).toEqual(6);
});
