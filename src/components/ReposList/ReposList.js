import React from "react";
import * as userService from "./../../services/GitHubUserService";
import DataTable from "./../DataTable/DataTable";
import useAsyncFunction from "./../../useAsyncFunction";
import UserContext from "../../contexts/UserContext";

const ReposList = () => {
  const { user } = UserContext.useUser();
  const headers = [
    {
      name: "Owner",
      avatar: {
        url: "$.owner.avatar_url",
        name: user.name,
        description: "$.owner.login",
      },
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

  const result = useAsyncFunction(() =>
    userService.fetchUserRepositories(user)
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
