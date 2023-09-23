import React from 'react'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <>
        <div className="container">
  <div className="login-box">
    <div className="lg-header">
      <a href="#" className="active" id="login-box-link">
        登入
      </a>
      <a href="#" id="signup-box-link">
        註冊
      </a>
    </div>
    <form className="email-login">
      <div className="u-form-group">
        <label htmlFor="">電子信箱</label>
        <input type="email" placeholder="請輸入電子信箱" />
      </div>
      <div className="u-form-group">
        <label htmlFor="">密碼</label>
        <input type="password" placeholder="請輸入密碼" />
      </div>
      <div className="u-form-group">
        <button>登入</button>
      </div>
    </form>
    <hr className="hr1" />
    <div className="u-form-group">
      <a href="#" className="forgot-password">
        忘記密碼
      </a>
    </div>
    <form className="email-signup">
      <div className="u-form-group">
        <label htmlFor="">電子信箱</label>
        <input type="email" placeholder="請輸入電子信箱" />
      </div>
      <div className="u-form-group">
        <label htmlFor="">密碼</label>
        <input type="password" placeholder="請輸入密碼" />
      </div>
      <div className="u-form-group">
        <label htmlFor="">確認密碼</label>
        <input type="password" placeholder="請再次輸入密碼" />
      </div>
      <div className="u-form-group">
        <button>註冊</button>
      </div>
    </form>
    <hr className="hr1" />
    <div className="u-form-group">
      <a href="#" className="forgot-password">
        忘記密碼
      </a>
    </div>
    <div>
      <div>使用其他方式登入</div>
      <div className="social-login">
        <a href="#">
          <i className="fa fa-facebook fa-lg" />
          Login in with facebook
        </a>
        <a href="#">
          <i className="fa fa-google-plus fa-lg" />
          log in with Google
        </a>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
