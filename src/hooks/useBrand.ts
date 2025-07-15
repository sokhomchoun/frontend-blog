
import { useQuery } from "@tanstack/react-query";
import { getBrand, getListBrand } from "../services/api/api_brand";
import { TBrand, TProduct } from "../types";
import { useNavigate, useLocation } from "react-router-dom";

export function useBrand(){

    const navigate = useNavigate();
    const location = useLocation();

    const { data: listBrand } = useQuery({
        queryKey: ['brand'],
        queryFn: getBrand,
    });

    const itemBrands = listBrand?.data || [];

    const handleListBrand = async (items: TBrand) => {
        navigate(`/listbrand`, { state: { __brand_id: items.brand_id } });
    };

    const ObjectBrandId = location.state?.__brand_id;
    const { data: dataBrand, isLoading } = useQuery({
        queryKey: ['brand', ObjectBrandId],
        queryFn: () => getListBrand(ObjectBrandId),
    });
    const itemLists = dataBrand?.data || [];

    const handleDetailProduct = async (item: TProduct) => {
        navigate(`/productview`, { state: { _productId: item.product_id } });
    };

    return {
        itemBrands,
        handleListBrand,
        itemLists,
        isLoading,
        handleDetailProduct

    }
}