import { createContext, useState, useContext,useEffect } from 'react'
import axios from "axios";
// 習慣上都以null作為初始化值
const cartContext = createContext(null)

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    //抓購物車內所有商品 ，並增加屬性
    const getCart =  () => {
        axios.get("http://localhost:3005/api/product/cart")
            .then((response) => {
            const data = response.data.result;
            const newData=data.map((v)=>{
                return  { ...v, buy: true }
            })
                setCart(newData)     
            })
            .catch((error) => {
            console.error("Error:", error);
        });
    }
    useEffect(() => {
        getCart()
      }, []) 


  return (
    <cartContext.Provider value={{cart, setCart }}>
      {children}
    </cartContext.Provider>
  )
}

export const useCart = () => useContext(cartContext)