interface TUser {
    username: string;
    email: string;
    phone_number: string;
    password: string;
}
interface TAuthContext {
    user: string | null;
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}
interface TProductType {
    type_id: string;
    type?: string;
    type_img: string;
    status: string;
    description: string;
}
interface TBrand {
    brand_id: string;
    brand: string;
    brand_img: string;
    status: string;
}
interface TImageType {
    file: File | null;
    url: string;
}
interface TProduct {
    product_id: string;
    product_name: string;
    product_img: string;
    brand_id: string;
    type_id: string;
    price: string;
    discount: string;
    expiration: string;
    status: string;
    description?: string;
    [key: string]: any;
    SubProduct: SubProduct[];
    stockKeeping: stockKeeping[];
    products: any

}
interface TSubProduct {
    product_id: string;
    subproduct_img1?: string;
    subproduct_img2?: string;
    subproduct_img3?: string;
    subproduct_img4?: string;
    status: string;
}
interface TStockKeeping {
    id: string;
    product_id: string;
    color: string;
    size: string;
    quantity: number;
    price: string;
    minimun_stock: number;
    status: string;
}
interface TLoginResponse {
    access_token: string;
    _uId: string;
}
interface TCart {
    user_id: number,
    product_id: string,
    product_name: string,
    product_img: string,
    size: string,
    color: string,
    quantity: number,
    price: string,
    discount: string,
    brand_id: string,
    type_id: string,
    status: string
}
interface TProps {
    countValues?: number
}
interface TButtonProps {
    onClick?: () => void;
    isTextGenerator?: string;
    textButton?: string;
}
interface TMessageProps {
    message?: string;
}
interface TModalGenerateProps {
    titleModal?: string;
    setModalOpen: (value: boolean) => void;
    handleGenerateId: () => void;
}
interface TModalDeleteProps {
    titleModal?: string;
    setModalDelete: (value: boolean) => void;
    handleAgreeDelete: () => void;
}

export {
    TAuthContext,
    TUser,
    TProductType,
    TBrand,
    TImageType,
    TProduct,
    TSubProduct,
    TStockKeeping,
    TLoginResponse,
    TCart,
    TProps,
    TButtonProps,
    TMessageProps,
    TModalGenerateProps,
    TModalDeleteProps
    
}