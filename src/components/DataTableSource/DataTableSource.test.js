import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const data = [1, 2, 3, 4, 5];
const mockDataTable = jest.fn();
const dataSourceFunction = jest.fn();

jest.mock("./../DataTable/DataTable", () => (props) => {
  mockDataTable(props);
  return <mock-DataTableComponent />;
});

import DataTableSource from "./DataTableSource";
import DataTable from "./../DataTable/DataTable";

test("calls data source function and pass to children", async () => {
  dataSourceFunction.mockImplementation(() => Promise.resolve(data));

  await act(async () =>
    render(
      <DataTableSource
        dataSourceFunction={() => dataSourceFunction()}
        dataTransformFunction={(d) => d}
      >
        <DataTable />
      </DataTableSource>
    )
  );

  expect(mockDataTable).toBeCalledTimes(1);
  expect(mockDataTable).toBeCalledWith({ data });
  expect(dataSourceFunction).toBeCalledTimes(1);
});

test("calls data source function which fails", async () => {
  const error = "reject-dataSourceFunction";
  dataSourceFunction.mockImplementation(() => Promise.reject(error));

  const { container } = await act(async () =>
    render(
      <DataTableSource
        dataSourceFunction={() => dataSourceFunction()}
        dataTransformFunction={(d) => d}
      >
        <DataTable />
      </DataTableSource>
    )
  );

  expect(mockDataTable).toBeCalledTimes(0);
  expect(dataSourceFunction).toBeCalledTimes(1);
  expect(container.textContent).toEqual(error);
});

test("display fetching when dataSourceFunction is running", async () => {
  dataSourceFunction.mockImplementation(() => Promise.resolve(data));

  const { container } = render(
    <DataTableSource
      dataSourceFunction={() => dataSourceFunction()}
      dataTransformFunction={(d) => d}
    >
      <DataTable />
    </DataTableSource>
  );

  expect(mockDataTable).toBeCalledTimes(0);
  expect(dataSourceFunction).toBeCalledTimes(1);
  expect(container.textContent).toEqual("Fetching...");
});
