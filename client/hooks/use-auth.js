import React,{createContext, useState,useContext,} from 'react'
import {useRouter} from 'next/router'

const AuthContext = createContext();

export const AuthProvider =({children})=>{
    //這裡要寫身份驗證狀態
    const [auth, setAuth] = useState(undefined)

    const router=useRouter()
    //登入頁面路由
    const loginRoute = '/login'
    //受保護頁面的路由。需要用戶身份驗證的頁面，如果\用戶未登入，訪問這些頁面時應該導向登入頁面。
    const protectedRoutes =['/user-test/login-status', '/xxxx/xxxx']

    //檢查會員認證

    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuth = ()=> useContext(AuthContext)
//使用createContext建立AuthContext