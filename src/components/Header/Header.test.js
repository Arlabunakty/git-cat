import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";
import { mock as mockUseUser } from "../../contexts/__mocks__/UserContext";

jest.mock("./../../contexts/UserContext");

test("display user statistics", async () => {
  mockUseUser();
  const { container } = render(<Header />);

  const img = container.getElementsByTagName("img");

  expect(container.textContent).toEqual(
    "Welcome toGitCatReceived events13Followers12Repositories10"
  );
  expect(img.length).toEqual(1);
  expect(img[0].src).toEqual("http://localhost/octocat.png");
});
