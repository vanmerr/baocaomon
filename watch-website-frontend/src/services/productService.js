import fetchApi from "~/utils/fetchApi";

export const getAllProduct = async () => {
    return await fetchApi('get', '/products/get', null, null);
}

export const searchProduct = async (key) => {
    return await fetchApi('get',`/products/search?value=${key}`, null, null)
}

export const addProductToCart = async (token, body) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    return await fetchApi('post', '/users/add-cart', header, body)
}

