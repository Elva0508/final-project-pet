import React, { useState,useEffect } from "react";
import useRWD from "@/hooks/useRWD";


import Image from "next/image";
import myProfile from "@/assets/myProfile.svg";

import data from "@/data/taiwan.json";
import { DatePicker, Space } from "antd";

export default function userForm() {
  //RWD
  const device = useRWD();
  const userRfs = device == "mobile" ? "m-size-6" : "size-6";

  
  useEffect(()=>{
    fetch('http://localhost:3005/api/auth-jwt/profile')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setMemberData(data)
    })
  },[])

  //表單狀態
  const [memberData, setMemberData] = useState({
    name: "",
    password: "",
    birthday: "",
    phone: "",
    address: "",
    petNum: "",
    city: "",
    town: "",
  });

  const handleInputChange = (e)=>{
    const {name,value} = e.target
    setMemberData({
      ...memberData,
      [name]:value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    fetch('http://localhost:3005/api/auth-jwt/profileChange',{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(memberData)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
  }


  //地址
  const [city, setCity] = useState(-1);
  const [area, setArea] = useState([]);
  const handleCityChange = (event) => {
    const cityValue = event.target.value;
    setCity(cityValue);
    const cityNumber = parseInt(cityValue);
    for (let i = 0; i < data.length + 1; i++) {
      if (cityNumber == i) {
        const newArea = data[i - 1].districts.map((district) => district.name);
        return setArea(newArea);
      }
    }
    if (cityNumber == -1) {
      setArea([]);
    }
  };

  //生日  
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

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
            <label className={userRfs}>Email：</label>
            <div>
              <biv className={userRfs}>abc@test.com</biv>
            </div>
          </div>
          <div className="user-form-item">
            <label className={userRfs}>姓名：</label>
            <div>
              <input 
              className="form-input" type="text" 
              value={memberData.name}
              
              />
            </div>
          </div>
          <div className="user-form-item">
            <label className={userRfs}>密碼：</label>
            <div>
              <button className="btn-confirm">設定新密碼</button>
            </div>
          </div>

          <div className="user-form-item">
            <label className={userRfs}>性別：</label>
            <div>
              <input
                //class="form-check-input position-static"
                type="radio"
                name="blankRadio"
                id="blankRadio1"
                className={userRfs}
                value="option1"
                checked
                aria-label="..."
              />
              男
              <input
                // class="form-check-input position-static"
                type="radio"
                name="blankRadio"
                id="blankRadio1"
                className={userRfs}
                value="option1"
                aria-label="..."
              />
              女
            </div>
          </div>
          <div className="user-form-item">
            <label className={userRfs}>生日：</label>
            <div>
             {/* <DatePicker onChange={onChange} />  */}
             <input type="date" value='2020-12-12'/> 
            </div>
          </div>
          <div className="user-form-item">
            <label className={userRfs}>行動電話：</label>
            <div>
              <input
                className="form-input"
                type="text"
                value="0912456786"
              />
            </div>
          </div>
          <div className="user-form-item">
            {/* <label className="size-6">地址：</label>
          <div>
          <input className="form-input" type="text" placeholder="地址" />
          </div> */}

            <label className={userRfs}>地址：</label>
            <div className="d-flex">
              <select
                className="form-select"
                value="taipai"
                onChange={handleCityChange}
              >
                <option selected value={-1}>
               citttty
                </option>
                {data.map((v) => {
                  return (
                    <option key={v.name} value={v.number}>
                      {v.name}
                    </option>
                  );
                })}
              </select>

              <select className="form-select">
                <option selected>
               townn
                </option>
                {area.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="user-form-item">
           <label >
        
           </label>
          <div>
          <input type="text" className="form-control" value="dcsklcl"/>
          
        
          </div>
           
          </div>

          <div className="user-form-item">
            <label className={userRfs}>毛孩數量：</label>
            <div>
              <input className="form-input" type="number" value="1" />
            </div>
          </div>
      
          <div className="user-form-item d-flex justify-content-center">
            <button className="btn-outline-confirm">取消</button>
            <button className="btn-confirm">儲存</button>
          </div>
        </form>
      </div>
    
    </>
  );
}

