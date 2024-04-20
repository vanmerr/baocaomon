const { default: env } = require('~/config');

const API_URI = env.API_URI;

const fetchApi = async (method, path, headers = null, body = null, formData) => {
    try {
        const response = await fetch(`${API_URI}${path}`, {
            method,
            headers: headers || { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : formData ? formData : null,
        });
        return await response.json();
    } catch (error) {
        console.log(error.toString());
        return null;
    }
};

export default fetchApi;
