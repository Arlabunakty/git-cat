import React from "react";
import renderer from "react-test-renderer";
import About from "./About";
import { user } from "./../../__test__/GitHubUser";

test("display user statistics", async () => {
  const tree = renderer.create(<About user={user} />).toJSON();

  expect(tree).toMatchSnapshot();
});
