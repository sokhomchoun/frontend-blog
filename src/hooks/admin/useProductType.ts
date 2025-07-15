import React, { useState, useRef } from 'react';
import { TProductType, TImageType } from '../../types';
import AxiosResponse  from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useToken } from '../../contexts/TokenProvider';

export function useProductType() {

    const token = useToken();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const [isForm, setForm] = useState<Partial<TProductType>>({});
    const [images, setImages ] = useState<TImageType[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isTypeId, setTypeId] = useState<string>('');
    const [isTextGenerator, setTextGenerator] = useState<string>('Create ID');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null); 
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMessage, setMessage] = useState<boolean>(false);
    const [searchTypeId, setSearchTypeId] = useState<string>('');
    const [isDataSearch, setDataSearch] = useState<TProductType[]>([]);
    const [updateSuccess, setUpdateSuccess] = useState<string>('');
    const [createSuccess, setCreateSuccess] = useState<string>('');
    const [deleteSuccess, setDeleteSuccess] = useState<string>('');
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [provideTypeId, setProvideTypeId] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const selectFiles = Array.from(files).map((file) => ({file,
                url: URL.createObjectURL(file),
            }));
            setImages(selectFiles);
        }
    }

    const handleChangeProductType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
           ...prevState,
            [name]: value,
        }));
    }

    const formatDateTime = (dateTime: Date): string => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        return `TYPE${year}${month}${day}${hours}${minutes}${seconds}`;
    };

    const handleGenerateId = () => {
        const currentTime = new Date();
        const formattedDateTime: string = formatDateTime(currentTime);
        setTypeId(formattedDateTime);
        setTextGenerator('Save');
        setModalOpen(false);
    }
    
    const handleInputProductType = async () => {
        setModalOpen(true);

        if (isTextGenerator === 'Save'){
            try {
                setModalOpen(false);

                const formData = new FormData();
                formData.append('type_id', isTypeId);
                formData.append('type', isForm.type || '');
                formData.append('description', isForm.description || '');
    
                let hasImage = false;
                images.forEach((image) => {
                    if (image.file) {
                        formData.append('type_img', image.file);
                        hasImage = true;
                    }
                });
                if (!hasImage) {
                    alert('Please upload an image');
                    return;
                }
                const response = await AxiosResponse.post('create-product-type', formData, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status === 201) {
                    setForm({});
                    setImages([]);
                    setTypeId("");
                    refetch();
                    setTextGenerator('Create ID');
                    setCreateSuccess('Your product type has been created');
                    setMessage(true);
                    setTimeout(() => {
                        setMessage(false);
                        setCreateSuccess("");
                    },2000)
                } 
                
            } catch (error: any) {
                const message = error.response.data.message;
                alert(message);
            }
        } else if (isTextGenerator === 'Update') {
            try {
                setModalOpen(false)
                const data = new FormData();
                data.append('type_id', isTypeId);
                data.append('type', isForm.type || '');
                data.append('description', isForm.description || '');
                images.forEach((image) => {
                    if (image.file) {
                        data.append('type_img', image.file);
                    }
                });
                const response = await AxiosResponse.post('update-product-type', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200){
                    setMessage(true)
                    setTimeout(() => {
                        setMessage(false);
                    },2000)
                    setUpdateSuccess('Your prouct type has been updated successfully!');
                    refetch();
                    setForm({});
                    setImages([]);
                    setTypeId("");
                    refetch();
                    setTextGenerator('Create ID');
                }
            } catch (error: any) {
                const message = error.response.message;
                alert(message);
            }
            
        } else {
            return false;
        }
    }

    const handleGetProductType = async () => {
       try {
            const response = await AxiosResponse.get<{ 
                data: {
                    productTypes: TProductType[],
                    meta: { 
                        totalProductTypes: number; 
                        totalPages: number; 
                    }
                }
            }>
            (`get-product-type?page=${currentPage}&limit=${itemsPerPage}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return {
                    data: response.data.data.productTypes,
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
    };

    const { data: productTypeData, refetch } = useQuery({
        queryKey: ['product-types', currentPage, itemsPerPage],
        queryFn: handleGetProductType,
    });
    
    const productTypes = productTypeData?.data || [];
    const totalPages = productTypeData?.meta?.totalPages || 1;  

    // paginations
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            refetch();
        }
    };

    const generatePagination = (totalPages: number, currentPage: number): (number | string)[] => {
        const pagination: (number | string)[] = [];
        pagination.push(1);
        if (currentPage > 3) pagination.push('...');
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pagination.push(i);
        }
        if (currentPage < totalPages - 2) pagination.push('...');
        if (totalPages > 1) pagination.push(totalPages);
        return pagination;
    };

    const handleCleardata = () => {
        setForm({});
        setImages([]);
        setTypeId("");
        setModalOpen(false);
    }
    
    const toggleMenu = (types: TProductType) => {
        const typeId = types.type_id;
        setOpenMenuId((prevId) => (prevId === typeId ? null : typeId));
    };

    const handleEditProductType = async (types: TProductType) => {
        setOpenMenuId('');
        setModalOpen(false);
        setTypeId(types.type_id);
        setForm(types);
        setTextGenerator('Update');
        const imageUrl = `${import.meta.env.VITE_IMAGE_URL}${types.type_img}`;
        setImages([{ file: null, url: imageUrl }]);
        
    }

    const handleDeleteProductType = async (types: TProductType) => {
        setModalDelete(true);
        const takeId = types.type_id;
        setProvideTypeId(takeId);

    }

    const handleAgreeDelete = async () => {
        try {
            const data = {
                typeId: provideTypeId
            } 
            const response = await AxiosResponse.post('delete-product-type',data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setModalDelete(false);
                refetch();
                setDeleteSuccess('Your product type was successfully deleted.');
                setMessage(true) 
                setTimeout(() => {
                    setMessage(false);
                },2000)
                
            }
        } catch (error: any) {
            const message = error.response.message;
            alert(message)
        }
        
    }

    const handleSearchTypeId = async (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter" && searchTypeId.trim() !== "") {
            try {
                const response = await AxiosResponse.post<{ data: TProductType[] }>('search-product-type', {
                    typeId: searchTypeId
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                if (response.status === 200) {
                    setDataSearch(response.data.data)
                }
                
            } catch (error: any) {
                const message = error.response.message;
                alert(message);
            }
        }
    }


    return {
        isForm,
        images,
        handleFileChange,
        handleInputProductType,
        modalOpen,
        setModalOpen,
        isTypeId,
        handleGenerateId,
        isTextGenerator,
        handleChangeProductType,
        productTypeData,
        handlePageChange,
        currentPage,
        totalPages,
        productTypes,
        generatePagination,
        handleCleardata,
        toggleMenu,
        openMenuId,
        menuRef,
        isMessage,
        handleEditProductType,
        handleDeleteProductType,
        handleSearchTypeId,
        searchTypeId,
        setSearchTypeId,
        isDataSearch,
        updateSuccess,
        createSuccess,
        modalDelete,
        handleAgreeDelete,
        setModalDelete,
        deleteSuccess,
        provideTypeId

    }

}