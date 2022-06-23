import React from "react";
import DataTable from "./../DataTable/DataTable";
import "./ReposList.css";

const headers = [
  {
    name: "Owner",
    propertyName: "ownerCell",
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

const ReposList = ({ repos }) => {
  repos.forEach(
    (repo) =>
      (repo.ownerCell = (
        <div className="owner-cell">
          <img
            className="owner-avatar"
            src={repo.owner.avatar_url}
            alt="avatar"
          />
          <div className="owner-celltext">
            <span>{repo.owner.name}</span>
            <span>{repo.owner.login}</span>
          </div>
        </div>
      ))
  );
  return (
    <DataTable
      title="Repositories"
      description="Overiew of GitHub repos"
      headers={headers}
      data={repos}
    />
  );
};

export default ReposList;
