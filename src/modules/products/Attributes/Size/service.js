import {http} from "@/services";

const list = (params) => http.get(`admin/sizes`, { params });
const findByCategory = (id) => http.get(`admin/sizes/by-category/${id}`);
const store = (data) => http.post(`admin/sizes`, data);
const detail = (id) => http.get(`admin/sizes/${id}`);
const save = (data, id) => http.put(`admin/sizes/${id}`, data);
const deleteOne = (id) => http.delete(`admin/sizes/${id}`);

export {
    list,
    findByCategory,
    store,
    detail,
    save,
    deleteOne
}