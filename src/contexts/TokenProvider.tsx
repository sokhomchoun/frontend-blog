import React, { createContext, useContext, useState, useEffect } from 'react';

const TokenContext = createContext<string | null>(null);

export const useToken = () => useContext(TokenContext);

export const TokenProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        
    }, [])

    return <TokenContext.Provider value={token}>
        {children}
    </TokenContext.Provider>
}