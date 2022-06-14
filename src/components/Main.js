import React from 'react';
import { Outlet } from "react-router-dom";
import './Main.css';
import SideMenu from './SideMenu';
import UserInfo from './UserInfo';

const Main = () => {
  return (
    <>
      <left>
        <UserInfo />
        <SideMenu />
      </left>
      <right>
        <Outlet />
      </right>
    </>
  )
};

export default Main;
