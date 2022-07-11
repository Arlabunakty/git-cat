import React from "react";
import "./UserInfo.css";
import { useUser } from "../../contexts/UserContext";

const UserInfo = () => {
  const { user } = useUser();
  return (
    <div className="user-avatar">
      <img src={user.avatar_url} alt="avatar" />
      <h2>{user.name}</h2>
      <span>{user.email}</span>
    </div>
  );
};

export default UserInfo;
