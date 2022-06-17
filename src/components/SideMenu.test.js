import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import RouteConstants from './../RouteConstants';
import SideMenuConstants from './../SideMenuConstants';
import { createMemoryHistory } from 'history';
import SideMenu from './SideMenu';

test.each([
    { menuElement: SideMenuConstants.followers, pathname: RouteConstants.followers },
    { menuElement: SideMenuConstants.subscriptions, pathname: RouteConstants.subscriptions },
    { menuElement: SideMenuConstants.about, pathname: RouteConstants.about },
])
    ("menu item click affects path", async (test) => {
        const history = createMemoryHistory();
        render(<Router location={history.location} navigator={history}>
            <SideMenu />
        </Router>);

        await userEvent.click(screen.getByTestId(test.menuElement));

        expect(history.location.pathname).toBe(test.pathname);
    });

test.each([
    { menuElement: SideMenuConstants.followers },
    { menuElement: SideMenuConstants.subscriptions },
    { menuElement: SideMenuConstants.about },
])
    ("menu item click active it", async (test) => {
        const { container } = render(<SideMenu />, { wrapper: BrowserRouter });

        await userEvent.click(screen.getByTestId(test.menuElement));

        const activeLinkElements = container.getElementsByClassName("active");
        expect(activeLinkElements.length).toBe(1);
        expect(activeLinkElements[0].textContent).toBe(test.menuElement);
    });

it("has copyright in the footer", async () => {
    const { container } = render(<SideMenu />, { wrapper: BrowserRouter });

    const footers = container.getElementsByClassName("footer");
    expect(footers.length).toBe(1);
    expect(footers[0]).toBeInTheDocument();
    expect(footers[0].textContent).toEqual(expect.stringMatching('GL JS \\d{4}'));
});