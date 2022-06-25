import React from "react";
import * as userService from "./../../services/GitHubUserService";
import DataTable from "./../DataTable/DataTable";
import DataTableSource from "./../DataTableSource/DataTableSource";
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

const ReposList = ({ user }) => {
  function dataTransformFunction(data) {
    data.forEach(
      (repo) =>
        (repo.ownerCell = (
          <div className="owner-cell">
            <img
              className="owner-avatar"
              src={repo.owner.avatar_url}
              alt="avatar"
            />
            <div className="owner-celltext">
              <span>{user.name}</span>
              <span>{repo.owner.login}</span>
            </div>
          </div>
        ))
    );
  }
  return (
    <DataTableSource
      dataSourceFunction={() => userService.fetchUserRepositories(user)}
      dataTransformFunction={dataTransformFunction}
    >
      <DataTable
        testid="repositories-table-container"
        title="Repositories"
        description="Overiew of GitHub repos"
        headers={headers}
      />
    </DataTableSource>
  );
};

export default ReposList;
