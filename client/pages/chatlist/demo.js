import React, { useState } from "react";
import axios from "axios";

export default function ChatDemo() {
  const [message, setMessage] = useState(""); // 儲存返回後的消息
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);

    // 建立要傳送的數據
    const requestData = {
      chatlist_userId1: 1,
      chatlist_userId2: 20,
    };

    // 發送POST請求
    axios
      .post("http://localhost:3005/api/chatlist/creatchat", requestData)
      .then((response) => {
        if (response.status === 201) {
          // 請求成功
          setMessage("請求成功");
        } else if (response.status === 200) {
          // 消息已存在
          setMessage("消息已存在");
        } else {
          // 請求失敗
          setMessage("請求失敗: " + response.data.error);
        }
      })
      .catch((error) => {
        // 網路錯誤
        setMessage("網路錯誤: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
