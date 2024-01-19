import axios from "axios";
import { URL_API } from "../Config";

export const listProductService = async () => {
    const result = await axios.get(`${URL_API}/products`);
    return result;
}

export const detailProductService = async (id) => {
    const result = await axios.get(`${URL_API}/products/${id}`);
    return result;
}