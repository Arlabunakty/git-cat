jest.mock('node-fetch');

import fetch from 'node-fetch';
import { fetchUser } from './GitHubUserService';
const { Response } = jest.requireActual('node-fetch');
import { user as mockedUser } from './../__test__/GitHubUser'

test('fetchUser calls GitHub API with hardcoded username', async() => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockedUser))));

    const user = await fetchUser();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://api.github.com/users/arlabunakty', {
        method: 'GET',
    });
    expect(user).toEqual(mockedUser);
});