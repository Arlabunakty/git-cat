import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from "react";
import App from './App';
import { BrowserRouter, Router } from "react-router-dom";
import { names } from './Routes';
import { createMemoryHistory } from 'history';

it("defaults to Repositories menu element and Repository List Component", async () => {
  const { container } = render(<App />, { wrapper: BrowserRouter });

  const activeLinkElements = container.getElementsByClassName("active");
  expect(activeLinkElements.length).toBe(1);
  expect(activeLinkElements[0].textContent).toBe('Repositories');

  const rightElements = container.getElementsByClassName("right");
  expect(rightElements.length).toBe(1);
  expect(rightElements[0].textContent).toBe("ReposList Component");
});

it.each([
  { menuElement: names.followers, expectedTextOnTheRight: "FollowersList Component" },
  { menuElement: names.subscriptions, expectedTextOnTheRight: "Subscriptions Component" },
  { menuElement: names.about, expectedTextOnTheRight: "About Component" }
])
  ("clicks on the menu item and related component appears", async (test) => {
    const { container } = render(<App />, { wrapper: BrowserRouter });

    await userEvent.click(screen.getByTestId(test.menuElement));

    const rightElements = container.getElementsByClassName("right");
    expect(rightElements.length).toBe(1);
    expect(rightElements[0].textContent).toBe(test.expectedTextOnTheRight);
  });

  it("opens non existing page with error", async () => {
    const history = createMemoryHistory();
    history.push('/non-existing-path');

    render(<Router location={history.location} navigator={history}>
        <App />
    </Router>);

    expect(screen.getByTestId('no-page-error')).toBeInTheDocument();
});