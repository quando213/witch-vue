import {http} from "@/services";

const list = (params) => http.get(`admin/categories`, { params });
const store = (data) => http.post(`admin/categories`, data);
const detail = (id) => http.get(`admin/categories/${id}`);
const save = (data, id) => http.put(`admin/categories/${id}`, data);
const deleteOne = (id) => http.delete(`admin/categories/${id}`);

export {
    list,
    store,
    detail,
    save,
    deleteOne
}