import React, { useEffect, useState } from "react";
import axios from "axios";
import useInterval from "@/hooks/use-interval";


export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [count, setCount] = useState(10);
  const [delay, setDelay] = useState(null);

  useInterval(() => {
    setCount(count - 1);
  }, delay);

  useEffect(() => {
    if (count <= 0) {
      setDelay(null);
    }
  }, [count]);


  const getOtp = async () => {
    if (delay !== null) {
      setMessage('60s內無法重新獲得驗証碼')
      return
    }

    try{
    const res = await axios.post(
      'http://localhost:3005/api/reset-password/otp',
      {
        email,
      }
    )

    console.log(res.data)
    if (res.data.message === 'fail') {
      setMessage('驗証碼取得失敗，請確認Email是否已經註冊')
    }

    if (res.data.message === 'email sent') {
      setMessage('驗証碼已寄送到你填寫的Email信箱中')
      setCount(60) // reset countdown
      setDelay(1000) // 1000ms = 1s
    }
} catch(error){
    console.error(error);
      setMessage('取得驗證碼時發生錯誤');
}

  }



   const resetPassword = async () => {
   try{
    const res = await axios.post(
      'http://localhost:3005/api/reset-password/reset',
      {
        email,
        token,
        password,
      }
    )

    if (res.data.message === 'Password updated successfully') {
      setMessage('密碼已成功修改!')
    } else if (res.data.message === 'Internal Server Error') {
        setMessage('密碼修改失敗，內部伺服器錯誤!');
      } else {
        setMessage('密碼修改失敗，未知錯誤!');
      }
    //console.log(res.data) 
} catch(error){
    console.error(error);
      setMessage('密碼修改時發生錯誤');
}
  }

  return (
    <>
      <h5 style={{ color: "#ff6600" }}>訊息：{message}</h5>
      <label>
        Email:
        <input type="text" 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
         />
      </label>
      <br />
      <button onClick={getOtp}>
        {delay ? count + "秒後再次取得驗證碼" : "取得驗證碼"}
      </button>
      <br />
      <label>
        電子郵件驗證碼:
        <input type="text" 
        value={token}
        onChange={(e)=> setToken(e.target.value)}
         />

      </label>
      <br />
      <label>
        新密碼：
        <input type="text" 
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
         />
      </label>
      <br />
      <button onClick={resetPassword}>重新設定密碼</button>
    </>
  );
}
