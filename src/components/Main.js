import React from 'react';
import { Outlet } from "react-router-dom";
import './Main.css';
import SideMenu from './SideMenu';
import UserInfo from './UserInfo';

const Main = () => {
  return (
    <>
      <div className="left">
        <UserInfo />
        <SideMenu />
      </div>
      <div className="right">
        <Outlet />
      </div>
    </>
  )
};

export default Main;
