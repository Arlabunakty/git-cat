import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { names, default as routes } from "./../../Routes";
import { createMemoryHistory } from "history";
import SideMenu from "./SideMenu";

test.each(routes)("menu item click affects path", async (route) => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <SideMenu />
    </Router>
  );

  await userEvent.click(screen.getByTestId(route.name));

  expect(history.location.pathname).toBe(route.path);
});

test.each(routes)("menu item click active it", async (route) => {
  const { container } = render(<SideMenu />, { wrapper: BrowserRouter });

  await userEvent.click(screen.getByTestId(route.name));

  const activeLinkElements = container.getElementsByClassName("active");
  expect(activeLinkElements.length).toBe(1);
  expect(activeLinkElements[0].textContent).toBe(route.name);
});
