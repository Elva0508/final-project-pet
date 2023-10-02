import React from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { RiFileList3Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import axios from "axios";
import OrderStatusOne from "@/components/member/order-status-one";
import OrderStatusTwo from "@/components/member/order-status-two";
import OrderStatusThree from "@/components/member/order-status-three";
import OrderStatusFour from "@/components/member/order-status-four";


export default function Order() {
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
        <div className="">
          <div className="d-flex justify-content-around py-2">
            <ListD />
            <div className="row col-lg-8 col-md-8 col-12 order p-3">
              <div>
                <h5 className="size-5">
                  <RiFileList3Fill />
                  我的訂單
                </h5>
                <div className="mt-3">
                  <button
                    className={`mx-3 size-7 listbutton ${currentScreen === "1" ? 'pressed' : ''}`}
                    onClick={() => {
                      handleButtonClick("1");
                    }}
                  >
                    待出貨
                  </button>
                  <button
                    className={`mx-3 size-7 listbutton ${currentScreen === "2" ? 'pressed' : ''}`}
                    onClick={() => {
                      handleButtonClick("2");
                    }}
                  >
                    運送中
                  </button>
                  <button
                    className={`mx-3 size-7 listbutton ${currentScreen === "3" ? 'pressed' : ''}`}
                    onClick={() => {
                      handleButtonClick("3");
                    }}
                  >
                    已完成
                  </button>
                  <button
                    className={`mx-3 size-7 listbutton ${currentScreen === "4" ? 'pressed' : ''}`}
                    onClick={() => {
                      handleButtonClick("4");
                    }}
                  >
                    已取消
                  </button>

                  {currentScreen === "1" && (<OrderStatusOne />)}
                  {currentScreen === "2" && (<OrderStatusTwo />)}
                  {currentScreen === "3" && (<OrderStatusThree />)}
                  {currentScreen === "4" && (<OrderStatusFour />)}
                </div>




              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
