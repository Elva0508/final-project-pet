import React, {useContext} from 'react'
import {useAuth} from '@/hooks/user-auth'

export default function LoginForm({user, error,handleFieldChange,handleSubmit}) {
  //const {login}=useAuth()

  return (
    <>
   <form className="email-signup" onSubmit={handleSubmit}>
            <div className="u-form-group mb-3">
              <label htmlFor="">帳號</label>
              <input 
              className="form-input " 
              type="email" 
              placeholder="請輸入電子信箱"
              name="username"
              value={user.username}
              onChange={handleFieldChange}
               />
               <div className="form-alert">{error.username}</div>
            </div>
            <div className="u-form-group mb-3">
              <label htmlFor="">密碼</label>
              <input className="form-input " 
              type="password" 
              placeholder="請輸入密碼"
              value={user.password}
              onChange={handleFieldChange}
               />
               {/* 錯誤訊息 */}
              <div className="form-alert">{error.password}</div>
            </div>
          
            <div className="u-form-group">
              <button className="btn-brown" >登入</button>
            </div>
          </form>
    </>
  )
}
