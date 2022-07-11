import React from "react";
import "./Header.css";
import octocatLogo from "./../../assets/octocat.png";
import UserContext from "../../contexts/UserContext";

const Header = () => {
  const { user } = UserContext.useUser();
  const rows = [
    { name: "Received events", value: user.received_events },
    { name: "Followers", value: user.followers },
    { name: "Repositories", value: user.public_repos },
  ];
  return (
    <div className="header">
      <div className="tile tile-green">
        <div className="text octocat-container">
          <div className="octocat-text">
            Welcome to
            <br />
            GitCat
          </div>
          <img src={octocatLogo} className="octocat" alt="octocat" />
        </div>
      </div>
      <div className="tile">
        <table className="text">
          <tbody>
            {rows.map((r) => (
              <tr key={r.name + r.value}>
                <td className="name-cell">{r.name}</td>
                <td>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Header;
