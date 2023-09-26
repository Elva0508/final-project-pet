import React from 'react'
import ListM from '@/components/member/list-m'
import ListD from '@/components/member/list-d'
import ListUserM from '@/components/member/list-user-m'
import { FaList } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'


export default function Wishlist() {
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
                    <div className='col-12 d-flex border-bottom py-2'>
                        <div className='col-3 col-sm-3'>
                         <img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_1(12).jpg'></img>   
                        </div>
                            
                        <div className='col-5 col-sm-6'>
                            <p className='size-5'>巨型開放式貓砂盆 (多色)</p>
                            <p className='size-6 type'>貓砂盆</p>
                            <p className='size-5 price'>NT$690</p>
                        </div>        
       
                        <div className='col-4 col-sm-3 align-self-center d-sm-block d-none '>
                            <button className="btn btn-confirm size-6 me-4">加入購物車</button>
                            <RiDeleteBin5Line />
                        </div>

                       <div className='col-4 d-sm-none d-block d-flex flex-column justify-content-between'>
                          <div className='d-flex justify-content-end'><RiDeleteBin5Line /></div>
                          
                          <button className="btn btn-confirm m-2 size-6 ">加入購物車</button>
                          
                        </div>

                    </div>
                </div>
              </div>

          </div>
    </div>

          




    </>
  )
}
