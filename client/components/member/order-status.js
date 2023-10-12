import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link'
import Pagination from '@/components/pagination'



export default function OrderStatusOne({order ,currentScreen}) {

    const itemsPerPage = 5
    const [activePage, setActivePage] = useState(1);
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const type=order.filter((v)=>v.status_id==currentScreen)
    const currentData = type.slice(startIndex, endIndex);
    
    return (
        <>
      
        {currentData.map((v,i)=>{
                    return(
                      <div key={i} className='bg mx-md-5 border-bottom '>

                        <div className='d-flex justify-content-between ms-3 ms-md-0'>
                          <div className=''>
                            <p className='size-6 pt-3 title'><span>訂單編號：</span>{v.oid}</p>
                            <p className='size-7 '><span>訂單時間：</span>{v.created_at}</p>
                            <p className='size-7'><span>訂單狀態：</span>{v.status_name}</p>
                            <p className='size-7'><span>付款方式：</span>{v.payment}</p>
                            <p className='size-7'><span>寄送方式：</span>{v.shipment}</p>
                            <img src={v.image} className='' alt='產品圖片'></img>
                            <p className='size-6 price pb-3'><span>訂單金額：</span>NT${v.total_amount}</p>
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
