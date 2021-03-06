import axios from "axios";

const configAxios = {
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 2 * 60 * 1000
}
const http = axios.create(configAxios);
const handlerError = (error) => Promise.reject(error)

http.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    return config;
}, handlerError)

http.interceptors.response.use((res) => {
    // Xu ly cac loi 401, 403... guest
    return Promise.resolve(res)
}, handlerError)

export default http;
