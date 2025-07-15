import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, listCategory, listOrder } from "../services/api/api_category";
import { TProductType } from "../types";
import { useNavigate, useLocation } from "react-router-dom";
import { uIdToken, ProvideToken } from "../token/token";

export function useHeader() {

    const ObjectUserId = uIdToken()
    const provideToken = ProvideToken();

    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isCheckedProduct, setIsCheckedProduct] = useState<string[]>([])
    
    const { data: listCategories } = useQuery({
        queryKey: ['categories'],
        queryFn:() => getCategories(),
    });
    const itemsCategories = listCategories?.data || [];

    const hanldeDetailCategory = async (items: TProductType) => {
        navigate(`/listcategory`, { state: { __type_id: items.type_id } });
    }

    const ObjectTypeId = location.state?.__type_id;
    const { data: dataType } = useQuery({
        queryKey: ['type', ObjectTypeId],
        queryFn: () => listCategory(ObjectTypeId),
        enabled: !!ObjectTypeId,
    });
    const itemTypes = dataType?.data || [];

    const handleSignIn = () => {
        navigate('/login')
    }

    const { data: list, isLoading } = useQuery({
        queryKey: ['listOrder', ObjectUserId],
        queryFn: () => listOrder(Number(ObjectUserId)),
        enabled: !!ObjectUserId,
    });
    
    const itemsOrder = list?.data || [];
    const count = list?.count || 0;

    // checkbox product 
    const handleCheckboxChange = (product_id: string) => {
        setIsCheckedProduct((prevSelected) =>
            prevSelected.includes(product_id)
                ? prevSelected.filter((id) => id !== product_id) // Remove if unchecked
                : [...prevSelected, product_id] // Add if checked
        );
    };

    // Calculate total price based on selected checkboxes
    const AfterPrice = itemsOrder.reduce((acc, item) => {
        if (isCheckedProduct.includes(item.product_id)) {
            const Price = parseFloat(String(item.price || 0));
            const Discount = parseInt(String(item.discount || 0));
            const PriceAfterDiscount = parseFloat(String(Price)) - (parseFloat(String(Price)) * parseFloat(String(Discount))) / 100;
            // return acc + PriceAfterDiscount;
            const Quantity = parseInt(String(item.quantity || 1)); // Default to 1 if quantity is missing
            
            // Add the total price for this product (after discount) and considering quantity
            return acc + PriceAfterDiscount * Quantity;
        }
        return acc;
    }, 0);

    const handleLogo = () => {
        navigate('/')
    }

    const handleToCart = () =>{
        if (!provideToken) {
            alert('Please login to add cart');
            navigate('/login')
            return;
        }
        navigate('/cart');
    }

    return {
        isHovered,
        setIsHovered,
        itemsCategories,
        hanldeDetailCategory,
        itemTypes,
        handleSignIn,
        count,
        handleLogo,
        handleToCart,
        itemsOrder,
        isLoading,
        AfterPrice,
        
        isCheckedProduct,
        handleCheckboxChange

    }
}
