import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";

const headers = [
  { name: "Col1", propertyName: "col1", searchable: true },
  { name: "Col2", propertyName: "col2" },
  { name: "BOOLEAN", propertyName: "col3" },
  { name: "NULL", propertyName: "col4" },
];
const data = [
  { col1: "TextCol1", col2: "textcol2", col3: true, col4: null },
  { col1: null, col2: "another", col3: false, col4: undefined },
];

it("renders empty table", async () => {
  const { container } = render(
    <DataTable
      title="TableName"
      description="TableDescription"
      headers={[]}
      data={[]}
    />
  );

  expect((await screen.findByTestId("table-name")).textContent).toEqual(
    "TableName"
  );
  expect((await screen.findByTestId("table-description")).textContent).toEqual(
    "TableDescription"
  );
  expect(await screen.findByTestId("search-input")).toBeInTheDocument();
  expect(container.querySelectorAll(".table-row").length).toEqual(0);
});

it("renders table with data", async () => {
  const { container } = render(
    <DataTable
      title="TableNameWith2Columns"
      description="TableDescriptionFOrTableWith2Columns"
      headers={headers}
      data={data}
    />
  );

  expect((await screen.findByTestId("table-name")).textContent).toEqual(
    "TableNameWith2Columns"
  );
  expect((await screen.findByTestId("table-description")).textContent).toEqual(
    "TableDescriptionFOrTableWith2Columns"
  );
  expect(await screen.findByTestId("search-input")).toBeInTheDocument();
  const rows = container.querySelectorAll(".table-row");
  expect(rows.length).toEqual(2);
  const cells = rows[0].querySelectorAll(".td");
  expect(cells.length).toEqual(4);
  expect(cells[0].textContent).toEqual("TextCol1");
  expect(cells[1].textContent).toEqual("textcol2");
  expect(cells[2].textContent).toEqual("true");
  expect(cells[3].textContent).toEqual("");

  const headerCols = container.querySelectorAll(".th.column-name");
  expect(headerCols.length).toEqual(4);
  expect(headerCols[0].textContent).toEqual("Col1");
  expect(headerCols[1].textContent).toEqual("Col2");
  expect(headerCols[2].textContent).toEqual("BOOLEAN");
  expect(headerCols[3].textContent).toEqual("NULL");
});

it.each([
  {
    search: "TextCol3",
    expectedNumOfRows: 0,
  },
  {
    search: "true",
    expectedNumOfRows: 0,
  },
  {
    search: "a",
    expectedNumOfRows: 0,
  },
  {
    search: "TextCol1",
    expectedNumOfRows: 1,
  },
  {
    search: "TextCol",
    expectedNumOfRows: 1,
  },
  {
    search: "TextCo",
    expectedNumOfRows: 1,
  },
  {
    search: "col",
    expectedNumOfRows: 1,
  },
  {
    search: "1",
    expectedNumOfRows: 1,
  },
  {
    search: "text",
    expectedNumOfRows: 1,
  },
])("filter table by text input", async (test) => {
  const { container } = render(
    <DataTable
      title="TableNameWith2Columns"
      description="TableDescriptionFOrTableWith2Columns"
      headers={headers}
      data={data}
    />
  );
  const search = await screen.findByTestId("search-input");

  fireEvent.change(search, { target: { value: test.search } });

  expect(container.querySelectorAll(".table-row").length).toEqual(
    test.expectedNumOfRows
  );
});
