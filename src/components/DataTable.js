import React, { useState } from "react";
import "./DataTable.css";

const DataTable = ({ title, description, headers, data }) => {
  const [search, setSearch] = useState("");
  const originalData = data || [];
  const searchableHeaders = headers.filter((header) => header.searchable);

  let resultData = originalData;
  if (search !== "") {
    resultData = originalData.filter((row) =>
      searchableHeaders.some((header) =>
        (row[header.propertyName] || "").toLowerCase().includes(search)
      )
    );
  }
  return (
    <table className="table">
      <thead className="thead">
        <tr>
          <th scope="col" colSpan={headers.length} className="th first-row">
            <div className="table-header">
              <div className="left-header">
                <span data-testid="table-name" className="table-name">
                  {title}
                </span>
                <span data-testid="table-description">{description}</span>
              </div>
              <div className="right-header">
                <input
                  data-testid="search-input"
                  type="text"
                  className="icon-rtl"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </div>
            </div>
          </th>
        </tr>
        <tr>
          {headers.map((h) => (
            <th key={h.name} scope="col" className="th column-name">
              {h.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="tbody">
        {resultData.map((row, i) => renderRow(row, i, headers))}
      </tbody>
    </table>
  );
};

function defaultRenderFunc(value) {
  if (value === null) {
    return "";
  } else if (typeof value === "string") {
    return value;
  } else {
    return "" + value;
  }
}

function renderCell(header, j, row) {
  return (
    <td className="td" key={j}>
      {typeof header.renderFunc === "function"
        ? header.renderFunc(row[header.propertyName])
        : defaultRenderFunc(row[header.propertyName])}
    </td>
  );
}
function renderRow(row, i, headers) {
  return (
    <tr className="table-row" key={i}>
      {headers.map((header, j) => renderCell(header, j, row))}
    </tr>
  );
}

export default DataTable;
