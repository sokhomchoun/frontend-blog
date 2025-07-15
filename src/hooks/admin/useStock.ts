import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useToken } from "../../contexts/TokenProvider";
import { TStockKeeping } from "../../types";
import AxiosResponse  from "axios";
import { useMutation, useQuery } from '@tanstack/react-query';

export function useStock() {
    const location = useLocation();
    const product_id = location.state?._Id;
    const token = useToken();

    const [Form, setForm] = useState<Partial<TStockKeeping>>({});
    const [arrayListStock, setArrayListStock] = useState<TStockKeeping[]>([]);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null); 
    const menuRef = useRef<HTMLDivElement>(null);
    const [isTextGenerator, setIsTextGenerator] = useState<string>('Add Stock');
    const [isMessage, setMessage] = useState<boolean>(false);
    const [createSuccess, setCreateSuccess] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    const handleChangeInputStock = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const stockEntry = {
        id: Date.now(),
        ...Form,
        product_id
    }
    const handleAddStock = () => {
        if (isTextGenerator === 'Add Stock') {
            const provideField = []

            if (!Form.price) provideField.push("Price")
            if (!Form.quantity) provideField.push("Quantity")
            
            if (provideField.length > 0) {
                alert(`Please fill in all fields: ${provideField.join(", ")}`);
                return;
            }
            setArrayListStock((prevState) => [
                ...prevState, 
                stockEntry as TStockKeeping
            ]);
            setForm({});

        } else if (isTextGenerator === 'Update') {
            
            if (!Form.id) {
                alert("Please select a stock to update");
                return;
            }
            setArrayListStock((prevUpdate) => 
                prevUpdate.map((item) => 
                    item.id === Form.id ? { ...item, ...Form }: item
                ));
                
            setIsTextGenerator('Add Stock');
            setForm({});

        } else {
            return false;
        }
    }

    const totalStocks = arrayListStock.reduce((sum, item) => 
        sum + parseInt(item.quantity?.toString() || "0", 10), 
        0
    );

    const toggleMenu = (items: TStockKeeping) => {
        const itemId = items.id;
        setOpenMenuId((prevId) => (prevId === itemId? null : itemId));
    }

    const handleEditStock = (items: TStockKeeping) => {
        setOpenMenuId('');
        setIsTextGenerator('Update');
        setForm(items);
    }

    const handleDeleteStock = (items: TStockKeeping) => {
        const itemId = items.id;
        setArrayListStock((prevDelete) => {
            return prevDelete.filter(item => item.id !== itemId)
        });
    }

    const handleCancel = () => {
        setIsTextGenerator('Add Stock');
        setForm({});
        setOpenMenuId('');
    }

    const onSubmit = async (data: TStockKeeping[]) => {
        if (arrayListStock.length === 0) {
            setMessage(false);
            alert('Please add stock before submitting');
            return;
        }
        try {
            const response = await AxiosResponse.post('/submit-stock', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error('Error submitting stock:', error);
            throw error;
        }
    };
    
    const mutation = useMutation({
        mutationFn: onSubmit,
        onSuccess: (data) => {
            if (data) {
                setMessage(true);
                setCreateSuccess('Your stock has been submit successfully.');
                setTimeout(() => {
                    setMessage(false);
                    setCreateSuccess('');
                },2000)
                setArrayListStock([]);
            }
        },
        onError: (error) => {
            console.error('Error submitting stock:', error);
        }
    });

    const handleSubmitStock = () => {
        const stockData: TStockKeeping[] = arrayListStock;
        mutation.mutate(stockData);
    };

    const handleGetStock = async () => {
        try {
            const response = await AxiosResponse.get<{
                data: {
                    stock: TStockKeeping[],
                    meta: {
                        totalStocks: number;
                        totalPages: number;
                    }
                }
            }>(`get-stock?page=${currentPage}&limit=${itemsPerPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }   
            }); 
            
            if (response.status === 200) {
                return {
                    data: response.data.data.stock,
                    meta: response.data.data.meta
                }
            }

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            throw error;
        }
    }

    const { data: StockData, refetch } = useQuery({
        queryKey: ['stock', currentPage, itemsPerPage],
        queryFn: handleGetStock,
    });

    const stocks = StockData?.data || [];
    const totalPages = StockData?.meta?.totalPages || 1;

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

        for (let i = Math.max(18, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pagination.push(i);
        }
        if (currentPage < totalPages - 18) pagination.push('...');
        
        if (totalPages > 1) pagination.push(totalPages);
        
        return pagination;
    };
    
    return {
        product_id,
        Form,
        arrayListStock,
        handleChangeInputStock,
        handleAddStock,
        totalStocks,
        toggleMenu,
        openMenuId,
        menuRef,
        handleEditStock,
        isTextGenerator,
        handleDeleteStock,
        handleCancel,
        handleSubmitStock,
        isMessage,
        createSuccess,
        stocks,
        currentPage,
        handlePageChange,
        totalPages,
        generatePagination
    };
}
