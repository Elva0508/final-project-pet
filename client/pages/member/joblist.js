import React, { useState } from 'react'
import ListM from '@/components/member/list-m'
import ListD from '@/components/member/list-d'
import ListUserM from '@/components/member/list-user-m'
import { LiaListAltSolid } from 'react-icons/lia'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { CiHeart } from 'react-icons/Ci'
import { BiSolidHeart } from 'react-icons/bi'




export default function Joblist() {
    const[isFavorite ,setIsFavorite]=useState(false)

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); // 切換收藏狀態
      }
  return (
    <>
    <div className='container'>
          <div className='d-flex justify-content-end'>
            <ListM />
          </div>     
            <ListUserM />
          <div className='d-flex justify-content-between py-2'>
            <ListD />            
              <div className=' col-12 col-sm-8 joblist p-3'>
                <div>
                  <h5 className='size-5'><LiaListAltSolid/>任務清單</h5>
                  <div className='d-flex justify-content-between'>
                  <nav className='my-3'>
                    <a className='mx-2 size-7'>全部</a>
                    <a className='mx-2 size-7'>未應徵</a>
                    <a className='mx-2 size-7'>已應徵</a>
                    <a className='mx-2 size-7'>已關閉</a>
                  </nav>
                     <p className='my-3 size-7'>共24筆</p>
                  </div>


                  <div class="form-check border-bottom border-top">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label " for="flexCheckDefault">
                    全選<RiDeleteBin5Line />
                    </label>
                  </div>

                  <div className='d-flex border-bottom my-2'>
                    <div className='col-7 col-sm-3'>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label " for="flexCheckDefault">
                            <p>2023/08/23</p>
                            <p className='size-6 title d-sm-none d-block'>餵養貓咪</p>
                            <p className='size-7 content d-sm-none d-block'>陳小姐</p>
                            <p className='size-7 content d-sm-none d-block'>單次1,500元 | 台北市內湖區</p>
                            <p className='size-7 content d-sm-none d-block'>任務內容｜ 一天兩次早晚幫忙餵食，貓有一點兇</p>
                            <p className='size-7 follow d-sm-none d-block'>6-10人追蹤</p>
                            </label>
                        </div>
                    </div>
                    <div className='d-none d-sm-block col-sm-5'>
                        <p className='size-6 title'>餵養貓咪</p>
                        <p className='size-7 content'>陳小姐</p>
                        <p className='size-7 content'>單次1,500元 | 台北市內湖區</p>
                        <p className='size-7 content'>任務內容｜ 一天兩次早晚幫忙餵食，貓有一點兇</p>
                        <p className='size-7 follow'>6-10人追蹤</p>
                    </div>
                    
                    <div className='col-1 mt-4 d-flex justify-content-end' onClick={toggleFavorite}>
                       {isFavorite ? (<BiSolidHeart />):(<CiHeart/>)}
                    </div>

                    <div className='col-4 col-sm-3 d-flex flex-column justify-content-between'>
                        
                        <div className='d-flex flex-column align-items-center'>
                            <button className="btn btn-confirm m-2 size-6 ">應徵</button>
                        </div>

                        <div className='d-flex flex-column'>                            
                            <p className='size-7 text-center apply'>2023-08-22</p>
                            <p className='size-7 text-center apply'>已應徵</p>
                        </div>


                    </div>
                  </div>




                </div>
              </div>

          </div>
    </div>

          




    </>
  )
}
