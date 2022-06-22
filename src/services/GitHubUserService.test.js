import { fetchUser } from "./GitHubUserService";
import { user as mockedUser } from "./../__test__/GitHubUser";

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(mockedUser) })
);

test("fetchUser calls GitHub API with hardcoded username", async () => {
  const user = await fetchUser();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    "https://api.github.com/users/arlabunakty"
  );
  expect(user).toEqual(mockedUser);
});
