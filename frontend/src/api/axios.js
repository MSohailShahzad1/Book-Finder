import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE + '/api',
});

// attach token (if present) to each request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('bf_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => Promise.reject(error));

export default api;
