"use strict";

import React from "react";
import * as stubUserServiceData from "./../../__test__/GitHubUser";

const UserContext = jest.mock("./../UserContext");
UserContext.UserProvider = jest.fn((props) => {
  return <div>{props.children}</div>;
});
const mockUseUser = jest.fn();
UserContext.useUser = () => mockUseUser();
function __mock() {
  mockUseUser.mockImplementation(() => {
    return { user: stubUserServiceData.user, loading: false, error: null };
  });
}
function __mockLoading() {
  mockUseUser.mockImplementation(() => {
    return { loading: true };
  });
}
UserContext.__mock = __mock;
UserContext.__mockLoading = __mockLoading;

__mock();
export default UserContext;
