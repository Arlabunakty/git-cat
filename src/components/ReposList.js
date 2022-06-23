import React from "react";
import DataTable from "./DataTable";
import "./ReposList.css";

const headers = [
  {
    name: "Owner",
    renderFunc: (owner) => (
      <div className="owner-cell">
        <img className="owner-avatar" src={owner.avatar_url} alt="avatar" />
        <div className="owner-celltext">
          <span>{owner.name}</span>
          <span>{owner.login}</span>
        </div>
      </div>
    ),
    propertyName: "owner",
  },
  {
    name: "Name",
    propertyName: "name",
    searchable: true,
  },
  {
    name: "Description",
    propertyName: "description",
  },
  {
    name: "Forks",
    propertyName: "forks",
  },
  {
    name: "Private",
    propertyName: "private",
  },
];

const ReposList = ({ repos }) => (
  <DataTable
    title="Repositories"
    description="Overiew of GitHub repos"
    headers={headers}
    data={repos}
  />
);

export default ReposList;
