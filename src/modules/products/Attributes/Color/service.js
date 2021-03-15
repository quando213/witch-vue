import {http} from "@/services";

const list = (params) => http.get(`admin/colors`, { params });
const store = (data) => http.post(`admin/colors`, data);
const detail = (id) => http.get(`admin/colors/${id}`);
const save = (data, id) => http.put(`admin/colors/${id}`, data);
const deleteOne = (id) => http.delete(`admin/colors/${id}`);

export {
    list,
    store,
    detail,
    save,
    deleteOne
}