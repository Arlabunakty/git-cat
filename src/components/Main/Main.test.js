import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
import UserContext from "./../../contexts/UserContext";

const mockUserInfo = jest.fn();

jest.mock("./../UserInfo/UserInfo", () => (props) => {
  mockUserInfo(props);
  return <mock-userInfoComponent />;
});
jest.mock("./../../contexts/UserContext");

test("When fetch in progress inform user", async () => {
  UserContext.__mockLoading();

  const { container } = render(<Main />, { wrapper: BrowserRouter });

  expect(container.textContent).toEqual("Fetching...");
});

test("If isFetching=false and user passed, then UserInfo is called with props from user", () => {
  UserContext.__mock();
  render(<Main />, { wrapper: BrowserRouter });

  expect(mockUserInfo).toHaveBeenCalledTimes(1);
});

it("has copyright in the footer", async () => {
  UserContext.__mock();
  const { container } = render(<Main />, {
    wrapper: BrowserRouter,
  });

  const footers = container.getElementsByClassName("footer");
  expect(footers.length).toBe(1);
  expect(footers[0]).toBeInTheDocument();
  expect(footers[0].textContent).toEqual(expect.stringMatching("GL JS \\d{4}"));
});
