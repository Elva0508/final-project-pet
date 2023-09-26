import React, { useState,useEffect } from 'react'
import ListM from '@/components/member/list-m'
import ListD from '@/components/member/list-d'
import ListUserM from '@/components/member/list-user-m'
import { FaList } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import axios from "axios"


export default function Wishlist() {
  const [wishlist,setWishlist]=useState([])


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
                    <h5 className='size-5'><FaList/>追蹤清單</h5>
                    
                    {wishlist.map((v,i)=>{
                      return(
                        <>
                        <div className='col-12 d-flex border-bottom py-2'>
                          <div className='col-3 col-sm-3'key={v.collection_id}>
                          <img src={v.image}></img>   
                          </div>
                              
                          <div className='col-5 col-sm-6'>
                              <p className='size-5'>{v.product_name}</p>
                              <p className='size-6 type'>{v.type}</p>
                              <p className='size-5 price'>NT${v.price}</p>
                          </div>  
       
                        <div className='col-4 col-sm-3 align-self-center d-sm-block d-none '>
                            <button className="btn btn-confirm size-6 me-4">加入購物車</button>
                            <button className='delete'><RiDeleteBin5Line /></button>
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
