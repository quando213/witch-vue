import {http} from "@/services";

const listProduct = (params) => http.get(`admin/products`, { params });
const createProduct = (data) => http.post(`admin/products`, data);
export {
    listProduct,
    createProduct
}