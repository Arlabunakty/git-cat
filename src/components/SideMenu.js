import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";
import routes from "./../Routes";

const activeClassNameFunc = ({ isActive }) => (isActive ? "active" : null);

const SideMenu = () => {
  return (
    <>
      <ul className="sidenav">
        {routes.map((route) => (
          <li tabIndex="0" key={route.name}>
            <NavLink
              data-testid={route.name}
              to={route.path}
              className={activeClassNameFunc}
            >
              <FontAwesomeIcon icon={"fas " + route.icon} />
              <span>{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="footer">GL JS 2022</div>
    </>
  );
};

export default SideMenu;
