import React from "react";
import Link from "next/link";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import LoginForm from "@/components/user/loginForm";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BsLine } from "react-icons/bs";

export default function Login() {
  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <div className="container my-5 ">
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
              <label htmlFor="">電子信箱</label>
              <input className="form-input " type="email" placeholder="請輸入電子信箱" />
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
      </div>
    </>
  );
}
