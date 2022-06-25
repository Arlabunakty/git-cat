import * as stubUserServiceData from "./../../__test__/GitHubUser";

export const mockFetchUser = jest.fn();
export const mockFetchUserRepositories = jest.fn();
export const mockFetchUserFollowers = jest.fn();
export const mockFetchUserSubscriptions = jest.fn();

const GitHubUserService = jest.mock("./../GitHubUserService", () => ({
  __esModule: true,
  fetchUser: (args) => mockFetchUser(args),
  fetchUserRepositories: (args) => mockFetchUserRepositories(args),
  fetchUserFollowers: (args) => mockFetchUserFollowers(args),
  fetchUserSubscriptions: (args) => mockFetchUserSubscriptions(args),
}));

export function mock() {
  mockFetchUser.mockImplementation(() =>
    Promise.resolve(stubUserServiceData.user)
  );
  mockFetchUserRepositories.mockImplementation(() =>
    Promise.resolve(stubUserServiceData.repos_raw)
  );
  mockFetchUserFollowers.mockImplementation(() =>
    Promise.resolve(stubUserServiceData.followers_raw)
  );
  mockFetchUserSubscriptions.mockImplementation(() =>
    Promise.resolve(stubUserServiceData.subscriptions_raw)
  );
}

export function mockReject() {
  mockFetchUser.mockImplementation(() =>
    Promise.reject("reject-mockFetchUser")
  );
  mockFetchUserRepositories.mockImplementation(() =>
    Promise.reject("reject-mockFetchUserRepositories")
  );
  mockFetchUserFollowers.mockImplementation(() =>
    Promise.reject("reject-mockFetchUserFollowers")
  );
  mockFetchUserSubscriptions.mockImplementation(() =>
    Promise.reject("reject-mockFetchUserSubscriptions")
  );
}

export default GitHubUserService;
