import { useState, useEffect } from "react";
import Link from "next/link";

export default function ChatList() {
  const [chatList, setChatList] = useState([]); //聊天列表設置的狀態
  const [ws, setWs] = useState(null); // WebSocket連接的狀態

  // WebSocket連接
  useEffect(() => {
    //之後userId要改成登入者的userID
    const userId = "aaa";
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
    newWs.addEventListener("message", (event) => {});

    return () => {
      newWs.close(); //關掉處理WebSocket消息
    };
  }, []);
  return (
    <>
      <div className="chatlist">
        <div className="container-fluid py-5">
          <div className="list-group">
            <div className="list-title">
              <Link
                href="#"
                className="list-group-item list-group-item-action active size-3 m-size-5"
                aria-current="true"
              >
                我的訊息
              </Link>
            </div>
            <div className="list">
              <Link href="#" className="list-group-item list-group-item-action">
                <div className="d-flex align-items-center">
                  <div className="avatar rounded-circle mr-3 overflow-hidden rounded-circle">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b1/VAN_CAT.png"
                      className="img-fluid object-fit-cover"
                    />
                  </div>
                  <div className="mx-3 size-5 m-size-5">
                    <span>客服小幫手</span>
                  </div>
                  <div className="size-7 m-size-7 text-secondary">
                    <span>我跟你說你不要跟別人說</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="list">
              <Link href="#" className="list-group-item list-group-item-action">
                <div className="d-flex align-items-center">
                  <div className="avatar rounded-circle mr-3 overflow-hidden rounded-circle">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b1/VAN_CAT.png"
                      className="img-fluid object-fit-cover"
                    />
                  </div>

                  <div className="ms-3 size-5 m-size-5">
                    <span>用戶1</span>
                  </div>
                  <div className="ms-4 size-7 m-size-7 text-secondary">
                    <span>我跟你說你不要跟別人說</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="list">
              <Link href="#" className="list-group-item list-group-item-action">
                <div className="d-flex align-items-center">
                  <div className="avatar rounded-circle mr-3 overflow-hidden rounded-circle">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b1/VAN_CAT.png"
                      className="img-fluid object-fit-cover"
                    />
                  </div>

                  <div className="ms-3 size-5 m-size-5">
                    <span>用戶1</span>
                  </div>
                  <div className="ms-4 size-7 m-size-7 text-secondary">
                    <span>我跟你說你不要跟別人說</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
