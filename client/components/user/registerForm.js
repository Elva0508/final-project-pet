import React from 'react'

export default function RegisterForm() {
  return (
    <>
    <div>registerForm</div><form className="email-login">
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
  </>
  )
}
