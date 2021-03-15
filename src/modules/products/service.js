import {http} from "@/services";

const list = (params) => http.get(`admin/products`, { params });
const store = (data) => http.post(`admin/products`, data);
const detail = (id) => http.get(`admin/products/${id}`);
const save = (data, id) => http.put(`admin/products/${id}`, data);
const deleteOne = (id) => http.delete(`admin/products/${id}`);

export {
    list,
    store,
    detail,
    save,
    deleteOne
}