import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import Link from 'next/link'

export default function OrderStatusThree({order}) {
    const itemsPerPage = 5
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const type=order.filter((v)=>v.status_id==3)
    const currentData = type.slice(startIndex, endIndex);



    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };


 
    return (
        <>


        {currentData.map((v,i)=>{
                    return(
                      <div key={i}>
                        <p className='date my-3 size-7'>{v.created_at} 訂單編號 :{v.oid}</p>
                        <div className='d-flex justify-content-between border-bottom pb-3'>
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
                            <Link className="btn btn-outline-confirm m-2 size-6" href={`/member/order/${v.oid}`}>查看明細</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    )
                  })}
        <div className="pagination size-7 d-flex justify-content-center">
            <button className='btn prev border-0'><GrFormPrevious /></button>
            {Array.from({ length: Math.ceil(type.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className='btn me-1 '>
            {index + 1}
          </button>
        ))}
            <button className='btn next border-0'><GrFormNext /></button>
        </div>  

        </>
    )
}
