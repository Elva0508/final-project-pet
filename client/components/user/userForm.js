import React from 'react'

import { DatePicker, Space } from 'antd';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
export default function userForm() {
  
  return (
    <>
    <div>
    <form className="">
        <div className="form-item d-flex">
          <label className="size-6">Email：</label>
          <p className="size-6">abc@test.com</p>
        </div>
        <div className="form-item">
          <label className="size-6">姓名：</label>
          <input className="form-input" type="text" placeholder="王小明" />
        </div>
        <div className="form-item">
          <label className="size-6">密碼：</label>
         <button className='btn-confirm'>設定新密碼</button>
        </div>

        <div className="form-item">
          <label className="size-6">性別：</label>
          <input class="form-check-input position-static" type="radio" name="blankRadio" id="blankRadio1" value="option1" aria-label="..."/>男
          <input class="form-check-input position-static" type="radio" name="blankRadio" id="blankRadio1" value="option1" aria-label="..."/>女

        </div>
        <div className="form-item">
          <label className="size-6">生日：</label>
          {/* <select className="form-select">
              <option value="1990">年</option>
            </select>
          <select className="form-select">
              <option value="1990">月</option>
            </select>
          <select className="form-select">
              <option value="1990">日</option>
            </select> */}
            <DatePicker onChange={onChange} />
        </div>
        <div className="form-item">
          <label className="size-6">行動電話：</label>
          <input className="form-input" type="text" placeholder="0912123456" />
        </div>
        <div className="form-item">
          <label className="size-6">地址：</label>
          <input className="form-input" type="text" placeholder="地址" />
        </div>
        <div className="form-item">
          <label className="size-6">毛孩數量：</label>
          <input className="form-input" type="number" placeholder="0" />
        </div>
        <div className="form-item">
          <label className="size-6">認識管道：</label>
          <button className='btn-outline-second'>FB</button>
          <button className='btn-outline-second'>IG</button>
          <button className='btn-outline-second'>Google搜尋</button>
          <button className='btn-outline-second'>好友推薦</button>
        </div>
       
     
    
      </form>
    </div>
  </>
  )
}
