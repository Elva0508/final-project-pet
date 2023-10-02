import React, { useContext, } from 'react';
import { AuthContext } from '@/context/authContext'
import jwt from "jwt-decode"
import axios from "axios";

const useAuth = ()=>{
  //取得user-auth的狀態
const {user, setUser, token,setToken}=useContext(AuthContext)
const appKey = "secretkey";
const API_LOGIN = 'http://localhost:3005/api/auth-jwt/login';
const API_LOGOUT = 'http://localhost:3005/api/auth-jwt/logout';
 
  //登入
  const login = async(account,password)=>{
   try{
    const result = await axios.post(API_LOGIN, {
      account,password,
    });
    // 不再需要將令牌存儲在本地存儲中
     localStorage.setItem(appKey, result.data.token);

    // 將使用者資訊存儲在 AuthContext 中
    const u = jwt(result.data.token);
    setUser(u);

   }catch(error){
    console.log(error);
   }
  }
  //登出
  const logout = ()=>{
    setUser(undefined)
  }
  return {login, logout}
}
export default useAuth;

// import React, { createContext, useContext, useState, } from 'react';
// import axios from "axios";

// const AuthContext = createContext();

// const API_LOGIN_URL = 'http://localhost:3005/api/auth-jwt/login';
// const API_LOGOUT_URL = 'http://localhost:3005/api/auth-jwt/logout';

// export const AuthProvider =({children})=>{
//     const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const loginUser = async (username, password) => {
//     try {
//       const result = await axios.post(API_LOGIN_URL, {
//         username,
//         password,
//       });
//       // 登录成功，设置用户数据
//       const userData = result.data; // 假设服务器返回用户数据
//       setUser(userData);
//     } catch (error) {
//       // 处理登录失败的情况
//       console.error('登入失敗', error);
//     }
//   };

//   const logoutUser = async () => {
//     try {
//       await axios.post(API_LOGOUT_URL);
//       // 注销成功，清除用户数据
//       setUser(null);
//     } catch (error) {
//       // 处理注销失败的情况
//       console.error('登出失敗', error);
//     }
//   };


//   // 登錄函數
//   const login = async (username, password) => {
//     setIsLoading(true); // 开始登录，可以显示加载状态
//     await loginUser(username, password);
//     setIsLoading(false); // 登录完成，隐藏加载状态
//   };

//     // 登出函數
// const logout = async () => {
//   setIsLoading(true); // 开始注销，可以显示加载状态
//   await logoutUser();
//   setIsLoading(false); // 注销完成，隐藏加载状态
// };

//     return(
//         <AuthContext.Provider value={{ user, isLoading, login, logout}}>
//             {children}
//         </AuthContext.Provider>
//     )

// }
// export const useAuth = ()=>{
//     const context = useContext(AuthContext);
//     if (!context) {
//       throw new Error('useAuth 必須在 AuthProvider 中使用');
//     }
//     return context;
// }

