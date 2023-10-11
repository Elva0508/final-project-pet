import React, { useState} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LoginF from '@/components/user/login'
// import LoginForm from "@/components/user/loginForm";
import RegisterForm from "@/components/user/registerForm";

import { AiFillGoogleCircle } from "react-icons/ai";
import { BsLine } from "react-icons/bs";

export default function Login() {
 

  //jack@example.com
  //asdfgh1234
 
const [email, setEmail]=useState('')
const [password, setPassword]=useState('')
const router=useRouter()


  //登入註冊狀態切換
  const [isLogin, setIsLogin] = useState(true);
  const toggleLoginRegister = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
    
      <div className="container my-5 ">
        <div className="login-box d-flex align-items-center flex-column justify-content-center mx-auto ">
          <div className="login-header d-flex ">

            <div className="size-5 mx-3 my-2">
              <Link
                className={ `login-lg mx-3 ${isLogin ? "active" : ""}`}
                href="http://localhost:3000/member/login"
                onClick={()=>setIsLogin(true)}
              >
                登入
              </Link>
            </div>
            <div className="size-5 mx-3 my-2">
              <Link
                className={ `login-lg mx-3 ${!isLogin ? "active" : ""}`}
                href="http://localhost:3000/member/login"
                onClick={()=>setIsLogin(false)}
              >
                註冊
              </Link>
            </div>
          </div>


        

         {isLogin ? <LoginF/> : <RegisterForm/>}
          
          
          <div className="u-form-group">
            {/* <a href="#" className="forgot-password">
              忘記密碼
            </a> */}
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
     
      

    </>
  );
}
