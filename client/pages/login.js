import React from 'react'
import Link from 'next/link'
import ResponsiveAppBar from '@/components/navbar/ResponsiveAppBar'
import LoginForm from '@/components/user/loginForm'

export default function Login() {
  return (
    <>
       <ResponsiveAppBar/>
       <div>login</div>
        <div className="container">
  <div className="login-box">
    <div className="lg-header">
      {/* <a href="#" className="active" id="login-box-link">  </a> */}
      <Link href="/login">
      登入
      </Link>
   
    
      <a href="#" id="signup-box-link">
        註冊
      </a>
    </div>
  <LoginForm/>
  </div>
</div>

    </>
  )
}
