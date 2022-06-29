import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { user } from "./../../__test__/GitHubUser";
import {
  mock,
  mockFetchUserSubscriptions,
} from "./../../services/__mocks__/GitHubUserService";
import Subscriptions from "./Subscriptions";

jest.mock("./../../services/GitHubUserService");
const mockDataTable = jest.fn();
jest.mock("./../DataTable/DataTable", () => (props) => mockDataTable(props));

beforeEach(() => {
  mock();
  mockDataTable.mockImplementation((props) => <mock-DataTableComponent />);
});

test("has custom rendered first column", async () => {
  await act(async () => render(<Subscriptions user={user} />));

  expect(mockDataTable).toBeCalledTimes(2);
  expect(mockFetchUserSubscriptions).toBeCalledTimes(1);
  expect(mockFetchUserSubscriptions).toBeCalledWith(user);
  const capturedTableArguments = mockDataTable.mock.calls[1][0];
  expect(capturedTableArguments.description).toEqual(
    "Overiew of GitHub subscriptions"
  );
  expect(capturedTableArguments.title).toEqual("Subscriptions");
  expect(capturedTableArguments.headers.length).toEqual(6);
  expect(capturedTableArguments.headers[0].avatar).toBeDefined();
});
