import fetchApi from '~/utils/fetchApi';

export const addProduct = async (token, formData) => {
    const header = {
        Authorization: token,
    };
    return await fetchApi('post', '/admin/add-product', header, null, formData);
};

export const updateProduct = async (token, formData) => {
    const header = {
        Authorization: token,
    };
    return await fetchApi('put', '/admin/update-product', header, null, formData);
};

export const deleteProduct = async (token, id) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    return await fetchApi('delete', `/admin/delete-product?id=${id}`, header);
};

export const getAllOrderByAdmin = async (token) => {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token,
    };
    return await fetchApi('get', '/admin/get-all-order', header);
};
