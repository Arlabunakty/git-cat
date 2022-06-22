import { fetchUser } from "./GitHubUserService";
import {
  user,
  user_raw,
  user_events,
  user_repos,
} from "./../__test__/GitHubUser";

global.fetch = jest.fn((props) => {
  if (props == "https://api.github.com/users/Arlabunakty") {
    return Promise.resolve({ json: () => Promise.resolve(user_raw) });
  } else if (
    props == "https://api.github.com/users/Arlabunakty/received_events"
  ) {
    return Promise.resolve({ json: () => Promise.resolve(user_events) });
  } else if (props == "https://api.github.com/users/Arlabunakty/repos") {
    return Promise.resolve({ json: () => Promise.resolve(user_repos) });
  } else {
    return Promise.reject("error");
  }
});

test("fetchUser make multiple calls to GitHub API with hardcoded username", async () => {
  const fetchedUser = await fetchUser();

  expect(fetch).toHaveBeenCalledTimes(3);
  expect(fetch).toHaveBeenNthCalledWith(
    1,
    "https://api.github.com/users/Arlabunakty"
  );
  expect(fetch).toHaveBeenNthCalledWith(
    2,
    "https://api.github.com/users/Arlabunakty/received_events"
  );
  expect(fetch).toHaveBeenNthCalledWith(
    3,
    "https://api.github.com/users/Arlabunakty/repos"
  );
  expect(fetchedUser).toEqual(user);
});
