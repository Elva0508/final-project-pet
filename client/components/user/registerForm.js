import React from 'react'

export default function RegisterForm() {
  return (
    <>
     <form className="email-signup" >
            <div className="u-form-group mb-3">
              <label htmlFor="">帳號</label>
              <input 
              className="form-input " 
              type="email" 
              placeholder="請輸入電子信箱"
          
           
               />
               {/* <div  className='form-alert'>{error.password}</div> */}
            </div>
            <div className="u-form-group mb-3">
              <label htmlFor="">密碼</label>
              <input className="form-input " type="password" placeholder="請輸入密碼" 
           
              />
              <div className='form-alert'></div>
            </div>
            <div className="u-form-group mb-3">
              <label htmlFor="">確認密碼</label>
              <input className="form-input " type="password" placeholder="請再次輸入密碼" />
              {/* <div  className='form-alert'></div> */}
            </div>
            <div className="u-form-group">
              <button className="btn-brown ">註冊</button>
            </div>
          </form>
  </>
  )
}
