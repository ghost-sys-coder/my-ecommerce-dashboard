import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from 'axios';


const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchUserProfile = useCallback(async() => {
        setIsUserLoading(true);
            try {
                const { data } = await axios.get('/api/auth/profile');
                // console.log({ userInfo: data })
                setUser(data);
                setIsAuthenticated(true);
            } catch (error) {
                console.log(error);
            } finally {
                setIsUserLoading(false);
            }
    }, [])

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    return (
        <AuthContext.Provider value={{
            user, 
            setUser,
            isUserLoading,
            isAuthenticated,
            setIsAuthenticated,
            setIsUserLoading,
            fetchUserProfile
        }}>
            {children}
       </AuthContext.Provider> 
    )
}


export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
}