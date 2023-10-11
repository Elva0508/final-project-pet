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

  const handleButtonClick = (screenName) => {
    setCurrentScreen(screenName);
  };

  const getHistory = async() => {
    await axios.get("http://localhost:3005/api/member-history")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setHistory(data)
      })
      .catch((error) => {
        console.error("Error:", error);
    });
  }

useEffect(() => {
  getHistory()
  }, [])

  return (
    <>
      <div className="my-3">
        <ListUserM />
        <div className="d-flex justify-content-around py-2">
          <ListD />
          <div className="d-flex flex-column col-12 col-md-8 history">

              <h5 className="size-5  mt-3 ms-md-5 ms-3">
                刊登紀錄
              </h5>
              <div className="my-3">
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
              {currentScreen === "2" && <HistoryStatusAll history={history} getHistory={getHistory}/>}
              {currentScreen === "0" && <HistoryStatus history={history} getHistory={getHistory} currentScreen={currentScreen}/>}
              {currentScreen === "1" && <HistoryStatus history={history} getHistory={getHistory} currentScreen={currentScreen}/>}

            </div>
          </div>
        </div>
    </>
  );
}
