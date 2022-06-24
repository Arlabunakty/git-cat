import React from "react";
import { Outlet as Content } from "react-router-dom";
import "./Main.css";
import SideMenu from "./../SideMenu/SideMenu";
import UserInfo from "./../UserInfo/UserInfo";
import Header from "./../Header/Header";

const Main = ({ isFetching, user }) => {
  if (isFetching) {
    return <p>Fetching...</p>;
  }
  return (
    <div data-testid="main" className="main">
      <div className="left">
        <UserInfo
          avatar_url={user.avatar_url}
          name={user.name}
          email={user.email}
        />
        <SideMenu />
        <div className="footer">GL JS 2022</div>
      </div>
      <div className="right">
        <Header
          followers={user.followers}
          forks={user.forks}
          received_events={user.received_events}
        />
        <div className="content">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Main;
