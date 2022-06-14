import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from "react-router-dom";
import './SideMenu.css';

const classFunc = ({ isActive }) => ({
    fontWeight: isActive ? 'active' : 'non-active',
  });

const SideMenu = () => {
  return <div>
      <ul class="sidenav">
          <li tabindex="0">
            <NavLink to="/" class={classFunc}>
              <FontAwesomeIcon icon="fas fa-code-branch" /><span>Repositories</span>
            </NavLink>
          </li>
          <li tabindex="0">
            <NavLink to="/followers" class={classFunc}>
              <FontAwesomeIcon icon="fas fa-users" /><span>Followers</span>
            </NavLink>
          </li>
          <li tabindex="0">
            <NavLink to="/subscriptions" class={classFunc}>
              <FontAwesomeIcon icon="fas fa-link" /><span>Subscriptions</span>
            </NavLink>
          </li>
          <li tabindex="0">
            <NavLink to="/about" class={classFunc}>
              <FontAwesomeIcon icon="fas fa-user" /><span>About</span>
            </NavLink>
          </li>
        </ul>
        <div class="footer">GL JS 2022</div>
  </div>;
};

export default SideMenu;
