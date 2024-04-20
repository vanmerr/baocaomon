import fetchApi from '~/utils/fetchApi';

export const orderProduct = async (token, body) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    return await fetchApi('post', '/users/order', header, body);
};

export const getOrderByUser = async (token) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    return await fetchApi('get', '/users/history-order', header);
}

export const cancelOrder = async (token, id) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    return await fetchApi('get', `/users/cancel-order?id=${id}`, header);
}
