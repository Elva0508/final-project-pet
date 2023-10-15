import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link'
import Pagination from '@/components/pagination'



export default function OrderStatusOne({order ,currentScreen,activePage,setActivePage}) {

    const itemsPerPage = 5
;
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const type=order.filter((v)=>v.status_id==currentScreen)
    const currentData = type.slice(startIndex, endIndex);
    
    return (
        <>
      
        {currentData.map((v,i)=>{
                    return(
                      <div key={i} className='bg px-md-5 border-bottom'>
                        <div className='d-flex justify-content-between'>
                        <div className='d-flex align-items-center white'>
                            <img src={v.image} className='' alt='產品圖片'></img>
                            <div className='ms-md-4 ms-1'>
                              <p className='size-6 pt-3 title'><span>訂單編號：</span>{v.oid}</p>
                              <p className='size-7 '><span>訂單時間：</span>{v.created_at}</p>
                              <p className='size-7'><span>訂單狀態：</span>{v.status_name}</p>
                              <p className='size-7'><span>付款方式：</span>{v.payment}</p>
                              <p className='size-7'><span>寄送方式：</span>{v.shipment}</p>
                              <p className='size-6 price pb-3'><span>訂單金額：</span>NT${v.total_amount}</p>
                            </div>
                          </div>
                          <div className='d-flex align-items-center me-3 me-md-0'>
                            <Link className="btn btn-outline-confirm  size-6" href={`/member/order/${v.oid}`}>查看明細</Link>
                          </div>
                           
                 
                        </div>
                      </div>
                      
                    )
                  })}

            <Pagination  itemsPerPage={itemsPerPage} total={type} activePage={activePage} setActivePage={setActivePage}/>
        </>
    )
}
