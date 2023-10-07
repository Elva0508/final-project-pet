import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

export default function Chatroom() {
  const [chatContent, setChatContent] = useState([]); //內容設置的狀態
  const [ws, setWs] = useState(null); // WebSocket連接的狀態
  const [msgInputValue, setMsgInputValue] = useState(""); // 輸入框的值
  const router = useRouter();
  const { chatlist_id, name } = router.query;

  // 驗證有無登入
  useEffect(() => {
    const token = localStorage.getItem("token");
    // 沒有token
    if (!token) {
      console.log("user沒登入");
      return;
    }
    const decodedToken = decodeToken(token);

    // 使用 router.isReady 判斷
    if (router.isReady) {
      // 解 token 拿到 user_id 和 chatlist_id
      getChatContent(decodedToken.user_id, chatlist_id);
    }
  }, [router.isReady, chatlist_id]); // chatlist_id當參數

  const decodeToken = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded;
    } catch (error) {
      console.error("失敗：", error);
      return false;
    }
  };

  // 利用解碼後的user_id向伺服器要求資料並設定到狀態中
  const getChatContent = async (chatlist_id) => {
    console.log(chatlist_id);
    const res = await fetch(
      "http://localhost:3005/api/chatroom/" + chatlist_id
    );

    const data = await res.json();

    console.log(data);
    // 設定到狀態中 -> 會觸發重新渲染(re-render)
    if (Array.isArray(data)) setChatContent(data);
  };

  //之後userId要改成登入者的userID
  const userId = "aaa";

  // WebSocket連接
  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:8080");

    // 設置WebSocket連接
    newWs.addEventListener("open", () => {
      console.log("WebSocket連接已打開");
      let params = {
        type: "register",
        userId,
      };
      newWs.send(JSON.stringify(params));
      setWs(newWs);
    });

    // 處理WebSocket消息
    newWs.addEventListener("message", (event) => {
      handleTextsend(event);
    });

    return () => {
      newWs.close(); //關掉處理WebSocket消息
    };
  }, []);

  // 處理送出事件
  const handleSendClick = () => {
    if (ws) {
      ws.send(msgInputValue);
      setMsgInputValue(""); // 清空输入框的值
    }
  };

  // 處理WebSocket消息
  const handleTextsend = async (event) => {
    let result = JSON.parse(event.data);
    let clientList;
    if (result.type === "registered") {
      clientList = result.otherClients;
      setClients();
      return false;
    }
    if (result.type === "message") {
      return false;
    }
    if (result.type === "disconnected") {
      return false;
    }

    function setClients() {
      console.log(clientList);
      let DOMS = "";
      clientList.forEach((client) => {
        let myself = client === userId ? "myself" : "";
        DOMS += `<div className='${myself}'>${client}<div>`;
      });
    }

    // 新增一塊聊天框框
    const newMessage = {};

    //更新聊天內容
    setChatContent((prevContent) => [...prevContent, newMessage]);
  };

  return (
    <>
      <div className="chatroom">
        <div className="container shadow bg-body-tertiary rounded p-0">
          <div className="size-3 sticky-top size-3 m-size-5 p-3">
            <div className="target-user">
              <div className="d-flex align-items-center">
                <div className="avatar rounded-circle mr-3 overflow-hidden rounded-circle">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/VAN_CAT.png"
                    className="img-fluid object-fit-cover"
                  />
                </div>
                <div className="mx-3 size-5 m-size-5">
                  <span>{name}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-content">
            {/* 聊天對象 */}
            <div className="chat-content-target-user p-3">
              <div className="d-flex align-items-center">
                <div className="avatar rounded-circle mr-3 overflow-hidden rounded-circle">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/VAN_CAT.png"
                    className="img-fluid object-fit-cover"
                  />
                </div>
                <div className="mx-3 size-6 m-size-6">
                  <span>客服小幫手</span>
                </div>
                <div className="size-7 m-size-7 rounded-pill content py-1 px-2">
                  您好，請問有什麼需要為您服務的嗎？
                </div>
              </div>
            </div>
            {/* 自己 */}
            {chatContent.map((v, i) => {
              return (
                <div className="user p-3">
                  <div className="d-flex align-items-center justify-content-end my-1 chat-box">
                    <div className="size-7 m-size-7 rounded-pill content py-1 px-2">
                      {v.chat_contentchat}
                    </div>
                    <div className="avatar rounded-circle mr-3 overflow-hidden rounded-circle ms-2">
                      <img
                        src={v.cover_photo}
                        className="img-fluid object-fit-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="input-group mb-3">
            <input
              name="msg"
              type="text"
              className="form-control"
              placeholder="請輸入訊息內容"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={msgInputValue}
              onChange={(e) => setMsgInputValue(e.target.value)}
            />
            <button
              className="btn-second mx-1"
              type="button"
              id="button-addon2"
              onClick={handleSendClick}
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
