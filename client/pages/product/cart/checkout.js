import React  from 'react'
import { useState } from 'react'
import {RiDeleteBin5Fill} from 'react-icons/Ri';
import useRWD from '@/hooks/useRWD';
import data from '@/data/taiwan.json'
import Footer from '@/components/footer';



export default function Checkout() {
    // const device = useRWD()
    const[city,setCity]=useState(0)
    const[area,setArea]=useState([])
    const handleCityChange = (event) => {
        const cityValue = event.target.value;
        setCity(cityValue);
        const cityNumber = parseInt(cityValue);
        for(let i=1;i<data.length+1;i++){
            if (cityNumber ==i) {
                const newArea=data[i-1].districts.map(district => district.name)
            return  setArea(newArea);
            }
        }
        if (cityNumber ==0) {
            setArea([])
        }
    };
    
  return (
    <>
        <div className="checkout">
            <div className='container'>
            {/* 步驟 */}
                <div className='d-flex justify-content-center step text-center mb-sm-5 mb-4'>
                    <div className='col-lg-2 col-sm-4 col-5 size-6 step1'>
                        購物車
                    </div>
                    <div className='col-lg-2 col-sm-4 col-5 size-6  step2'>
                        運送&付款
                    </div>
                </div>
            {/* 注意事項 */}
                <div className='notice d-sm-block d-none  mb-4 size-7'>
                    <p>【出貨公告】港澳地區貓砂將以多箱出貨方式。</p>
                    <p>【出貨公告】超商取貨請填寫與證件相符之完整姓名，以確保取件權益。</p>
                    <p>【出貨公告】貨運配送以一樓運送為主，若有需要增加配送樓層或條件，則須另按照樓層及運送材積酌收費用。</p>
                    <p>【出貨公告】港澳地區恕不提供智能櫃/順豐站點配送，造成不便請見諒。</p>
                </div>
            </div> 
            {/* 收件人資訊 */}
            <div className='title size-6 mb-3'>
                <div className='container py-1'>
                    收件人資訊
                </div>
            </div>
            <div className='container information size-7  mb-3'>
                <div className='row row-cols-1 justify-content-center justify-content-sm-start'>
                    <div className='d-flex mb-3 col-sm-12 col-11 flex-wrap '>
                        <div className='col-lg-3 col-5 me-3'>
                            <label  className="form-label ">姓名</label>
                            <input type="text" className="form-control " ></input>
                        </div>
                        <div className='col-lg-3 col-6 '>
                            <label  className="form-label ">連絡電話</label>
                            <input type="text" className="form-control " ></input>
                        </div>
                    </div>
                    <div className=" size-7 col-sm-12 col-11 mb-2">
                        <input className="form-check-input me-2" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className=" plan" for="flexRadioDefault1">
                            宅配
                        </label>
                    </div>
                    <div className='d-flex mb-3 size-7 col-sm-12 col-11'>
                        <div className='me-3 col-lg-2 col-5'>
                            <label>縣/市</label>
                            <select className="form-select" value={city} onChange={handleCityChange}>
                                <option selected value={0}>請選擇</option>
                                {data.map((v)=>{
                                    return(
                                        <option key={v.name} value={v.number} >{v.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='col-lg-2 col-5'>
                            <label>鄉鎮市區</label>
                            <select className="form-select" >
                                <option selected >請選擇</option>
                                {area.map((v, i) => (
                                    <option key={i} value={v}>
                                        {v}
                                    </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-6 col-11 mb-2'>
                        <label  className="form-label ">街道地址</label>
                        <input type="text" className="form-control " ></input>
                    </div>
                    <div className="size-7 col-sm-12 col-11 mb-2">
                        <input className="form-check-input me-2" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                        <label className=" plan" for="flexRadioDefault2">
                            門市取貨
                        </label>
                    </div>
                </div>
            </div>
            {/* 付款方式 */}
            <div className='title size-6  mb-3'>
                <div className='container py-1'>
                    付款方式
                </div>
            </div>
            <div className='container  mb-3 col-sm-12 col-11'>
                <div className="accordion size-7 form-check">
                    <div>
                        <input type="radio" name="accordion" id="section1" className='form-check-input mb-3 '/>
                        <label for="section1">信用卡</label>
                        <div className="content col-lg-5 col-12 m-0">
                            <input type="text" placeholder="信用卡號碼" className="form-control mb-2" />
                            <div className='d-flex'> 
                                <input type="text" placeholder="到期日" className="form-control " />
                                <input type="text" placeholder="安全驗證碼" className="form-control " />
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="radio" name="accordion" id="section2" className='form-check-input mb-3'/>
                        <label for="section2">Line Pay</label>
                    </div>
                    <div>
                        <input type="radio" name="accordion" id="section3" className='form-check-input'/>
                        <label for="section3">貨到付款</label>
                    </div>       
                </div>
            </div>  


            {/* 商品明細 */}
            <div className='title size-6  mb-3'>
                <div className='container py-1'>
                    商品明細
                </div>
            </div>
            <div className='container'>
                {/* 購物車內商品 */}               
                <div className='d-flex justify-content-center mb-4 '>
                    {/* 桌機板 */}
                    <table  className='col-12  d-none d-sm-block cart-d-content '>
                        <thead >
                            <tr className='size-7' >
                                <th>商品(5)</th>
                                <th>商品名稱</th>
                                <th  className='text-center'>單價</th>
                                <th  className='text-center'>數量</th>
                                <th  className='text-center'>小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='size-7'>
                                <td><img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_M3PD150101-e-0.jpg' /></td>
                                <td>
                                    <p>單層開放式防濺貓砂盆</p>
                                    <p className='size-7 type'>藍色</p>
                                </td>
                                <td className='text-center'>$500</td>
                                <td className='text-center'>3</td>
                                <td className='text-center'>$1500</td>                               
                            </tr>
                            <tr className='size-7'>
                                <td><img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_M3PD150101-e-0.jpg' /></td>
                                <td>
                                    <p>單層開放式防濺貓砂盆</p>
                                    <p className='size-7 type'>藍色</p>
                                </td>
                                <td className='text-center'>$500</td>
                                <td className='text-center'>3</td>
                                <td className='text-center'>$1500</td>                               
                            </tr>
                        </tbody>
                    </table>
                    {/* 手機板 */}
                    <table className='d-sm-none d-block cart-m-content col-11'>
                        <tbody>
                            <tr className='m-size-7'>
                                <td><img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_M3PD150101-e-0.jpg'></img></td>
                                <td className=''>
                                    <p className='m-0'>單層開放式防濺貓砂盆</p>
                                    <p className='m-size-7 type m-0'>藍色</p>
                                    <p className='m-0'>NT$500</p>                                 
                                </td>
                                <td className='text-center'>x3</td>
                                <td className='text-center'>NT$1500</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            {/* 優惠碼+明細 */}
            <div className='container'>
                 {/* 優惠碼+明細 */}
                 <div className='d-flex justify-content-sm-end justify-content-center  mb-4 col-lg-10 col-sm-11'>
           
                    <div className='col-lg-4 col-sm-6 col-11 detail d-flex justify-content-center p-sm-4  '>
                        <table className='col-sm-11 col-12'>
                            <tbody className=''>
                                <tr>
                                    <td className=''>商品總金額</td>
                                    <td className='text-end'>NT$1000</td>
                                </tr>
                                <tr>
                                    <td>優惠折扣</td>
                                    <td className='text-end'>NT$-30</td>
                                </tr>
                                <tr className='cal'> 
                                    <td className='pb-2'>運費</td>
                                    <td className='text-end'>NT$100</td>
                                </tr>
                                <tr > 
                                    <th className='pt-2'>總計</th>
                                    <th className='text-end'>NT$1070</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* 進度條 */}
            <div className='progress-part size-7'>
                <div className='container py-3 col-11'>
                    <div className='d-flex justify-content-between'>
                        <p>運費</p>
                        <p>再消費NT$300免運</p>
                    </div>
                    <div className="progress" role="progressbar" aria-label="" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar w-75" ></div>
                    </div>
                </div>
            </div>
            {/* 結帳 */}
            <div className='next py-2 size-7'>
                <div className='container d-flex justify-content-between align-items-center'>
                    <button className='btn btn-outline-brown me-auto'>上一步</button>
                    <p className='m-0 pe-2'>總計NT$1070</p>
                    <button className='btn btn-price'>結帳</button>
                </div> 
            </div>
            <Footer />                             
                       
        </div>

    </>
  )
}
