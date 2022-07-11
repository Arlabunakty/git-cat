import React from "react";
import { Outlet as Content } from "react-router-dom";
import "./Main.css";
import SideMenu from "./../SideMenu/SideMenu";
import UserInfo from "./../UserInfo/UserInfo";
import Header from "./../Header/Header";
import useUser from "../../contexts/UserContext";

const Main = () => {
  const { loading } = useUser();
  if (loading) {
    return <p>Fetching...</p>;
  }
  return (
    <div data-testid="main" className="main">
      <div className="left">
        <UserInfo />
        <SideMenu />
        <div className="footer">GL JS 2022</div>
      </div>
      <div className="right">
        <Header />
        <div className="content">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Main;
