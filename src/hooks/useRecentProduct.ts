import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { handleGetRecentProduct } from '../services/api/api_recent_product';
import { TProduct } from '../types';
import { useNavigate } from "react-router-dom";

export function useRecentProduct() {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemProducts, setItemProducts] = useState<TProduct[]>([]);
    const itemsPerPage = 12;

    const { data: productData, isLoading, isError } = useQuery({
        queryKey: ['recentProduct', currentPage],
        queryFn: () => handleGetRecentProduct(currentPage, itemsPerPage),
    });

    useEffect(() => {

        if (productData?.products) {
            setItemProducts((prev) => {
                // Use a Set to filter out duplicate product IDs
                const existingIds = new Set(prev.map((p) => p.id)); // Assuming each product has a unique "id"
                const newProducts = productData.products.filter((p) => !existingIds.has(p.id));
    
                return [...prev, ...newProducts]; // Append only unique products
            });
        }

    }, [productData]);

    const totalPages = productData?.meta.totalPages || 0;
    
    const handleSeeMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handleDetailProduct = async (item: TProduct) => {
        navigate(`/productview`, { state: { _productId: item.product_id } });
    };

    return {
        itemProducts,
        setCurrentPage,
        handleSeeMore,
        currentPage,
        totalPages,
        handleDetailProduct,
        isLoading,
        isError
    };
}
