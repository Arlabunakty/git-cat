import React from "react";
import * as userService from "./../../services/GitHubUserService";
import DataTable from "./../DataTable/DataTable";
import "./FollowersList.css";
import useAsyncFunction from "./../../useAsyncFunction";

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
  function addAvatarComponentAsProperty(data) {
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

  const result = useAsyncFunction(() =>
    userService.fetchUserFollowers(user).then((data) => {
      addAvatarComponentAsProperty(data);
      return data;
    })
  );

  return (
    <DataTable
      testid="followers-table-container"
      title="Followers"
      description="Overiew of GitHub followers"
      headers={headers}
      {...result}
    />
  );
};

export default FollowersList;
