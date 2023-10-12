import React, { useState, useEffect } from "react";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { HiClipboardList } from "react-icons/hi";
import HistoryStatus from "@/components/member/history-status";
import HistoryStatusAll from "@/components/member/history-statusAll";

import axios from "axios";

export default function History() {
  const [currentScreen, setCurrentScreen] = useState("2");
  const [history , setHistory]=useState([])
  const [count,setCount]=useState([])

  const handleButtonClick = (screenName) => {
    setCurrentScreen(screenName);
  };

  const getHistory = async(id) => {
    await axios.get(`http://localhost:3005/api/member-history/${id}`)
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setHistory(data)
      })
      .catch((error) => {
        console.error("Error:", error);
    });
  }

  const getCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/member-history/count/count`,
      );
      const data = response.data.result
      console.log(data);
       setCount(data)
    } catch (error) {
      console.error("Error:", error);
    }
   
  };

  let idCounts = [];
  count.forEach(v => {
    const mission_id = v.mission_id;
    if (idCounts[mission_id]) {
        idCounts[mission_id]++; // 如果 ID 已经存在，增加计数
    } else {
        idCounts[mission_id] = 1; // 如果 ID 不存在，初始化计数为 1
    }
  });

useEffect(() => {
  const token = localStorage.getItem("token");
  const id=localStorage.getItem("id")
  // 沒有token
  if (!token) {
    window.location.href="/"
  }
  console.log(id);
  console.log(token);
  getHistory(id)
  getCount()
  }, [])

  return (
    <>
      <div className="my-3">
        <ListUserM />
        <div className="d-flex justify-content-around py-2">
          <ListD />
          <div className="d-flex flex-column col-12 col-md-8 history">

              <h5 className="size-5  my-3 ms-md-0 ms-3 big">
                刊登紀錄
              </h5>
              <div className="">
                <button
                  className={` size-6 listbutton first ${
                    currentScreen === "2" ? "pressed" : ""
                  }`}
                  onClick={() => {
                    handleButtonClick("2");
                  }}
                >
                  全部
                </button>
                <button
                  className={` size-6 listbutton ${
                    currentScreen === "1" ? "pressed" : ""
                  }`}
                  onClick={() => {
                    handleButtonClick("1");
                  }}
                >
                  刊登中
                </button>
                <button
                  className={` size-6 listbutton ${
                    currentScreen === "0" ? "pressed" : ""
                  }`}
                  onClick={() => {
                    handleButtonClick("0");
                  }}
                >
                  已下架
                </button>
              </div>
              {currentScreen === "2" && <HistoryStatusAll history={history} getHistory={getHistory} idCounts={idCounts}/>}
              {currentScreen === "0" && <HistoryStatus history={history} getHistory={getHistory} currentScreen={currentScreen} idCounts={idCounts}/>}
              {currentScreen === "1" && <HistoryStatus history={history} getHistory={getHistory} currentScreen={currentScreen} idCounts={idCounts}/>}

            </div>
          </div>
        </div>
    </>
  );
}
