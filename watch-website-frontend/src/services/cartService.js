import fetchApi from '~/utils/fetchApi';

export const getCart = async (token) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    return await fetchApi('get', '/users/get-cart', header);
};

export const updateCart = async (token, body) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    return await fetchApi('put', '/users/update-cart', header, body);
};

export const deleteCart = async (token, id) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    return await fetchApi('delete', `/users/delete-cart?id=${id}`, header);
};
