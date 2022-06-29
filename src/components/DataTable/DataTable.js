import React, { useState } from "react";
import "./DataTable.css";
import JsonPath from "jsonpath";

const DataTable = ({
  title,
  description,
  headers,
  data,
  testid,
  isLoading,
  errorMessage,
}) => {
  if (isLoading) {
    return <p>Fetching...</p>;
  }
  if (errorMessage != null) {
    return <p>{errorMessage}</p>;
  }
  const [search, setSearch] = useState("");
  const originalData = data;
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
    <div className="table-container" data-testid={testid}>
      <table className="table">
        <thead className="thead">
          <tr className="tr">
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
    </div>
  );
};

function renderCell(header, j, row) {
  const value = row[header.propertyName];
  const avatarAndTextAlign =
    header.avatar && header.avatar.columnStyle
      ? "avatar-cell-column"
      : "avatar-cell-row";
  return (
    <td className="td" key={j}>
      {header.avatar ? (
        <div className={"avatar-cell " + avatarAndTextAlign}>
          <img
            className="avatar-img"
            src={jsonPathOrConstant(row, header.avatar.url)}
            alt="avatar"
          />
          <div className="avatar-text">
            <span>{jsonPathOrConstant(row, header.avatar.name)}</span>
            {header.avatar.description && (
              <span>{jsonPathOrConstant(row, header.avatar.description)}</span>
            )}
          </div>
        </div>
      ) : typeof value === "boolean" ? (
        "" + value
      ) : (
        value
      )}
    </td>
  );
}

function jsonPathOrConstant(row, candidateJsonPath) {
  try {
    return JsonPath.query(row, candidateJsonPath, 1)[0];
  } catch (e) {
    return candidateJsonPath;
  }
}

function renderRow(row, i, headers) {
  return (
    <tr className="tr table-row" key={i}>
      {headers.map((header, j) => renderCell(header, j, row))}
    </tr>
  );
}

export default DataTable;
