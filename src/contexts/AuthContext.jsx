import { useEffect, useState } from "react";
import { createContext } from "react";
import useLocalStorage from "use-local-storage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userCurrent, setUserCurrent] = useLocalStorage('user', null)
    const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    return (
        <AuthContext.Provider value={{
            userCurrent,
            setUserCurrent,
            accessToken,
            setAccessToken,
            refreshToken,
            setRefreshToken
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;