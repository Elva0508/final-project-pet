import React, { useState, useEffect } from "react";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import Image from "next/image";
import myProfile from "@/assets/myProfile.svg";
import useRWD from "@/hooks/useRWD";
import jwt_decode from "jwt-decode";

const ResetUserPassword = () => {
  //RWD
  const device = useRWD();
  const userRfs = device == "mobile" ? "m-size-6" : "size-6";

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  //設置id狀態 解token
  const [userId, setUserId] =useState(null)
  useEffect(()=>{
    const u = localStorage.getItem("id");
    setUserId(u)
    //const token = localStorage.getItem("token");
    // if(token){
    //   try{
    //     const decodeToken = jwt_decode(token);
    //     const currentUserId =decodeToken.id;
    //     console.log(userId)

    //     //更新userId狀態
    //     setUserId(currentUserId)
    //   }catch(error){
    //     console.error("token解析錯誤",error)
    //   }
    // }
  },[userId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordCheck) {
      alert("新密碼與確認密碼不相符");
      return;
    } else {
      alert("密碼修改成功");
    }
    try {
      const response = await fetch(
        `http://localhost:3005/api/user/change-password/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            newPassword,
          }),
        }
      );
      const data = await response.json();
      //alert(data.message);
      setPassword("");
      setNewPassword("");
      setNewPasswordCheck("");
    } catch (error) {
      console.error(error);
      //alert("修改密碼失敗");
    }
  };

  const handleCancel = () => {
    setPassword("");
    setNewPassword("");
    setNewPasswordCheck("");
  };

  return (
    <div className="my-3">
      <div className="d-flex justify-content-around pt-2">
        {/* mobile版的左側tab */}
        <ListUserM />
        <ListD />

        <div className="reset-password  row col-lg-8 col-md-8 col-12">
        
            <div className="title">
              <p className=" size-4">
                <Image src={myProfile} alt="myProfile-logo" />
                重新設定密碼
              </p>
            </div>
       
          <div className="d-flex justify-content-center">
            <div className="reset-form">
              <div className="reset-group">
                <label htmlFor="" className={userRfs}>
                  原密碼
                </label>
                <input
                  className="form-input  "
                  type="password"
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="reset-group">
                <label htmlFor="" className={userRfs}>
                  新密碼
                </label>
                <input
                  className="form-input "
                  type="password"
                  placeholder="請輸入新密碼"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="reset-group">
                <label htmlFor="" className={userRfs}>
                  確認新密碼
                </label>
                <input
                  className="form-input "
                  type="password"
                  placeholder="請再輸入一次密碼"
                  value={newPasswordCheck}
                  onChange={(e) => setNewPasswordCheck(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center gap-5 mt-5">
                <button className="btn-outline-confirm" onClick={handleCancel}>
                  取消
                </button>
                <button className="btn-confirm" onClick={handleSubmit}>
                  儲存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetUserPassword;
