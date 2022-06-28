import * as userService from "./GitHubUserService";
import {
  user,
  user_raw,
  received_events_raw,
  repos_raw,
  followers_raw,
  subscriptions_raw,
} from "./../__test__/GitHubUser";

global.fetch = jest.fn((props) => {
  if (props == user.url) {
    return Promise.resolve({ json: () => Promise.resolve(user_raw) });
  } else if (props == user_raw.received_events_url) {
    return Promise.resolve({
      json: () => Promise.resolve(received_events_raw),
    });
  } else if (props == user_raw.repos_url) {
    return Promise.resolve({ json: () => Promise.resolve(repos_raw) });
  } else if (props == user_raw.subscriptions_url) {
    return Promise.resolve({ json: () => Promise.resolve(subscriptions_raw) });
  } else if (props == user_raw.followers_url) {
    return Promise.resolve({ json: () => Promise.resolve(followers_raw) });
  } else {
    return Promise.reject("error");
  }
});

test("fetchUser make multiple calls to GitHub API", async () => {
  const fetchedUser = await userService.fetchUser();

  expect(fetch).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenNthCalledWith(1, user.url);
  expect(fetch).toHaveBeenNthCalledWith(2, user.received_events_url);
  expect(fetchedUser).toEqual(user);
});

test("fetchUserFollowers make multiple calls to GitHub API", async () => {
  const fetched = await userService.fetchUserFollowers(user);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenNthCalledWith(1, user.followers_url);
  expect(fetched).toEqual(followers_raw);
});

test("fetchUserRepositories make multiple calls to GitHub API", async () => {
  const fetched = await userService.fetchUserRepositories(user);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenNthCalledWith(1, user.repos_url);
  expect(fetched).toEqual(repos_raw);
});

test("fetchUserSubscriptions make multiple calls to GitHub API", async () => {
  const fetched = await userService.fetchUserSubscriptions(user);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenNthCalledWith(1, user.subscriptions_url);
  expect(fetched).toEqual(subscriptions_raw);
});
