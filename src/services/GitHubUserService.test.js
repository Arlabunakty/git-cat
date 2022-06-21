jest.mock('node-fetch');

import fetch from 'node-fetch';
import { fetchUser } from './GitHubUserService';
const { Response } = jest.requireActual('node-fetch');

const mockedUser = {
    "login": "Arlabunakty",
    "id": 3165275,
    "node_id": "MDQ6VXNlcjMxNjUyNzU=",
    "avatar_url": "https://avatars.githubusercontent.com/u/3165275?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Arlabunakty",
    "html_url": "https://github.com/Arlabunakty",
    "followers_url": "https://api.github.com/users/Arlabunakty/followers",
    "following_url": "https://api.github.com/users/Arlabunakty/following{/other_user}",
    "gists_url": "https://api.github.com/users/Arlabunakty/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Arlabunakty/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Arlabunakty/subscriptions",
    "organizations_url": "https://api.github.com/users/Arlabunakty/orgs",
    "repos_url": "https://api.github.com/users/Arlabunakty/repos",
    "events_url": "https://api.github.com/users/Arlabunakty/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Arlabunakty/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Denys Durniev",
    "company": null,
    "blog": "",
    "location": "Ukraine",
    "email": null,
    "hireable": null,
    "bio": null,
    "twitter_username": null,
    "public_repos": 12,
    "public_gists": 4,
    "followers": 2,
    "following": 2,
    "created_at": "2013-01-01T21:35:36Z",
    "updated_at": "2022-06-09T17:39:59Z"
};

test('fetchUser calls GitHub API with hardcoded username', async() => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockedUser))));

    const user = await fetchUser();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://api.github.com/users/arlabunakty', {
        method: 'GET',
    });
    expect(user).toEqual(mockedUser);
});