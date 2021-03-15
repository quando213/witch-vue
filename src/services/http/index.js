import axios from "axios";
import router from "@/router";

const configAxios = {
    baseURL: process.env.VUE_APP_BASE_URL + "api/",
    timeout: 2 * 60 * 1000
}
const http = axios.create(configAxios);
const handlerError = (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        router.push({name: 'Login'});
    }
    return Promise.reject(error);
}

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
    return Promise.resolve(res);
}, handlerError)

export default http;
