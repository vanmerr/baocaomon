import fetchApi from '~/utils/fetchApi';

export const Login = async (data) => {
    return await fetchApi('post', '/auth0/login', null, data);
};

export const Register = async (data) => {
    return await fetchApi('post', '/auth0/register', null, data);
};

export const isAdmin = async (token) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    const result = await fetchApi('get', '/users/get', header);
    if (await result.data.isAdmin) return true;
    return false;
};
