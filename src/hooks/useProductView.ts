import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery  } from "@tanstack/react-query";
import { getProductView, getListTypeProduct } from "../services/api/api_product_view";
import { TCart, TProduct } from "../types";
import { ProvideToken, uIdToken } from "../token/token";
import  AxiosResponse from "axios";
import { useToken } from "../contexts/TokenProvider";

export function useProductView() {

    const provideToken = ProvideToken();
    const _uId = uIdToken();
    const token = useToken();
    const location = useLocation();
    const navigation = useNavigate();
    const ObjectProductId = location.state?._productId;
    
    const [selectedImage, setSeletedImage] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [countCart, setCountCart] = useState<number>(0);

    const { 
        data: dataProductView, 
        isLoading: isLoadingProductView 
        
    } = useQuery({
        queryKey: ['productView', ObjectProductId],
        queryFn:() => getProductView(ObjectProductId),
    });
    const itemProductViews = dataProductView?.data || [];

    // type product view
    const typeId = itemProductViews[0]?.type_id;
    const { 
        data: TypeProductView, 
        isLoading: isLoadingTypeProductView 
    } = useQuery({
        queryKey: ['TypeProductView', typeId],
        queryFn: () => getListTypeProduct(typeId),
        enabled: !!typeId,  // Only run if typeId is available
    });
    const itemTypeProducts = TypeProductView?.data || [];

    const incrementQuantity = () => {
        if (!token) {
            alert('Please login to add cart');
            navigation('/login')
            return;
        };

        if (itemProductViews.length > 0) {
            for (const product of itemProductViews) {
                if (!product.stockKeeping || product.stockKeeping.length === 0) {
                    const newQuantity = quantity + 1;
                    if (newQuantity > product.quantity) {
                        alert("Quantity out of stock");
                        return;
                    }
                    setQuantity((prev) => prev + 1);
                    return;
                } else if (product.stockKeeping.length > 0) {
                    // Extract available colors and sizes from stockKeeping
                    const availableColors = [...new Set(product.stockKeeping.map(item => item.color).filter(Boolean))];
                    const availableSizes = [...new Set(product.stockKeeping.map(item => item.size).filter(Boolean))];
        
                    if (availableColors.length > 0 && !availableColors.includes(selectedColor)) {
                        alert("Please select a valid color.");
                        return;
                    };
                    
                    if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
                        alert("Please select a valid size.");
                        return;
                    };
        
                    // Find the specific stockKeeping entry based on selected color and size
                    const selectedStock = product.stockKeeping.find(
                        (item) => item.color === selectedColor && item.size === selectedSize
                    );
        
                    if (!selectedStock) {
                        alert("Color and size are not available");
                        return;
                    };
        
                    const newQuantity = quantity + 1;
                    if (newQuantity > selectedStock.quantity) {
                        alert("Quantity out of stock");
                        return;
                    };
                    setQuantity((prev) => prev + 1);
                    return;
                }
            }
        }
    }

    const decrementQuantity = () => {
        // check token for decrement quantity
        if (!token) {
            alert('Please login to add cart');
            navigation('/login')
            return;
        }
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    }

    const handleAddCart = async (products: TProduct) => {
        if (!provideToken) {
            alert('Please login to add cart');
            navigation('/login');
            return;
        }
    
        if (!products.stockKeeping || products.stockKeeping.length === 0) {
            // alert("Stock keeping is empty. Adding to cart without size and color.");
        } else {

            const availableColors = [...new Set(products.stockKeeping.map(item => item.color).filter(Boolean))];
            const availableSizes = [...new Set(products.stockKeeping.map(item => item.size).filter(Boolean))];

            if (availableColors.length > 0 && !availableColors.includes(selectedColor)) {
                alert("Please select a valid color.");
                return;
            }
    
            if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
                alert("Please select a valid size.");
                return;
            }
        }
    
        const payload = {
            user_id: Number(_uId),
            product_id: products.product_id,
            product_name: products.product_name,
            product_img: products.product_img,
            size: selectedSize || "",
            color: selectedColor || "",
            quantity: quantity,
            price: products.price,
            discount: products.discount,
            brand_id: products.brand_id,
            type_id: products.type_id
        };
    
        try {
            const response = await AxiosResponse.post<{ 
                data: {
                    carts: TCart,
                    counts: number
                }
            }>('f-user-order-items', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (response.status === 201) {
                setCountCart(response.data.data.counts)
                alert('Product added to cart successfully');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const isLoading = isLoadingProductView || isLoadingTypeProductView;

    return {
        ObjectProductId,
        itemProductViews,
        selectedImage,
        setSeletedImage,
        isLoading,
        handleAddCart,
        selectedColor,
        setSelectedColor,
        selectedSize,
        setSelectedSize,
        itemTypeProducts,
        quantity,
        decrementQuantity,
        incrementQuantity,
        countCart
        
    }
    
}