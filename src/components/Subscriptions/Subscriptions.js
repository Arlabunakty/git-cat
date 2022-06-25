import React from "react";
import * as userService from "./../../services/GitHubUserService";
import DataTable from "./../DataTable/DataTable";
import DataTableSource from "./../DataTableSource/DataTableSource";
import "./Subscriptions.css";

const headers = [
  {
    name: "Owner",
    propertyName: "ownerCell",
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

const Subscriptions = ({ user }) => {
  function dataTransformFunction(data) {
    data.forEach(
      (subscription) =>
        (subscription.ownerCell = (
          <div className="subscription-owner-cell">
            <img
              className="subscription-owner-avatar"
              src={subscription.owner.avatar_url}
              alt="avatar"
            />
            <div className="subscription-owner-text">
              <span>{subscription.owner.login}</span>
            </div>
          </div>
        ))
    );
  }

  return (
    <DataTableSource
      dataSourceFunction={() => userService.fetchUserSubscriptions(user)}
      dataTransformFunction={dataTransformFunction}
    >
      <DataTable
        testid="subscriptions-table-container"
        title="Subscriptions"
        description="Overiew of GitHub subscriptions"
        headers={headers}
      />
    </DataTableSource>
  );
};

export default Subscriptions;
