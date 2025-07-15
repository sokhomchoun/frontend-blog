import AxiosResponse from "axios";
import { TBrand, TProduct } from "../../types";

export const getBrand = async () => {
    try {
        const response = await AxiosResponse.get<{ data: TBrand[] }>('get-brand');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error: any) {
        console.error(error);
    }
}

export const getListBrand = async ( brandId: string ) => {
    try {
        if (!brandId) {
            return null;
        }
        const payload = {
            __brand_id: brandId
        };
        const response = await AxiosResponse.post<{ data: TProduct[] }>('list-brand', payload);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}
