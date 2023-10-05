import React, {createContext, useState} from "react";

// 建立AuthContext
export const AuthContext = createContext({user:undefined});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(undefined);
    

    return (
        //把狀態包裝進AuthContext.Provider
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}