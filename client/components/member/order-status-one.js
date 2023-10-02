import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

export default function OrderStatusOne() {

    const [order, setOrder] = useState([])

    const getOrder = async() => {
        await axios.get("http://localhost:3005/api/member-order")
          .then((response) => {
            const data = response.data.result;
            console.log(data);
            setOrder(data)
          })
          .catch((error) => {
            console.error("Error:", error);
        });
      }
  
    useEffect(() => {
        getOrder()
      }, [])
    return (
        <>


        {order.map((v,i)=>{
                    return(
                      <div key={i}>
                        <p className='date my-3 size-7'>{v.created_at} 訂單編號 :{v.oid}</p>
                        <div className='d-flex justify-content-between border-bottom'>
                          <div>
                            <p className='size-7'>狀態 : {v.status_name}</p>
                            <p className='size-7'>付款方式 : {v.payment}</p>
                            <p className='size-7'>寄送方式 : {v.shipment}</p>
                            <img src={v.image} className='d-sm-none d-block' alt='產品圖片'></img>
                            <p className='size-6 price'>訂單金額 : NT${v.total_amount}</p>
                          </div>
                          <div className='d-flex align-self-end'>
                            <img src={v.image} className='d-sm-block d-none' alt='產品圖片'></img>
                            <div className='d-flex align-self-center'>
                              <button className="btn btn-outline-confirm m-2 size-6">查看明細</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    )
                  })}

        </>
    )
}
