import React from "react";
import { render } from "@testing-library/react";
import UserInfo from "./UserInfo";
import UserContext from "../../contexts/UserContext";

const customRender = (ui, value) => {
  return render(
    <UserContext.UserContext.Provider value={value}>
      {ui}
    </UserContext.UserContext.Provider>
  );
};

test("When fetch in progress inform user", async () => {
  const value = {
    user: {
      avatar_url: "https://avatar.com/avatar",
      email: "John Doeemail@company.com",
    },
  };

  const { container } = customRender(<UserInfo />, value);

  const img = container.getElementsByTagName("img");

  expect(container.textContent).toEqual("John Doeemail@company.com");
  expect(img.length).toEqual(1);
  expect(img[0].src).toEqual("https://avatar.com/avatar");
});
