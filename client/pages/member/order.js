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

  // const [order, setOrder] = useState([])

  // const getOrder = async() => {
  //     await axios.get("http://localhost:3005/member/order")
  //       .then((response) => {
  //         const data = response.data.result;
  //         console.log(data);
  //         setOrder(data)
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //     });
  //   }
  // const getCart = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3005/product/cart");
  //       const data = response.data.result;
  //       console.log(data);
  //       setCart([data]);
  //       console.log(cart);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // useEffect(() => {
  //     getOrder()
  //   }, [])

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

                {/* {order.map((v,i)=>{
                    return(
                      <div key={i}>
                        <p className='date my-3 size-7'>2023-08-26 訂單編號 : 134868</p>
                        <div className='d-flex justify-content-between border-bottom'>
                          <div>
                            <p className='size-7'>狀態 : {v.status_id}</p>
                            <p className='size-7'>付款方式 : 貨到付款</p>
                            <p className='size-7'>寄送方式 : 宅配</p>
                            <img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_A1MKD200101(1).jpg' className='d-sm-none d-block' alt='产品图片'></img>
                            <p className='size-6 price'>訂單金額 : NT${v.total_amount}</p>
                          </div>
                          <div className='d-flex align-self-end'>
                            <img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_A1MKD200101(1).jpg' className='d-sm-block d-none' alt='产品图片'></img>
                            <div className='d-flex align-self-center'>
                              <button className="btn btn-outline-confirm m-2 size-6">查看明細</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    )
                  })} */}

                {/* { screenName==="1" && <orderStatusOne />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
