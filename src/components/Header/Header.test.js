import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

jest.mock("./../../contexts/UserContext");

test("display user statistics", async () => {
  const { container } = render(<Header />);

  const img = container.getElementsByTagName("img");

  expect(container.textContent).toEqual(
    "Welcome toGitCatReceived events14Followers2Repositories12"
  );
  expect(img.length).toEqual(1);
  expect(img[0].src).toEqual("http://localhost/octocat.png");
});
