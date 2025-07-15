import AxiosResponse from 'axios';
import { TProduct } from '../../types';

export const handleGetRecentProduct = async (currentPage: number, itemsPerPage: number) => {
    try {
        const response = await AxiosResponse.get<{
            data: {
                products: TProduct[];
                meta: {
                    totalProducts: number;
                    totalPages: number;
                };
            }
        }>(`recent-product?page=${currentPage}&limit=${itemsPerPage}`);

        if (response.status === 200) {
             return {
                products: response.data.data.products,
                meta: response.data.data.meta,
            };
        }

    } catch (error: any) {  
        console.error(error);
        throw error;
    }
}