import {http} from "@/services";

const list = (params) => http.get(`admin/users`, { params });
const store = (data) => http.post(`admin/users`, data);
const detail = (id) => http.get(`admin/users/${id}`);
const save = (data, id) => http.put(`admin/users/${id}`, data);
const deleteOne = (id) => http.delete(`admin/users/${id}`);

export {
    list,
    store,
    detail,
    save,
    deleteOne
}