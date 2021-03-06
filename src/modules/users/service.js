import {http} from "@/services";

const list = (params) => http.get(`admin/users`, { params });
const store = (data) => http.post(`admin/users`, data);
export {
    list,
    store
}