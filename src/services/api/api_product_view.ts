import AxiosResponse from "axios";
import { TProduct } from "../../types";

export const getProductView = async (productId: string) => {
    try {
        const payload = {
            __product_id: productId
        }
        const response = await AxiosResponse.post<{ data: TProduct[] }>('get-product-view', payload);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getListTypeProduct = async (typeId: string) => {
    try {
        const payload = {
            __type_id: typeId
        };
        const response = await AxiosResponse.post<{ data: TProduct[] }>('list-type-product', payload);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
