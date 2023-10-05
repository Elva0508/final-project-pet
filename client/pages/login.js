import React, { useState} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LoginF from '@/components/user/login'
// import LoginForm from "@/components/user/loginForm";
import RegisterForm from "@/components/user/registerForm";

import { AiFillGoogleCircle } from "react-icons/ai";
import { BsLine } from "react-icons/bs";

export default function Login() {
 
 
const [email, setEmail]=useState('')
const [password, setPassword]=useState('')
const router=useRouter()


  //登入註冊狀態切換
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
    
      <div className="container my-5 ">
        <div className="login-box d-flex align-items-center flex-column justify-content-center mx-auto ">
          <div className="login-header d-flex ">
            <div className="size-5 mx-2 my-3">
              <Link
                href="/login"
                className="login-lg"
               
              >
                登入
              </Link>
            </div>
            <div className="size-5 mx-2 my-3">
              <Link
                href="/login"
                className="login-lg "
     
              >
                註冊
              </Link>
            </div>
          </div>


        {/* 登入 */}
          {/* <form className="email-signup"  >
            <div className="u-form-group mb-3">
              <label htmlFor="">帳號</label>
              <input 
              className="form-input " 
              type="email" 
              placeholder="請輸入電子信箱"
             
              
               />
                <div className="form-alert">{error.username}</div>  
            </div>
            <div className="u-form-group mb-3">
              <label htmlFor="">密碼</label>
              <input 
              className="form-input " 
              type="password" 
              placeholder="請輸入密碼"
          
       
               />
           
             <div className="form-alert">{error.password}</div>   
            </div>

          
            <div className="u-form-group">
              <button type='submit' className="btn-brown ">登入</button>
            </div>

          </form> */}
          <LoginF/>
          <div className="u-form-group">
            <a href="#" className="forgot-password">
              忘記密碼
            </a>
          </div>


          <hr className="hr-divider" />
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

     <hr className="hr-divider"/>
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
      </div>  */}
      <RegisterForm/>

    </>
  );
}
