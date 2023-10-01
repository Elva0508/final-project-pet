import React, { useState } from "react";
import Link from "next/link";
import LoginForm from "@/components/user/loginForm";
import RegisterForm from "@/components/user/registerForm";
// import { useAuth } from "@/hooks/use-auth";

import { AiFillGoogleCircle } from "react-icons/ai";
import { BsLine } from "react-icons/bs";

export default function Login() {
   //原始錯誤訊息物件，每次提交清空
   const originErrors = {
    username:'',
    password:'',
  }

  //會員&密碼狀態
  const [user, setUser] = useState({
    username:'',
    password:'',
  })
  //錯誤狀態
  const [error, setError] = useState(originErrors)
 

  const handleFieldChange = (e)=>{
    const newUser = {...user, [e.target.name]: e.target.value}
    setUser(newUser)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    let hasErrors = false;
    const newErrors = {...originErrors}
    if(!user.username){
      //沒有username狀況下
      newErrors.username = "請填寫帳號"
      hasErrors=true
    }
    if(!user.password){
      //沒有password狀況下
      newErrors.password = "請填寫密碼"
      hasErrors=true
    }
    if(hasErrors){
      setError(newErrors)
      return
    }

  }

  //登入註冊狀態切換
  const [isLogin, setIsLogin]=useState(true)

  return (
    <>
      <div className="container my-5 ">
        <div className="login-box d-flex align-items-center flex-column justify-content-center mx-auto ">
          <div className="login-header d-flex ">
          <div className={`size-5 mx-2 my-3 ${isLogin ? "active":"" }`}>
          <Link 
          href="/login" 
          className="login-lg"
          onClick={()=>setIsLogin(true)}
          >登入</Link>
          </div>
          <div className={`size-5 mx-2 my-3 ${!isLogin ? "active":"" }`}>
          <Link href="/login" className="login-lg " onClick={()=>setIsLogin(false)}>註冊</Link>
          </div>
          </div>

          {isLogin ?
         ( <LoginForm
            user={user}
            error={error}
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSubmit}
          />) :(<RegisterForm 
            user={user}
            error={error}
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSubmit}
          />) 
          }


          {/* <form className="email-signup" onSubmit={handleSubmit}>
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
           
              <div className="form-alert">{error.password}</div>
            </div>
          
            <div className="u-form-group">
              <button className="btn-brown ">登入</button>
            </div>
          </form> */}
          <div className="u-form-group">
            <a href="#" className="forgot-password">
              忘記密碼
            </a>
          </div>

     <hr class="hr-divider"/>
          <div className="u-form-group"> 
            <div>使用其他方式登入</div>
            <div className="social-login my-2">
            <a href="#" className="line-icon mx-1">
                <BsLine />
              </a>
              <a href="#" className="google-icon mx-1">
                <AiFillGoogleCircle />
              </a>
            
            </div>
          </div>
        </div>
      </div>
      {/* 註冊頁面 */}
      {/* <div className="container my-5 ">
        <div className="login-box d-flex align-items-center flex-column justify-content-center mx-auto ">
          <div className="login-header d-flex ">
          <div className="size-5 mx-2 my-3">
          <Link href="/login" className="login-lg ">登入</Link>
          </div>
          <div className="size-5 mx-2 my-3">
          <Link href="/login" className="login-lg ">註冊</Link>
          </div>
          </div>
          <form className="email-signup">
            <div className="u-form-group mb-3">
              <label htmlFor="">帳號</label>
              <input 
              className="form-input " 
              type="email" 
              placeholder="請輸入電子信箱"
              name="account"
               />
            </div>
            <div className="u-form-group mb-3">
              <label htmlFor="">密碼</label>
              <input className="form-input " type="password" placeholder="請輸入密碼" />
            </div>
            <div className="u-form-group mb-3">
              <label htmlFor="">確認密碼</label>
              <input className="form-input " type="password" placeholder="請再次輸入密碼" />
            </div>
            <div className="u-form-group">
              <button className="btn-brown ">註冊</button>
            </div>
          </form>
          <div className="u-form-group">
            <a href="#" className="forgot-password">
              忘記密碼
            </a>
          </div>

     <hr class="hr-divider"/>
          <div className="u-form-group"> 
            <div>使用其他方式登入</div>
            <div className="social-login my-2">
            <a href="#" className="line-icon mx-1">
                <BsLine />
              </a>
              <a href="#" className="google-icon mx-1">
                <AiFillGoogleCircle />
              </a>
            
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
