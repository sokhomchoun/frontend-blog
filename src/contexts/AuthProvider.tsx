import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { TAuthContext } from '../types';

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string>(() => sessionStorage.getItem('token') || '')
    const navigate = useNavigate();

    const login = (token: string) => {

        setAccessToken(token);
        setUser('User');
        sessionStorage.setItem('token', token);
        navigate('/');  
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
