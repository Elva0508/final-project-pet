import React, { useState,useEffect } from 'react'
import ListM from '@/components/member/list-m'
import ListD from '@/components/member/list-d'
import ListUserM from '@/components/member/list-user-m'
import { FaList } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import axios from "axios"


export default function Wishlist() {
  const [wishlist,setWishlist]=useState([])

  const [cart, setCart] = useState([]);

  const addCart = async (id) => {
    try {
      // 发起一个请求，从服务器获取商品信息，假设您的 API 端点是 `/api/products/${id}`
      const response = await axios.put(`http://localhost:3005/products/cart/${id}`);
      
      // // 从响应中提取商品数据
      // const product = response.data;
  
      // // 克隆当前购物车的副本
      // const updatedCart = [...cart];
  
      // // 检查商品是否已经在购物车中
      // const existingProduct = updatedCart.find(item => item.id === product.id);
  
      // if (existingProduct) {
      //   // 如果商品已经在购物车中，增加其数量
      //   existingProduct.quantity += 1;
      // } else {
      //   // 如果商品不在购物车中，添加它到购物车
      //   const newProduct = { ...product, quantity: 1 };
      //   updatedCart.push(newProduct);
      // }
  
      // 更新购物车状态
      // setCart(updatedCart);
  
    } catch (error) {
      console.error("Error:", error);
    }
  }


  const deleteWishlist = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:3005/member/wishlist/${id}`);      
      const newWishlist=wishlist.filter((v)=>v.collection_id!==id)
      setWishlist(newWishlist)   
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const getWishlist = async() => {
      await axios.get("http://localhost:3005/member/wishlist")
        .then((response) => {
          const data = response.data.result;
          console.log(data);
          setWishlist(data)     
        })
        .catch((error) => {
          console.error("Error:", error);
      });
    }
      useEffect(() => {
        getWishlist()
        }, [])

  return (
    <>
    <div className='container'>
          <div className='d-flex justify-content-end'>
            <ListM />
          </div>     
            <ListUserM />
          <div className='d-flex justify-content-between py-2'>
            <ListD />            
              <div className=' col-12 col-sm-8 purchast p-3'>
                <div>
                      <div className='d-flex justify-content-between'>
                        <h5 className='size-5'><FaList/>追蹤清單</h5>
                        <p>已追蹤{wishlist.length}樣商品</p>
                      </div>

                    
                    {wishlist.map((v,i)=>{
                      return(
                        <>

                        <div className='col-12 d-flex border-bottom py-2'>
                          <div className='col-3 col-sm-3' key={v.collection_id}>
                          <img src={v.image}></img>   
                          </div>
                              
                          <div className='col-5 col-sm-6'>
                              <p className='size-5'>{v.product_name}</p>
                              <p className='size-6 type'>{v.type}</p>
                              <p className='size-5 price'>NT${v.price}</p>
                          </div>  
       
                        <div className='col-4 col-sm-3 align-self-center d-sm-block d-none '>
                            <button className="btn btn-confirm size-6 me-4"
                            onClick={() => addCart(v.product_id)}>加入購物車</button>
                            <button className='delete'
                            onClick={() => {
                            // 這裡作刪除的動作
                            deleteWishlist(v.collection_id)
                            }}><RiDeleteBin5Line /></button>
                        </div>

                       <div className='col-4 d-sm-none d-block d-flex flex-column justify-content-between'>
                          <div className='d-flex justify-content-center'>
                            <button className='delete'><RiDeleteBin5Line /></button>
                          </div>
                          
                          <button className="btn btn-confirm m-2 size-6 ">加入購物車</button>
                          
                        </div>

                    </div>
                        </>
                      )
                    })}

                </div>
              </div>

          </div>
    </div>

          




    </>
  )
}
