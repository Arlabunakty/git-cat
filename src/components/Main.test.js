import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Main from './Main';
import { user } from './../__test__/GitHubUser'

const mockUserInfo = jest.fn();

jest.mock("./UserInfo", () => (props) => {
  mockUserInfo(props);
  return <mock-userInfoComponent />;
});

test("When fetch in progress inform user", async () => {
    const {container} = render(<Main isFetching={true}/>);
    
    expect(container.textContent).toEqual("Fetching...");
});

test("If isFetching=false and user passed, then UserInfo is called with props from user", () => {
  render(<Main user={user} isFetching={false}/>, { wrapper: BrowserRouter });

  expect(mockUserInfo).toHaveBeenCalledWith(
    expect.objectContaining({
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url
    })
  );
});