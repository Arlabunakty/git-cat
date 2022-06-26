import React from "react";
import * as userService from "./../../services/GitHubUserService";
import DataTable from "./../DataTable/DataTable";
import useAsyncFunction from "./../../useAsyncFunction";
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
  function addOwnerComponentAsProperty(data) {
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

  const result = useAsyncFunction(() =>
    userService.fetchUserRepositories(user).then((data) => {
      addOwnerComponentAsProperty(data);
      return data;
    })
  );

  return (
    <DataTable
      testid="repositories-table-container"
      title="Repositories"
      description="Overiew of GitHub repos"
      headers={headers}
      {...result}
    />
  );
};

export default ReposList;
