import {http} from "@/services";

const authenticate = (data) => http.post(`admin/auth/login`, data);
const getProfile = () => http.get(`admin/auth/getProfile`);
const logout = () => http.get(`admin/auth/logout`);

export {
    authenticate,
    getProfile,
    logout,
}