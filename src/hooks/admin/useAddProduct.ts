import React, { useState, useEffect } from "react"; 
import { useQuery, useMutation  } from "@tanstack/react-query";
import { TProductType, TBrand, TProduct, TImageType, TSubProduct } from "../../types";
import AxiosResponse from "axios";
import { useToken } from "../../contexts/TokenProvider";
import { useLocation } from "react-router-dom";

export function useAddProduct() {

    const location = useLocation();
    const ObjectProductId = location.state?.ProvideProduct;
    
    const token = useToken();
    const [isPrice, setPrice] = useState<string>('');
    const [isPercent, setPercent] = useState<string>('');
    const [discountedPrice, setDiscountedPrice] = useState<string>('');
    const [isCalculateDiscount, setCalculateDiscount] = useState<string>('');
    const [isDropdownType, setDropdownType] = useState<boolean>(false);
    const [isDropdownBrand, setDropdownBrand] = useState<boolean>(false);
    const [searchType, setSearchType] = useState<string>(''); 
    const [dataSearchType, setDataSearchType] = useState<TProductType[]>([]);
    const [searchBrand, setSearchBrand] = useState<string>('');
    const [dataSearchBrand, setDataSearchBrand] = useState<TBrand[]>([]);
    const [isTextGenerator, setTextGenerator] = useState<string>('Create ID');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [provideProductId, setProvideProductId] = useState<string>('');
    const [provideTypeId, setProvideTypeId] = useState<string>('');
    const [provideBrandId, setProvideBrandId] = useState<string>('');
    const [valueSelectType, setValueSelectType] = useState<string>('');
    const [valueSelectBrand, setValueSelectBrand] = useState<string>(''); 
    const [isMessage, setMessage] = useState<boolean>(false);
    const [createSuccess, setCreateSuccess] = useState<string>('');
    const [updateSuccess, setUpdateSuccess] = useState<string>('');
    const [images, setImages] = useState<TImageType[]>([]);
    const [subImages, setSubImages] = useState<TImageType[]>([]);
    
    const [isForm, setForm] = useState<{
        product: Partial<TProduct>;
        productType: Partial<TProductType>;
        brand: Partial<TBrand>;
        subImages: Partial<TSubProduct>

    }>({
        product: {},
        productType: {},
        brand: {},
        subImages: {},

    })

        const handleChangeDollar = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
    
            if (value === '' || value === '$') {
                setPrice(''); // Keep empty if input is cleared
                setForm(prevState => ({
                    ...prevState,
                    product:{ ...prevState.product, price: '' }
                }));

            } else if (!value.startsWith('$')) {
                setPrice(`$ ${value}`); // Add `$` if user starts typing
                setForm(prevState => ({
                    ...prevState,
                    product: { ...prevState.product, price: value }
                }));

            } else {
                setPrice(value); // Update value));
                setForm(prevState => ({
                    ...prevState,
                    product: { ...prevState.product, price: value.replace('$', '') }
                }));
            }
        }

        const handleChangePercent = (e: React.ChangeEvent<HTMLInputElement>) => {
            const valuePercent = e.target.value;

            if (valuePercent === '' || valuePercent === '%') {
                setPercent('');
                setForm(prev => ({
                    ...prev,
                    product:{ ...prev.product, price: ''  }
                }))
            } else if (!valuePercent.startsWith('%')) {
                setPercent(`% ${valuePercent}`);
                setForm(prev => ({
                    ...prev,
                    product: { ...prev.product, discount: valuePercent }
                }))
            } else {
                setPercent(valuePercent);
                setForm(prev => ({
                    ...prev,
                    product: { ...prev.product ,discount: valuePercent.replace('%', '') }
                }));
            }
        }

        const handleCalculateDiscount = () => {
            if (discountedPrice && !discountedPrice.startsWith('$')) {
                setCalculateDiscount(`$ ${discountedPrice}`);
            } else {
                setCalculateDiscount(discountedPrice);
            }
        };

        const dropdownToggleType = () => {
            setDropdownType((prevState) => !prevState)
        }

        const dropdownToggleBrand = () => {
            setDropdownBrand((prev) => !prev)
        }

        const handleGetProductType = async () => {
            try {
                const response = await AxiosResponse.get<{ 
                    data: {
                        typeData: TProduct[], 
                        
                    } }>('p-get-product-type', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    return {
                        data: response.data.data.typeData,
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

        const { data: productTypeData } = useQuery({
            queryKey: ['product-type'],
            queryFn: handleGetProductType
        });
        
        const productTypes = productTypeData?.data || [];

        const handleSearchType = async (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && searchType.trim() !== '') {
                try {
                    const response = await AxiosResponse.post<{ data: TProductType[] }>('p-search-prorduct-type', {
                        type: searchType
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setDataSearchType(response.data.data)
                    }
                } catch (error: any) {
                    const message = error.message;
                    console.log(message)
                }
            }
        }
        const handleGetBrand = async () => {
            try {
                const response = await AxiosResponse.get<{
                    data: {
                        brandData: TBrand[],
                    }}>('p-get-brand', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    return {
                        data: response.data.data.brandData
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

        const { data: brandData } = useQuery({
            queryKey: ['brand'],
            queryFn: handleGetBrand
        });

        const brands = brandData?.data || [];

        const handleSearchBrand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && searchBrand.trim() !== '') {
                try {
                    const response = await AxiosResponse.post<{ data: TBrand[] }>('p-search-brand', {
                        brand: searchBrand
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setDataSearchBrand(response.data.data)
                    }
                } catch (error: any) {
                    const message = error.message
                    console.log(message);
                    
                }
            }
        }

        const handleSelectType = (itemTypes: TProductType | TProduct) => {
            const type_Id = itemTypes.type_id;
            setProvideTypeId(type_Id);
            setDropdownType(false);
            setValueSelectType(itemTypes.type ?? "")
        }

        const handleSelectBrand = (itemBrands: TBrand) => {
            const brand_Id = itemBrands.brand_id;
            setProvideBrandId(brand_Id)
            setDropdownBrand(false);
            setValueSelectBrand(itemBrands.brand)
        }

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files
            if (files) {
                const selectFiles = Array.from(files).map((file) => ({file,
                    url: URL.createObjectURL(file),
                }));
                setImages(selectFiles);
            }
        }

        const handleInputSubImage = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file =  e.target.files
            if (file) {
                const currentImageCount = subImages.length;
                if (currentImageCount >= 4) {
                    alert("You can only upload up to 4 images.");
                    return;
                }
                const fileArary = Array.from(file).map((file) => ({
                    file, 
                    url: URL.createObjectURL(file),
                }));
                setSubImages((prevImage) => [
                    ...prevImage,
                    ...fileArary
                ]);
            }
        }

        const handleRemoveSubImg = (index: number) => {
            setSubImages((prevImages) => prevImages.filter((_, i) => i !== index));
        }

        const formatDateTime = (dateTime: Date): string => {
            const year = dateTime.getFullYear();
            const month = String(dateTime.getMonth() + 1).padStart(2, '0');
            const day = String(dateTime.getDate()).padStart(2, '0');
            const hours = String(dateTime.getHours()).padStart(2, '0');
            const minutes = String(dateTime.getMinutes()).padStart(2, '0');
            const seconds = String(dateTime.getSeconds()).padStart(2, '0');
            return `P${year}${month}${day}${hours}${minutes}${seconds}`;
        };

        const handleGenerateId = () => {
            const currentTime = new Date();
            const formattedDateTime: string = formatDateTime(currentTime);
            setProvideProductId(formattedDateTime);
            setTextGenerator('Save');
            setModalOpen(false);
        };

        const handleChangeInputProduct = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value }  = e.target;
            setForm((prevForm) => ({
                ...prevForm,
                product: {
                    ...prevForm.product,
                    [name]: value,
                },
            }));
        };

        const handleInputProduct = async () => {
            setModalOpen(true);
            if (isTextGenerator === 'Save') {
                setModalOpen(false);
                const data = new FormData();
                data.append('product_id',  provideProductId);
                data.append('product_name', isForm.product.product_name || '');
                images.forEach((image) => {
                    if (image.file) {
                        data.append('product_img', image.file);
                    }
                });
                subImages.forEach((img, index) => {
                    if (img.file) {
                        data.append(`subproduct_img${index + 1}`, img.file);
                    }
                });
                data.append('brand_id', provideBrandId)
                data.append('type_id', provideTypeId);
                data.append('price', isForm.product.price || '');
                data.append('discount', isForm.product.discount || '');
                data.append('expiration', isForm.product.expiration || '');
                data.append('description', isForm.product.description || '');
                try {
                    const response = await AxiosResponse.post('create-product',data, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 201) {
                        setMessage(true);
                        setTimeout(() => {
                            setMessage(false);
                        }, 2000)
                        setProvideProductId('');
                        setImages([]);
                        setSubImages([]);
                        setDiscountedPrice('');
                        setPrice('');
                        setPercent('');
                        setCalculateDiscount('');
                        setValueSelectType('');
                        setValueSelectBrand('');
                        setForm({
                            product: {
                                product_name: '',
                                price: '',
                                discount: '',
                                expiration: '',
                                desciption: '',
                            },
                            productType: {},
                            brand: {}, 
                            subImages: {},

                        });
                        setCreateSuccess('Your product has been created successfully.')
                        setTextGenerator('Create ID');
                    }

                } catch (error: any) {
                    const message = error.message;
                    console.log(message);
                }
            } else if (isTextGenerator === 'Update') {
                setModalOpen(false);

                const data = new FormData();
                data.append('product_id', isForm.product.product_id || '');
                data.append('product_name', isForm.product.product_name || '');
                images.forEach((image) => {
                    if (image.file) {
                        data.append('product_img', image.file);
                    }
                });
                subImages.forEach((img, index) => {
                    if (img.file) {
                        data.append(`subproduct_img${index + 1}`, img.file);
                    }
                });
                data.append('brand_id', provideBrandId)
                data.append('type_id', provideTypeId);
                data.append('price', isForm.product.price || '');
                data.append('discount', isForm.product.discount || '');
                data.append('expiration', isForm.product.expiration || '');
                data.append('description', isForm.product.description || '');
                try {
                    const response = await AxiosResponse.post('update-product', data, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if (response.status === 200) {
                        setMessage(true)
                        setTimeout(() => {
                            setMessage(false);
                        },2000)
                        setUpdateSuccess('Your prouct has been updated successfully!');
                        setTextGenerator('Create ID');
                        setModalOpen(false);
                        setProvideProductId('');
                        setImages([]);
                        setSubImages([]);
                        setDiscountedPrice('');
                        setPrice('');
                        setPercent('');
                        setCalculateDiscount('');
                        setValueSelectType('');
                        setValueSelectBrand('');
                        setForm({
                            product: {
                                product_name: '',
                                price: '',
                                discount: '',
                                expiration: '',
                                desciption: '',
                            },
                            productType: {},
                            brand: {},
                            subImages: {},
                        });
                    }
                } catch (error: any) {
                    const message = error.message;
                    console.log(message);
                }

            } else {
                return false;
            }
        }

        const handleClearProduct = () => {
            setProvideProductId('');
            setImages([]);
            setSubImages([]);
            setDiscountedPrice('');
            setPrice('');
            setPercent('');
            setCalculateDiscount('');
            setValueSelectType('');
            setValueSelectBrand('');
            setForm({
                product: {
                    product_name: '',
                    price: '',
                    discount: '',
                    expiration: '',
                    description: '',
                },
                productType: {},
                brand: {},
                subImages: {},
            });
            setTextGenerator('Create ID');
        }

        const SelectProduct = async (
            payload =  { ProductId: ObjectProductId }, 
            token: string
        ) => {
            const response = await AxiosResponse.post("select-product", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) { 
                return response.data;
            }
        };

        const mutation = useMutation({
            mutationFn: (
                payload: { ProductId: string }
            ) => SelectProduct(payload, token || ''),

            onSuccess: (data) => {
                const fetchedProduct = (data as TProduct)?.data[0];

                const subProductImages = fetchedProduct.SubProduct?.flatMap((subProduct: any) =>
                    Object.keys(subProduct)
                        .filter((key) => key.startsWith('subproduct_img') && subProduct[key]) // Filter valid keys
                        .map((key) => ({
                            file: null, // Assuming no file initially
                            url: `${import.meta.env.VITE_IMAGE_URL}${subProduct[key]}`,
                        }))
                ) || [];
                
                setForm({
                    product: {
                        product_id: fetchedProduct.product_id,
                        product_name: fetchedProduct.product_name,
                        description: fetchedProduct.description,
                        expiration: fetchedProduct.expiration
                    },
                    productType: {
                        type: fetchedProduct.productType.type,
                    },
                    brand: {
                        brand: fetchedProduct.productBrand.brand,
                    },
                    subImages: subProductImages,
                });

                const productImage = `${import.meta.env.VITE_IMAGE_URL}${fetchedProduct.product_img}`;
                setImages([{
                    file: null,
                    url: productImage,
                }])
                setSubImages(subProductImages);
                setPrice(fetchedProduct.price?.toString() || '');
                setPercent(fetchedProduct.discount?.toString() || '');
                setTextGenerator('Update');
            },
            onError: (error: any) => {
                console.error("Error:", error.message);
            },
        });
        
        const handleSelectProduct = () => {
            if (!ObjectProductId || ObjectProductId.trim() === "") {
                return;
            }
            const payload = { ProductId: ObjectProductId };
            mutation.mutate(payload);
        };
        
        useEffect(() => {
            if (isPrice && isPercent) {
                const priceValue  = parseFloat(isPrice.replace('$', '').trim());
                const discountValue = parseFloat(isPercent.replace('%', '').trim());

                if (!isNaN(priceValue) && !isNaN(discountValue)) {
                    const calculatePrice = priceValue - (priceValue * discountValue) / 100;
                    setDiscountedPrice(calculatePrice.toFixed(2));
                } else {
                    setDiscountedPrice('');
                }
            }
           
        },[isPrice, isPercent])

        useEffect(() => {
            handleCalculateDiscount();
        })

        useEffect(() => {
            handleSelectProduct();
        },[])

    return {
        handleChangeDollar,
        isPrice,
        handleChangePercent,
        isPercent,
        discountedPrice,
        isCalculateDiscount,
        dropdownToggleType,
        dropdownToggleBrand,
        isDropdownType,
        isDropdownBrand,
        productTypes,
        searchType,
        setSearchType,
        handleSearchType,
        dataSearchType,
        brands,
        handleSearchBrand,
        setSearchBrand,
        searchBrand,
        dataSearchBrand,
        isTextGenerator,
        handleInputProduct,
        modalOpen,
        setModalOpen,
        handleGenerateId,
        provideProductId,
        handleSelectType,
        handleSelectBrand,
        images,
        handleFileChange,
        handleChangeInputProduct,
        isForm,
        valueSelectType,
        valueSelectBrand,
        isMessage,
        createSuccess,
        handleInputSubImage,
        handleRemoveSubImg,
        subImages,
        updateSuccess,
        handleClearProduct
        
    }

}