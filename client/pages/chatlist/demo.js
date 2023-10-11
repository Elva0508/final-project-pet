import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function ChatDemo() {
  const [message, setMessage] = useState(""); // 儲存返回後的消息
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null); // 用於儲存解析後的userID

  // 利用token拿到當前登入的userID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const currentUserID = decodedToken.id;
        console.log("currentUserID", currentUserID);
        setUserId(currentUserID);
      } catch (error) {
        console.error("解析Token時出錯", error);
      }
    }
  }, []);

  const handleButtonClick = async () => {
    setIsLoading(true);

    // 檢查是否有有效的 userId
    //如果放入targetID 變數 這邊也要把targetID 變數放進來檢查
    if (userId) {
      // 建立要傳送的數據
      const requestData = {
        chatlist_userId1: userId,
        chatlist_userId2: 31, // 放要對話的 targetID 變數
      };

      try {
        const response = await axios.post(
          "http://localhost:3005/api/chatlist/creatchat",
          requestData
        );

        if (response.status === 201) {
          // 請求成功
          setMessage("請求成功");
          const chatUrl = response.data.chatUrl;
          console.log("chatUrl" + chatUrl);
          // 在這裡導向到 chatUrl
          window.location.href = chatUrl;
        } else if (response.status === 200) {
          // 消息已存在
          setMessage("消息已存在");
          const chatUrl = response.data.chatUrl;
          console.log("已存在chatUrl" + chatUrl);
          // 在這裡導向到 chatUrl
          window.location.href = chatUrl;
        } else {
          // 請求失敗
          setMessage("請求失敗: " + response.data.error);
        }
      } catch (error) {
        // 處理錯誤
        setMessage(error.message || "發生錯誤");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <h1>ChatDemo</h1>
      <button
        className="btn-brown mx-1"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? "發送中..." : "發送消息"}
      </button>
      {/* 顯示返回後的消息 */}
      {message && <p>{message}</p>}
    </>
  );
}
