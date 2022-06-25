import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

test("display user statistics", async () => {
  const { container } = render(
    <Header followers={12} public_repos={10} received_events={13} />
  );

  const img = container.getElementsByTagName("img");

  expect(container.textContent).toEqual(
    "Welcome toGitCatReceived events13Followers12Repositories10"
  );
  expect(img.length).toEqual(1);
  expect(img[0].src).toEqual("http://localhost/octocat.png");
});
