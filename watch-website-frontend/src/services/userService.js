import fetchApi from "~/utils/fetchApi";

export const getUser = async (token) => {
    const header = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    return await fetchApi('get', '/users/get', header )
}

export const updateUser = async (token, body) => {
    const header = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    return await fetchApi('put', '/users/update-info', header, body)
}