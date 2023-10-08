import React, { useState } from "react";
import ListD from "@/components/member/list-d";
import ListM from "@/components/member/list-m";
import Image from "next/image";
import myProfile from "@/assets/myProfile.svg";

const ResetUserPassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordCheck) {
      alert("新密碼與確認密碼不相符");
      return;
    }else{
      alert("密碼修改成功");
    }
    try {
      const response = await fetch("http://localhost:3005/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          newPassword,
        }),
      });
      const data = await response.json();
      //alert(data.message);
      // setPassword("");
      // setNewPassword("");
      // setNewPasswordCheck("");
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
    <div className="d-flex container-fluid flex-column flex-md-row my-3">
      <div className="d-flex justify-content-end">
        {/* mobile版的左側tab */}
        <ListM />
      </div>

      {/* <ListUserM /> */}
      <ListD />

      <div className="reset-password">
        <div className="title">
          <p className=" size-4">
            <Image src={myProfile} alt="myProfile-logo" />
            重新設定密碼
          </p>
        </div>

        
          <div className="reset-group">
            <label htmlFor="">原密碼:</label>
            <input
              className="form-input "
              type="password"
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="reset-group">
            <label htmlFor="">新密碼:</label>
            <input
              className="form-input "
              type="password"
              placeholder="請輸入新密碼"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="reset-group">
            <label htmlFor="">再輸入一次密碼:</label>
            <input
              className="form-input "
              type="password"
              placeholder="請再輸入一次密碼"
              value={newPasswordCheck}
              onChange={(e) => setNewPasswordCheck(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center gap-4 mt-5">
            <button className="btn-outline-confirm" onClick={handleCancel}>取消</button>
            <button className="btn-confirm" onClick={handleSubmit}>儲存</button>
          </div>
        
      </div>
    </div>
  );
};

export default ResetUserPassword;
