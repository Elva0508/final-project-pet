import React from "react";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { RiFileList3Fill } from "react-icons/ri";
import { useState, useEffect} from "react";
import axios from "axios";
import OrderStatus from "@/components/member/order-status";
import { useAuth } from "@/context/fakeAuthContext";

export default function Order() {
  const [currentScreen, setCurrentScreen] = useState("1");
  const [order, setOrder] = useState([])

  const getOrder = async(userId) => {
    await axios.get(`http://localhost:3005/api/member-order/${userId}`)
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setOrder(data)
      })
      .catch((error) => {
        console.error("Error:", error);
    });
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id=localStorage.getItem("id")
    // 沒有token
    if (!token) {
      console.log("user沒登入");
      return;
    }
    console.log(id);
    console.log(token);
    getOrder(id);
  }, []);

// useEffect(() => {
//     getOrder(id)
//   }, [])

  const handleButtonClick = (screenName) => {
    setCurrentScreen(screenName);
  };



  return (
      <div className="my-3">
        <ListUserM />
          <div className="d-flex justify-content-around py-2">
            <ListD />
            <div className="d-flex flex-column col-md-8 col-12 order">
  
                <h5 className="size-4 mt-3">
                  <p className="big">我的訂單</p>
                </h5>

              <div className="col-12">
                
                  <button
                    className={` size-6 listbutton first ${currentScreen === "1" ? 'pressed' : ''}`}
                    onClick={() => {
                      handleButtonClick("1");
                    }}
                  >
                    待出貨
                  </button>


                  <button
                    className={` size-6 listbutton ${currentScreen === "2" ? 'pressed' : ''}`}
                    onClick={() => {
                      handleButtonClick("2");
                    }}
                  >
                    運送中
                  </button>
                  <button
                    className={` size-6 listbutton ${currentScreen === "3" ? 'pressed' : ''}`}
                    onClick={() => {
                      handleButtonClick("3");
                    }}
                  >
                    已完成
                  </button>
                  <button
                    className={` size-6 listbutton  ${currentScreen === "4" ? 'pressed' : ''}`}
                    onClick={() => {
                      handleButtonClick("4");
                    }}
                  >
                    已取消
                  </button>
                </div>
                <OrderStatus order={order} currentScreen={currentScreen} />
            </div>
          </div>
        </div>
   
  );
}
