import React from "react";
import "./Header.css";

const Header = ({ followers, forks, received_events }) => (
  <>
    <div className="header-block">
      <div className="block block-green">
        <div className="text octocat-container">
          <div className="octocat-text">
            Welcome to
            <br />
            GitCat
          </div>
          <img src="/octocat.png" className="octocat" alt="octocat" />
        </div>
      </div>
      <div className="block">
        <table className="text">
          <tbody>
            <tr>
              <td className="name-cell">Received events</td>
              <td>{received_events}</td>
            </tr>
            <tr>
              <td className="name-cell">Followers</td>
              <td>{followers}</td>
            </tr>
            <tr>
              <td className="name-cell">Forks</td>
              <td>{forks}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
);

export default Header;
