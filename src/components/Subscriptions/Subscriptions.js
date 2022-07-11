import React from "react";
import * as userService from "./../../services/GitHubUserService";
import DataTable from "./../DataTable/DataTable";
import useAsyncFunction from "./../../useAsyncFunction";
import useUser from "../../contexts/UserContext";

const headers = [
  {
    name: "Owner",
    avatar: {
      url: "$.owner.avatar_url",
      name: "$.owner.login",
      columnStyle: true,
    },
  },
  {
    name: "Full name",
    propertyName: "full_name",
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
    name: "Issues",
    propertyName: "open_issues_count",
  },
  {
    name: "Language",
    propertyName: "language",
  },
];

const Subscriptions = () => {
  const { user } = useUser();
  const result = useAsyncFunction(() =>
    userService.fetchUserSubscriptions(user)
  );

  return (
    <DataTable
      testid="subscriptions-table-container"
      title="Subscriptions"
      description="Overiew of GitHub subscriptions"
      headers={headers}
      {...result}
    />
  );
};

export default Subscriptions;
