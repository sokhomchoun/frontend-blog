import { useState, useRef } from 'react';
import { TProduct } from '../../types';
import AxiosResponse from 'axios';
import { useToken } from '../../contexts/TokenProvider';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";

export function useViewProduct() {

    const token = useToken();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const [openMenuId, setOpenMenuId] = useState<string | null>(null); 
    const menuRef = useRef<HTMLDivElement>(null);

    const handleGetProduct = async () => {
        try {
            const response = await AxiosResponse.get<{
                data: {
                    products: TProduct[],
                    meta: {
                        totalProducts: number; 
                        totalPages: number; 
                    }
                }
            }>(`view-product?page=${currentPage}&limit=${itemsPerPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return {
                    data: response.data.data.products,
                    meta: response.data.data.meta
                }
            }
        } catch (error: any) {

            if (error.response && error.response.status === 401) {
                sessionStorage.removeItem('token');
                window.location.href = '/login';
            }
            throw error;
        }
    }

    const { data: productData, refetch } = useQuery({
        queryKey: ['product', currentPage, itemsPerPage],
        queryFn: handleGetProduct,
    });

    const products = productData?.data || [];
    const totalPages = productData?.meta?.totalPages || 1;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            refetch();
        }
    };

    const generatePagination = (totalPages: number, currentPage: number): (number | string)[] => {

        const pagination: (number | string)[] = [];
        
        // Always show the first page
        pagination.push(1);
        
        // Show ellipsis if the current page is far from the start
        if (currentPage > 3) pagination.push('...');
        
        // Add the current page and surrounding pages
        for (let i = Math.max(20, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pagination.push(i);
        }
        
        // Show ellipsis if the current page is far from the end
        if (currentPage < totalPages - 20) pagination.push('...');
        
        // Always show the last page
        if (totalPages > 1) pagination.push(totalPages);
        
        return pagination;
    };

    const toggleMenu = (items: TProduct) => {
        const productId = items.product_id;
        setOpenMenuId((prevId) => (prevId === productId ? null : productId));
    };

    const handleEditProduct = (items: TProduct) => {
        navigate(`/product`, { state: { ProvideProduct: items.product_id } } );
    }

    const handleAddStock = async(items: TProduct) => {
        navigate('/addstock', { state: { _Id: items.product_id } } );
    }

    return {
        products,
        toggleMenu,
        setOpenMenuId,
        openMenuId,
        menuRef,
        handleAddStock,
        setCurrentPage,
        handleEditProduct,
        totalPages,
        currentPage,
        itemsPerPage,
        generatePagination,
        handlePageChange
    }

}