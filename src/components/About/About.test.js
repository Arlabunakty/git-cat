import React from "react";
import renderer from "react-test-renderer";
import About from "./About";
jest.mock("./../../contexts/UserContext");

test("display user statistics", async () => {
  const tree = renderer.create(<About />).toJSON();

  expect(tree).toMatchSnapshot();
});
