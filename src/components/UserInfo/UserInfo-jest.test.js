import React from "react";
import { render } from "@testing-library/react";
import UserInfo from "./UserInfo";

jest.mock("./../../contexts/UserContext");

test("When fetch in progress inform user", async () => {
  const { container } = render(<UserInfo />);

  const img = container.getElementsByTagName("img");

  expect(container.textContent).toEqual("Denys Durnievemail@test.com");
  expect(img.length).toEqual(1);
  expect(img[0].src).toEqual(
    "https://avatars.githubusercontent.com/u/3165275?v=4"
  );
});
