import React, { useState } from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { HiClipboardList } from "react-icons/hi";
import HistoryStatusOne from "@/components/member/history-status-one";
import HistoryStatusTwo from "@/components/member/history-status-two";
import HistoryStatusThree from "@/components/member/history-status-three";

export default function History() {
  const [currentScreen, setCurrentScreen] = useState("1");

  const handleButtonClick = (screenName) => {
    setCurrentScreen(screenName);
  };
  return (
    <>
      <div className="my-3">
        <div className="d-flex justify-content-end me-3">
          <ListM />
        </div>
        <ListUserM />
        <div className="d-flex justify-content-around py-2">
          <ListD />
          <div className="row col-lg-8 col-md-8 col-12 history p-3">
            <div>
              <h5 className="size-5">
                <HiClipboardList />
                刊登紀錄
              </h5>
              <div className="my-3">
                <button
                  className={`mx-2 size-7 listbutton ${
                    currentScreen === "1" ? "pressed" : ""
                  }`}
                  onClick={() => {
                    handleButtonClick("1");
                  }}
                >
                  全部
                </button>
                <button
                  className={`mx-2 size-7 listbutton ${
                    currentScreen === "2" ? "pressed" : ""
                  }`}
                  onClick={() => {
                    handleButtonClick("2");
                  }}
                >
                  刊登中
                </button>
                <button
                  className={`mx-2 size-7 listbutton ${
                    currentScreen === "3" ? "pressed" : ""
                  }`}
                  onClick={() => {
                    handleButtonClick("3");
                  }}
                >
                  已下架
                </button>
              </div>
              {currentScreen === "1" && <HistoryStatusOne />}
              {currentScreen === "2" && <HistoryStatusTwo />}
              {currentScreen === "3" && <HistoryStatusThree />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
