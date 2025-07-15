import { useState } from "react";
import { TUser } from "../types";
import AxiosResponse from "axios";
import { useNavigate } from "react-router-dom";

export function useRegister(){
    const navigate = useNavigate();
    const [isForm, setForm] = useState<Partial<TUser>>({});

    const handleInputUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignUp = async () => {
        try {
            const response = await AxiosResponse.post('create-user', isForm);

            if (response.status === 201) {
                alert('User created successfully');
                setForm({});
            }
            
        } catch (error: any) {
            const message = error.response.data.message;
            alert(message);
        }
    }

    const handleGotoLogin = () => {
        navigate('/login')
    }

    return {
        handleSignUp,
        handleInputUser,
        handleGotoLogin,
        isForm,
    }
}