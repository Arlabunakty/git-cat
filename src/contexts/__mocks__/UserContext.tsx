import React from "react";
import * as stubUserServiceData from "../../__test__/GitHubUser";

const mockUseUser = jest.fn();
const mockUserProvider = jest.fn();

const UserContext = jest.mock("./../UserContext", () => ({
  __esModule: true,
  useUser: (args: any) => mockUseUser(args),
  UserProvider: (args: any) => mockUserProvider(args),
}));

export function mock() {
  mockUseUser.mockReturnValue({ user: stubUserServiceData.user, loading: false, error: null });
  mockUserProvider.mockReturnValue((<div></div>));
}

export default UserContext;
