import React from "react";
import { render } from "@testing-library/react";
import UserInfo from "./UserInfo";

jest.mock("./../../contexts/UserContext");
import { mock } from "./../../contexts/__mocks__/UserContext";

test("When fetch in progress inform user", async () => {
  // useUser.mockReturnValue({ user: {}, loading: false, error: null });
  mock();

  const { container } = render(<UserInfo />);

  const img = container.getElementsByTagName("img");

  expect(container.textContent).toEqual("John Doeemail@company.com");
  expect(img.length).toEqual(1);
  expect(img[0].src).toEqual("https://avatar.com/avatar");
});
