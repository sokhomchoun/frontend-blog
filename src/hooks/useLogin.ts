import { useState } from "react";
import AxiosResponse  from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { TLoginResponse } from "../types";

export function useLogin() {

    const { login } = useAuth();
    const navigate = useNavigate();
    const [isEmailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isMessage, setMessage] = useState(false);
    
    const handleSignIn = async () => {
        
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(isEmailOrPhoneNumber);

        const loginData = isEmail
            ? { email: isEmailOrPhoneNumber, password }
            : { phone_number: isEmailOrPhoneNumber, password };

        try {
            const response = await AxiosResponse.post<TLoginResponse>('login-user',loginData);

            if (response.status === 200) {
                login(response.data.access_token);
                sessionStorage.setItem('_uid', response.data._uId)
            }
        } catch (error: any) {
            const message = error.response.data.message;
            alert(message)
            setMessage(true)
        }
    }

    const handleGotoSignup = () => {
        navigate('/register')
    }

    return {
        handleSignIn,
        setEmailOrPhoneNumber,
        setPassword,
        isMessage,
        handleGotoSignup
    }
}