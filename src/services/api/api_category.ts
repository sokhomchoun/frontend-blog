import AxiosResponse from "axios";
import { TProductType, TProduct, TCart } from "../../types";

export const getCategories = async() => {
    try {
        const response  = await AxiosResponse.get<{ data: TProductType[] }>('get-categories');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export const listCategory = async ( typeId: string ) => {
    try {
        const payload = {
            __type_id : typeId,
        }
        const response = await AxiosResponse.post<{ data: TProduct[] }>('list-categories', payload);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export const listOrder = async (user_id: number) => {
    try {
        const payload = {
            user_id: user_id
        }
        const response = await AxiosResponse.post<{ 
            data: {
                itemCarts: TCart[],
                totalCount: number
            } 
        }>('f-get-cart', payload);

        if (response.status === 200) {
            return {
                data: response.data.data.itemCarts || [],
                count: response.data.data.totalCount
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}