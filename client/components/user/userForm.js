import React from 'react'
import useRWD from '@/hooks/useRWD'

import Image from "next/image";
import myProfile from "@/assets/myProfile.svg";

import { DatePicker, Space } from 'antd';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};



export default function userForm() {
  const device = useRWD();
  const userRfs = device == "mobile" ? "m-size-6" : "size-6"

  return (
    <>
     <div className="user-profile ">
        <div className="title">
          <p className=" size-4">
          <Image src={myProfile} alt="myProfile-logo" />
            我的資料
          </p>
        </div>
        <form className="user-form">
        <div className="user-form-item d-flex">
          <label className={userRfs}
          >Email：</label>
          <div>
          <biv className="size-6">abc@test.com</biv>
          </div>
    
        </div>
        <div className="user-form-item">
          <label className={userRfs}>姓名：</label>
          <div>
          <input className="form-input" type="text" placeholder="王小明" />
          </div>
        </div>
        <div className="user-form-item">
          <label className={userRfs}>密碼：</label>
          <div>
          <button className='btn-confirm'>設定新密碼</button>
          </div>
  
        </div>

        <div className="user-form-item">
          <label className={userRfs}>性別：</label>
          <div>
          <input class="form-check-input position-static" type="radio" name="blankRadio" id="blankRadio1" className={userRfs} value="option1" aria-label="..."/>男
          <input class="form-check-input position-static" type="radio" name="blankRadio" id="blankRadio1" className={userRfs} value="option1" aria-label="..."/>女
          </div>
         
        </div>
        <div className="user-form-item">
          <label className={userRfs}>生日：</label>
          <div>
            <DatePicker onChange={onChange} />
          </div>
        </div>
        <div className="user-form-item">
          <label className="size-6">行動電話：</label>
          <div>
          <input className="form-input" type="text" placeholder="0912123456" />
          </div>
        </div>
        <div className="user-form-item">
          <label className="size-6">地址：</label>
          <div>
          <input className="form-input" type="text" placeholder="地址" />
          </div>
        </div>
        <div className="user-form-item">
          <label className="size-6">毛孩數量：</label>
          <div>
          <input className="form-input" type="number" placeholder="0" />
          </div>

        </div>
        <div className="user-form-item">
          <label className="size-6">認識管道：</label>
          <div>
          <button className='btn-outline-second'>FB</button>
          <button className='btn-outline-second'>IG</button>
          <button className='btn-outline-second'>Google搜尋</button>
          <button className='btn-outline-second'>好友推薦</button>
          </div>
        </div>
       <div className="user-form-item d-flex justify-content-center">
       <button className='btn-outline-confirm'>取消</button>
       <button className='btn-confirm'>儲存</button>
       </div>
     
      </form>
        </div>
    <div className='container my-3'>
  
    </div>
  </>
  )
}
