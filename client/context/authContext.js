import React, {createContext, useState} from "react";
import jwt from "jwt-decode"
import axios from "axios";

// 建立AuthContext
export const AuthContext = createContext({user:undefined});

export const AuthProvider = ({children}) => {
    const appKey = "secretkey";
    const API_STATUS_URL = 'http://localhost:3005/api/auth-jwt/checkLogin';
    const [token, setToken] = useState(localStorage.getItem(appKey));
    const [user, setUser] = useState(undefined); //儲存解碼後的用戶訊息

    useEffect(() => {
        let checkLoginStatus = async()=>{
            if (token) {

                // const decodedToken = jwt(token);
                 //setUser(decodedToken);
                try{
                    const result = await axios.post(
                        API_STATUS_URL,
                        {},
                        {
                            headers: {
                                authorization: token
                            }
                        }
                    )
                    if(result.status === 200){
                        setToken(result.data.token);
                        setUser(jwt(token));
                    }else{
                        alert(result.data.message);
                        localStorage.removeItem(appKey);
                        setToken(null);
                        setUser(undefined);
                    }
                }catch(error){
                    console.log(error);
                localStorage.removeItem(appKey);
                setToken(null);
                setUser(undefined);
                }
               }
        }
       checkLoginStatus()
        // (async ()=>{})();

      }, [token]);


    return (
        //把狀態包裝進AuthContext.Provider
        <AuthContext.Provider value={{user, setUser, token,setToken}}>
            {children}
        </AuthContext.Provider>
    )
}