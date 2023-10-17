import React, {useContext, useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import useAuth from '@/hooks/user-auth'

export default function LoginForm({}) {
  const {login}=useAuth()




  return (
    <>
   <form className="email-signup" onSubmit={handleSubmit}>
            <div className="u-form-group mb-3">
              <label htmlFor="">帳號</label>
              <input 
              className="form-input " 
              type="email" 
              placeholder="請輸入電子信箱"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              
               />
               {/* <div className="form-alert">{error.email}</div> */}
            </div>
            <div className="u-form-group mb-3">
              <label htmlFor="">密碼</label>
              <input className="form-input " 
              type="password" 
              placeholder="請輸入密碼"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
           
               />
               {/* 錯誤訊息 */}
              {/* <div className="form-alert">{error.password}</div> */}
            </div>
          
            <div className="u-form-group">
              <button className="btn-brown" onClick={login}>登入</button>
            </div>
          </form>
    </>
  )
}