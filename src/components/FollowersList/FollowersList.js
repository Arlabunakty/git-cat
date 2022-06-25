import React from "react";
import * as userService from "./../../services/GitHubUserService";
import DataTable from "./../DataTable/DataTable";
import DataTableSource from "./../DataTableSource/DataTableSource";
import "./FollowersList.css";

const headers = [
  {
    name: "Avatar",
    propertyName: "avatar",
  },
  {
    name: "Name",
    propertyName: "login",
    searchable: true,
  },
];

const FollowersList = ({ user }) => {
  function dataTransformFunction(data) {
    data.forEach(
      (follower) =>
        (follower.avatar = (
          <img
            className="follower-avatar"
            src={follower.avatar_url}
            alt="avatar"
          />
        ))
    );
  }

  return (
    <DataTableSource
      dataSourceFunction={() => userService.fetchUserFollowers(user)}
      dataTransformFunction={dataTransformFunction}
    >
      <DataTable
        testid="followers-table-container"
        title="Followers"
        description="Overiew of GitHub followers"
        headers={headers}
      />
    </DataTableSource>
  );
};

export default FollowersList;
