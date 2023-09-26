import React from 'react'
import ListM from '@/components/member/list-m'
import ListD from '@/components/member/list-d'
import ListUserM from '@/components/member/list-user-m'
import { BiSolidShoppingBag } from 'react-icons/bi'



export default function Purchast() {
  return (
    <>
    <div className='container'>
          <div className='d-flex justify-content-end'>
            <ListM />
          </div>     
            <ListUserM />
          <div className='d-flex justify-content-between py-2'>
            <ListD />            
              <div className=' col-12 col-sm-8 purchast-bg  p-3'>
                <div>
                    <h5 className='size-5'><BiSolidShoppingBag/>購買紀錄</h5>
                    <div className='col-12 d-flex border-bottom py-2'>
                        <div className='col-4 col-sm-4'>
                         <img className="picture" src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_1(12).jpg'></img>   
                        </div>
                            
                        <div className='col-4 col-sm-6'>
                            <p className='size-5'>巨型開放式貓砂盆 (多色)</p>
                            <p className='size-6 type'>貓砂盆</p>
                            <p className='size-5 price'>NT$690</p>
                        </div>        
       
                        <div className='col-4 col-sm-2 align-self-center d-flex flex-column'>
                            <button className="btn btn-confirm m-2 size-6">再次購買</button>
                            <button className="btn btn-outline-confirm m-2 size-6">加入收藏</button>
                        </div>

                    </div>
                </div>
              </div>

          </div>
    </div>
    </>
  )
}
