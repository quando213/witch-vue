import {http} from "@/services";

const list = (params) => http.get(`admin/options`, { params });
const store = (data) => http.post(`admin/options`, data);
const detail = (id) => http.get(`admin/options/${id}`);
const save = (data, id) => http.put(`admin/options/${id}`, data);
const deleteOne = (id) => http.delete(`admin/options/${id}`);

export {
    list,
    store,
    detail,
    save,
    deleteOne
}