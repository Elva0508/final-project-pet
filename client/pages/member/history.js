import React from 'react'
import ListM from '@/components/member/list-m'
import ListD from '@/components/member/list-d'
import ListUserM from '@/components/member/list-user-m'
import { HiClipboardList } from 'react-icons/hi'


export default function History() {
  return (
    <>
    <div className='container'>
          <div className='d-flex justify-content-end'>
            <ListM />
          </div>     
            <ListUserM />
          <div className='d-flex justify-content-between py-2'>
            <ListD />            
              <div className=' col-12 col-sm-8 history p-3'>
                <div>
                  <h5 className='size-5'><HiClipboardList/>刊登紀錄</h5>
                  <nav className='my-3'>
                    <a className='mx-3 size-7'>全部</a>
                    <a className='mx-3 size-7'>刊登中</a>
                    <a className='mx-3 size-7'>已下架</a>
                  </nav>

                  <div className='d-flex border-bottom my-2'>
                    <div className='col-4 col-sm-2'>
                        <p>2023/08/23</p>
                    </div>
                    <div className='col-5 col-sm-7'>
                        <p className='size-6 title'>餵養貓咪</p>
                        <p className='size-7 content'>單次1,500元 | 台北市內湖區</p>
                        <p className='size-7 content'>任務內容｜ 一天兩次早晚幫忙餵食，貓有一點兇</p>
                        <p className='size-7 follow'>6-10人追蹤</p>
                    </div>

                    <div className='col-3 col-sm-3'>
                        <button className="btn btn-confirm m-2 size-6">刊登中</button>
                    </div>
                  </div>

                  <div className='d-flex border-bottom my-2'>
                    <div className='col-4 col-sm-2'>
                        <p>2023/08/23</p>
                    </div>
                    <div className='col-5 col-sm-7'>
                        <p className='size-6 title'>餵養貓咪</p>
                        <p className='size-7 content'>單次1,500元 | 台北市內湖區</p>
                        <p className='size-7 content'>任務內容｜ 一天兩次早晚幫忙餵食，貓有一點兇</p>
                        <p className='size-7 follow'>6-10人追蹤</p>
                    </div>

                    <div className='col-3 col-sm-3'>
                        <button className="btn btn-outline-confirm m-2 size-6">已下架</button>
                    </div>
                  </div>



                </div>
              </div>

          </div>
    </div>
    </>
  )
}
