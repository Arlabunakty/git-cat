import React from 'react';
import './UserInfo.css'

const UserInfo = ({ avatar_url, name, email }) => {
    return <div className="user-avatar">
        <img src={avatar_url} alt="avatar" />
        <h2>{name}</h2>
        <span>{email}</span>
    </div>;
};

export default UserInfo;
