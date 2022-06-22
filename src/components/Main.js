import React from "react";
import { Outlet as Content } from "react-router-dom";
import "./Main.css";
import SideMenu from "./SideMenu";
import UserInfo from "./UserInfo";

const Main = ({ isFetching, user }) => {
  if (isFetching) {
    return <p>Fetching...</p>;
  }
  return (
    <div data-testid="main">
      <div className="left">
        <UserInfo
          avatar_url={user.avatar_url}
          name={user.name}
          email={user.email}
        />
        <SideMenu />
      </div>
      <div className="right">
        <Content />
      </div>
    </div>
  );
};

export default Main;
