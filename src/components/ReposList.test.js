import React from "react";
import { render } from "@testing-library/react";
import ReposList from "./ReposList";
import { user } from "./../__test__/GitHubUser";

test("has custom rendered first column", async () => {
  const { container } = render(<ReposList repos={user.repos} />);

  const rows = container.querySelectorAll(".table-row");
  expect(rows.length).toEqual(12);
  const cells = rows[0].querySelectorAll(".td");
  expect(cells.length).toEqual(5);
  const cellContainer = cells[0].querySelector(".owner-cell");
  expect(cellContainer).toBeInTheDocument();
  expect(cellContainer.querySelector("img.owner-avatar").src).toEqual(
    user.avatar_url
  );
  expect(cellContainer.querySelector(".owner-celltext").textContent).toEqual(
    user.name + user.login
  );
});
