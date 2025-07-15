import { useState, useRef } from 'react';
import { TImageType, TBrand } from '../../types';
import AxiosResponse from 'axios';
import { useToken } from '../../contexts/TokenProvider';
import { useQuery } from '@tanstack/react-query';

export function useBrand() {

    const token = useToken();
    const [images, setImages ] = useState<TImageType[]>([]);
    const [isTextGenerator, setTextGenerator] = useState<string>('Create ID');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isBrandId, setBrandId] = useState<string>('');
    const [isForm, setForm] = useState<Partial<TBrand>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [openMenuId, setOpenMenuId] = useState<string | null>(null); 
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMessage, setMessage] = useState<boolean>(false);
    const [updateSuccess, setUpdateSuccess] = useState<string>('');
    const [createSuccess, setCreateSuccess] = useState<string>('');
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [deleteSuccess, setDeleteSuccess] = useState<string>('');
    const [provideBrnadId, setProvideTypeId] = useState<string | null>(null);
    const [searchBrandId, setSearchBrandId] = useState<string>('');
    const [dataSearchByBrandId, setDataSearchByBrandId] = useState<TBrand[]>([]);

    
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const selectFiles = Array.from(files).map((file) => ({file,
                url: URL.createObjectURL(file),
            }));
            setImages(selectFiles);
        }
    }

    const formatDateTime = (dateTime: Date): string => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        return `B${year}${month}${day}${hours}${minutes}${seconds}`;
    };

    const handleGenerateId = () => {
        const currentTime = new Date();
        const formattedDateTime: string = formatDateTime(currentTime);
        setBrandId(formattedDateTime);
        setTextGenerator('Save');
        setModalOpen(false);
    }

    const handleChangeBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleInputBrand = async () => {
        setModalOpen(true);

        if (isTextGenerator === 'Save') {
            setModalOpen(false);

            const formData = new FormData();
            formData.append('brand_id', isBrandId);
            formData.append('brand', isForm.brand || '');
            images.forEach((image) => {
                if (image.file) {
                    formData.append('brand_img', image.file);
                }
            });

            try {
                const response = await AxiosResponse.post('create-brand', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    setImages([]);
                    setForm({});
                    setBrandId('');
                    setTextGenerator('Create ID');
                    setModalOpen(false);
                    refetch();
                    setMessage(true);
                    setCreateSuccess('Your brand has been created successfully.');
                    setTimeout(() => {
                        setMessage(false);
                        setCreateSuccess('');
                    },2000)
                }
            } catch (error: any) {
                const message = error.response.message;
                alert(message)
            }
        } else if (isTextGenerator === 'Update') {

            setModalOpen(false);
            const data = new FormData();
            data.append('brand_id', isBrandId);
            data.append('brand', isForm.brand || '');
            images.forEach((img) => {
                if (img.file) {
                    data.append('brand_img', img.file)
                }
            })

            try {
                const response = await AxiosResponse.post('update-brand',data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setImages([]);
                    setForm({});
                    setBrandId('');
                    setTextGenerator('Create ID');
                    setModalOpen(false);
                    refetch();
                    setUpdateSuccess('Your brand has been updated successfully.');
                    setMessage(true);
                    setTimeout(() => {
                        setMessage(false);
                        setUpdateSuccess('')
                    }, 2000);
                }

            } catch (error: any) {
                const message = error.response.message;
                alert(message);
            }

        } else {
            return false;
        }
    }

    const handleGetBrand = async () => {
        try {
            const response = await AxiosResponse.get<{ 
                data: {
                    brands: TBrand[],
                    meta: {
                        totalBrands: number;
                        totalPages: number;
                    }
                }
            }>(`b-get-brand?page=${currentPage}&limit=${itemsPerPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return {
                   brands: response.data.data.brands,
                   meta: response.data.data.meta,
               };
           }
        } catch (error: any) {

            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            throw error;
        }
    }

    const { data: brandData, refetch } = useQuery({
        queryKey: ['brand', currentPage, itemsPerPage],
        queryFn: handleGetBrand,
    });

    const itemBrands = brandData?.brands || [];
    const totalPages = brandData?.meta?.totalPages || 1;
    
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
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pagination.push(i);
        }
        
        // Show ellipsis if the current page is far from the end
        if (currentPage < totalPages - 2) pagination.push('...');
        
        // Always show the last page
        if (totalPages > 1) pagination.push(totalPages);
        
        return pagination;
    };
    
    const handleEditBrand = async(items: TBrand) => {
        setOpenMenuId('');
        setModalOpen(false);
        setBrandId(items.brand_id);
        setForm(items);
        setTextGenerator('Update');
        const imageUrl = `${import.meta.env.VITE_IMAGE_URL}${items.brand_img}`;
        setImages([{ file: null, url: imageUrl }]);
        
    }

    const handleCleardata = () => {
        setBrandId('');
        setForm({});
        setImages([]);
        setTextGenerator('Create ID');
        setModalOpen(false);
        refetch();
    };

    const toggleMenu = (items: TBrand) => {
        const brandId = items.brand_id;
        setOpenMenuId((prevId) => (prevId === brandId ? null : brandId));
    };

    const handleDeleteBrand = async (items: TBrand) => {
        setModalDelete(true);
        const brandId = items.brand_id;
        setProvideTypeId(brandId);
    };

    const handleAgreeDelete = async () => {
        try {
            const data = {
                brandId: provideBrnadId
            }
            const response = await AxiosResponse.post('delete-brand', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setModalDelete(false);
                setDeleteSuccess("Your brand was successfully deleted.")
                setMessage(true);
                setTimeout(() => {
                    setMessage(false);
                    setDeleteSuccess('');
                }, 2000);
                refetch();
            }
        } catch (error: any) {
            const message = error.message;
            alert(message);
        }
    };

    const handleSearchBrandId = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchBrandId?.trim() !== "") {
            try {
                const response = await AxiosResponse.post<{ data: TBrand[] }>('search-brand', {
                    brandId: searchBrandId
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setDataSearchByBrandId(response.data.data);
                }

            } catch (error: any) {
                const message = error.message;
                console.log(message);
            }
        }
    };

    return { 
        images, 
        handleFileChange,
        isBrandId,
        handleGenerateId,
        isTextGenerator,
        modalOpen,
        setModalOpen,
        handleInputBrand,
        handleChangeBrand,
        isForm,
        itemBrands,
        toggleMenu,
        openMenuId,
        menuRef,
        isMessage,
        handleEditBrand,
        handlePageChange,
        currentPage,
        totalPages,
        generatePagination,
        handleCleardata,
        updateSuccess,
        createSuccess,
        handleDeleteBrand,
        setModalDelete,
        modalDelete,
        provideBrnadId,
        handleAgreeDelete,
        deleteSuccess,
        handleSearchBrandId,
        setSearchBrandId,
        searchBrandId,
        dataSearchByBrandId,

    };

}