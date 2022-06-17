import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from "react-router-dom";
import './SideMenu.css';
import RouteConstants from './../RouteConstants';
import SideMenuConstants from './../SideMenuConstants';

const activeClassNameFunc = ({isActive}) => (isActive ? 'active' : null);

const SideMenu = () => {
  return <div>
      <ul className="sidenav">
          <li tabIndex="0">
            <NavLink data-testid='Repositories' to={RouteConstants.repositories} className={activeClassNameFunc}>
              <FontAwesomeIcon icon="fas fa-code-branch" /><span>{SideMenuConstants.repositories}</span>
            </NavLink>
          </li>
          <li tabIndex="0">
            <NavLink data-testid='Followers' to={RouteConstants.followers} className={activeClassNameFunc}>
              <FontAwesomeIcon icon="fas fa-users" /><span>{SideMenuConstants.followers}</span>
            </NavLink>
          </li>
          <li tabIndex="0">
            <NavLink data-testid='Subscriptions' to={RouteConstants.subscriptions} className={activeClassNameFunc}>
              <FontAwesomeIcon icon="fas fa-link" /><span>{SideMenuConstants.subscriptions}</span>
            </NavLink>
          </li>
          <li tabIndex="0">
            <NavLink data-testid='About' to={RouteConstants.about} className={activeClassNameFunc}>
              <FontAwesomeIcon icon="fas fa-user" /><span>{SideMenuConstants.about}</span>
            </NavLink>
          </li>
        </ul>
        <div className="footer">GL JS 2022</div>
  </div>;
};

export default SideMenu;
