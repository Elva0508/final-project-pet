import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

export default function Chatroom() {
  const router = useRouter();
  const { id } = router.query;
  const chatlist_id = id;
  // console.log("chatlist_id=" + chatlist_id);
  const [chatContent, setChatContent] = useState([]); //內容設置的狀態
  const [chatTitle, setChatTitle] = useState([]); //聊天室標題設置的狀態
  const [userId, setUserId] = useState(""); //儲存userID
  const [userInfo, setUserInfo] = useState(""); //儲存userInfo
  const [ws, setWs] = useState(null); // WebSocket連接的狀態
  const [decodedToken, setDecodedToken] = useState(null); // 新增 decodedToken 狀態
  const [msgInputValue, setMsgInputValue] = useState(""); // 輸入框的值

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
      // 解 token 拿到 user_id
      setDecodedToken(decodedToken);
      // 儲存user_id
      setUserId(decodedToken.user_id);
    }
    // 如果 chatlist_id 存在，則調用 getChatContent
    if (chatlist_id) {
      getChatContent(chatlist_id);
    }
    if (chatlist_id && userId) {
      getChatTitle(chatlist_id, userId);
    }
    if (userId) {
      getUserInfo(userId);
    }
  }, [router.isReady, chatlist_id, userId]);

  const decodeToken = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded;
    } catch (error) {
      console.error("失敗：", error);
      return false;
    }
  };

  // 利用網址傳來的chatlist_id向伺服器要求資料並設定到狀態中
  const getChatContent = async (chatlist_id) => {
    const res = await fetch(
      "http://localhost:3005/api/chatroom/" + chatlist_id
    );

    const ChatContentData = await res.json();

    console.log(ChatContentData);
    // 設定到狀態中 -> 會觸發重新渲染(re-render)
    if (Array.isArray(ChatContentData)) setChatContent(ChatContentData);
  };

  // 利用網址傳來的chatlist_id + Token解出來的user_id向伺服器要求聊天室標題資料並設定到狀態中
  const getChatTitle = async (chatlist_id, userId) => {
    const res = await fetch(
      "http://localhost:3005/api/chatlist/" + userId + "/" + chatlist_id
    );

    const ChatTitleData = await res.json();

    console.log(ChatTitleData);
    // 設定到狀態中 -> 會觸發重新渲染(re-render)
    if (Array.isArray(ChatTitleData)) setChatTitle(ChatTitleData);

    const TargetObject = ChatTitleData[0];

    if (TargetObject) {
      const TargetUserId = TargetObject.user_id;
      const TargetUserCoverPhoto = TargetObject.cover_photo;
      const TargetUserName = TargetObject.name;
    } else {
      // 如果陣列為空（沒有找到匹配的資料），可以在這裡處理
      console.log("未找到相應的使用者資訊");
    }
  };

  // 利用token解出的userId + 向伺服器要求目前正在登入狀態的userInfo
  const getUserInfo = async (userId) => {
    const res = await fetch(
      "http://localhost:3005/api/chatroom/userinfo/" + userId
    );

    const UserInfoData = await res.json();

    console.log(UserInfoData);
    // 設定到狀態中 -> 會觸發重新渲染(re-render)
    if (Array.isArray(UserInfoData)) setUserInfo(UserInfoData);

    const firstObject = UserInfoData[0];

    if (firstObject) {
      const UserCoverPhoto = firstObject.cover_photo;
    } else {
      // 如果陣列為空（沒有找到匹配的資料），可以在這裡處理
      console.log("未找到相應的使用者資訊");
    }
  };

  // WebSocket連接
  useEffect(() => {
    // 有decodedToken再執行
    if (decodedToken) {
      const newWs = new WebSocket("ws://localhost:8080");

      // 設置WebSocket連接
      newWs.addEventListener("open", () => {
        console.log("WebSocket連接已打開");
        let params = {
          type: "register",
          user_id: decodedToken.user_id,
        };
        newWs.send(JSON.stringify(params));
        setWs(newWs);
      });

      // // 處理WebSocket消息
      // newWs.addEventListener("message", (event) => {
      //   console.log("message有被監聽到");
      //   handleTextsend(event);
      // });

      return () => {
        newWs.close(); //關掉處理WebSocket消息
      };
    }
  }, [decodedToken]);

  // WebSocket連接
  useEffect(() => {
    // 有decodedToken再執行
    if (decodedToken) {
      const newWs = new WebSocket("ws://localhost:8080");

      // 設置WebSocket連接
      newWs.addEventListener("open", () => {
        console.log("WebSocket連接已打開");
        let params = {
          type: "register",
          user_id: decodedToken.user_id,
        };
        newWs.send(JSON.stringify(params));
        setWs(newWs);
      });

      // 處理WebSocket消息
      newWs.addEventListener("message", (event) => {
        console.log("message有被監聽到");
        handleTextsend(event);
      });

      return () => {
        console.log("關掉WebSocket");
        newWs.close(); //關掉處理WebSocket消息
      };
    }
  }, [decodedToken]);

  // 處理訊息送出事件
  const handleSendClick = () => {
    if (ws) {
      let message = msgInputValue;

      let params = {
        type: "message",
        message,
        fromID: userId,
      };
      ws.send(JSON.stringify(params));
      // ws.send(msgInputValue);
      // console.log(msgInputValue);
      setMsgInputValue(""); // 清空输入框的值
    }
  };

  // 處理WebSocket消息
  const handleTextsend = async (event) => {
    console.log("我要執行handleTextsend囉");
    let result = JSON.parse(event.data);
    let clientList;
    if (result.type === "registered") {
      console.log("執行處理聊天室註冊");
      // 處理聊天室註冊
      clientList = result.otherClients;
      setClients();
      return false;
    }
    if (result.type === "message") {
      console.log("訊息傳送");
      // 處理送出的消息
      let sendMassage = result.message;
      console.log(result.message);
      let fromID = result.fromID;
      if (fromID === userId) {
        // 創建新的聊天消息物件
        const newMessage = `
          <div className="user p-3">
            <div className="d-flex align-items-center justify-content-end my-1 chat-box">
              <div className="size-7 m-size-7 rounded-pill content py-1 px-2">
                ${sendMassage}
              </div>
              <div className="avatar rounded-circle mr-3 overflow-hidden rounded-circle ms-2">
                <img
                  src=${UserCoverPhoto}
                  className="img-fluid object-fit-cover"
                  alt="User"
                />
              </div>
            </div>
          </div>`;
        // 更新聊天內容
        setChatContent((prevContent) => [...prevContent, newMessage]);
      }
      // const newMessage = template;

      return false;
    }
    if (result.type === "disconnected") {
      return false;
    }

    // 把目前登入的userID當作自己
    function setClients() {
      console.log(clientList);
      let DOMS = "";
      clientList.forEach((client) => {
        let myself = client === userId ? "myself" : "";
        DOMS += `<div className='${myself}'>${client}<div>`;
      });
    }

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
                  {chatTitle.map((v, i) => (
                    <img
                      key={v.chatlist_id}
                      src={v.cover_photo}
                      className="img-fluid object-fit-cover"
                    />
                  ))}
                </div>
                <div className="mx-3 size-5 m-size-5">
                  {chatTitle.map((v, i) => (
                    <span key={v.chatlist_id}>{v.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="chat-content">
            {/* 聊天對象 */}
            {/* <div className="chat-content-target-user p-3">
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
            </div> */}
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
