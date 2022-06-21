import fetch from 'node-fetch';

const accountName = 'arlabunakty';

export const fetchUser = async() => {
    const response = await fetch(`https://api.github.com/users/${accountName}`, { method: 'GET' });
    const user = await response.json();
    return user;
};