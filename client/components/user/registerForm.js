import React, { useState } from "react";

export default function RegisterForm() {
  const [userName, setUserName] = useState();
  const [signupEmail, setSignupEmail] = useState();
  const [signupPassword, setSignPassword] = useState();
  const [rePassword, setRepassword] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupPassword !== rePassword) {
      setError("密碼不一致");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3005/api/auth-jwt/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signupEmail,
            password: signupPassword,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      // Registration successful, redirect to login page
      window.location.href = "/login";
    } catch (error) {
      setError("註冊失敗");
    }
  };

  return (
    <>
      <form className="email-signup">
        <div className="u-form-group mb-3">
          <label htmlFor="">姓名</label>
          <input
            className="form-input "
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {error && <div className="form-alert">{error}</div>}
        </div>
        <div className="u-form-group mb-3">
          <label htmlFor="">帳號</label>
          <input
            className="form-input "
            type="email"
            placeholder="請輸入電子信箱"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          {error && <div className="form-alert">{error}</div>}
        </div>
        <div className="u-form-group mb-3">
          <label htmlFor="">密碼</label>
          <input
            className="form-input "
            type="password"
            placeholder="請輸入密碼"
            value={signupPassword}
            onChange={(e) => setSignPassword(e.target.value)}
          />
          {error && <div className="form-alert">{error}</div>}
        </div>
        <div className="u-form-group mb-3">
          <label htmlFor="">確認密碼</label>
          <input
            className="form-input "
            type="password"
            placeholder="請再次輸入密碼"
            value={rePassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
          {error && <div className="form-alert">{error}</div>}
        </div>
        <div className="u-form-group mb-3">
          
        </div>
        <div className="u-form-group">
          <button type="submit" className="btn-brown ">
            註冊
          </button>
        </div>
      </form>
    </>
  );
}
