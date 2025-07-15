import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';

// Define the expected structure of the token response data
interface TokenResponse {
    data: {
        token: string;
    };
    dataUser?: {
        isRole: string;
    };
}

const PrivateRoute = () => {
    const { accessToken } = useAuth();
    const [hasAccess, setHasAccess] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const TokenProvider = async () => {
            if (!accessToken) {
                setHasAccess(false);
                return;
            }
            const dataToken = {
                payload: accessToken,
            };
            try {
                // Specify the type of the response data here
                const responseToken = await axios.post<TokenResponse>('search-token', dataToken);

                if (responseToken.status === 200) {
                    const searchToken = responseToken.data;
                    if (searchToken) {
                        const token = searchToken.data.token;
                        const dataUser = searchToken.dataUser?.isRole;
                        if (token === accessToken && dataUser === 'A') {
                            setHasAccess(true);
                        } else {
                            setHasAccess(false);
                        }
                    }
                }
            } catch (error) {
                console.error("Error during token validation:", error);
                setHasAccess(false);
            }
        };

        TokenProvider();
    }, [accessToken]);

    if (hasAccess === undefined) {
        return <div></div>;
    }

    return hasAccess ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
