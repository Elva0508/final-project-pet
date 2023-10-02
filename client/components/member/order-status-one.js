import React from 'react'

export default function OrderStatusOne() {
    return (
        <>
            <p className='date my-3 size-7'>2023-08-26 訂單編號 : 134868</p>
            <div className='d-flex justify-content-between border-bottom pb-3'>
                <div className='d-flex flex-column justify-content-around '>
                    <p className='size-7'>狀態 : 尚未付款</p>
                    <p className='size-7'>付款方式 : 貨到付款</p>
                    <p className='size-7'>寄送方式 : 宅配</p>
                    <img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_A1MKD200101(1).jpg' className='d-sm-none d-block'></img>
                    <p className='size-6 price'>訂單金額 : NT$380</p>
                </div>
                <div className='d-flex align-self-end'>
                    <img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_A1MKD200101(1).jpg' className='d-sm-block d-none'></img>

                    <div className='d-flex align-self-center'>
                        <button className="btn btn-outline-confirm m-2 size-6">查看明細</button>
                    </div>
                </div>
            </div>

            <p className='date my-3 size-7'>2023-08-26 訂單編號 : 134868</p>
            <div className='d-flex justify-content-between border-bottom pb-3'>
                <div className='d-flex flex-column justify-content-around '>
                    <p className='size-7'>狀態 : 尚未付款</p>
                    <p className='size-7'>付款方式 : 貨到付款</p>
                    <p className='size-7'>寄送方式 : 宅配</p>
                    <img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_A1MKD200101(1).jpg' className='d-sm-none d-block'></img>
                    <p className='size-6 price'>訂單金額 : NT$380</p>
                </div>
                <div className='d-flex align-self-end'>
                    <img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_A1MKD200101(1).jpg' className='d-sm-block d-none'></img>

                    <div className='d-flex align-self-center'>
                        <button className="btn btn-outline-confirm m-2 size-6">查看明細</button>
                    </div>
                </div>
            </div>
        </>
    )
}
