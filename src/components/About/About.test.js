import React from "react";
import renderer from "react-test-renderer";
import About from "./About";
import { mock as mockUseUser } from "../../contexts/__mocks__/UserContext";

jest.mock("./../../contexts/UserContext");

test("display user statistics", async () => {
  mockUseUser();

  const tree = renderer.create(<About />).toJSON();

  expect(tree).toMatchSnapshot();
});
