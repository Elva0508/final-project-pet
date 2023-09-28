import React from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { BiSolidShoppingBag } from "react-icons/bi";

export default function Purchast() {
  return (
    <>
      <div className="my-3">
        <div className="d-flex justify-content-end me-3">
          <ListM />
        </div>
        <ListUserM />
        <div className="d-flex justify-content-around py-2">
          <ListD />
          <div className="row col-lg-8 col-md-8 col-12 purchast-bg  p-3">
          
            <div>
              <h5 className="size-5">
                <BiSolidShoppingBag />
                購買紀錄
              </h5>
              <div className="d-flex border-bottom py-2 justify-content-between">

                <div className="d-flex  col-9">
                  <img
                    className="picture me-4"
                    src="https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_1(12).jpg"
                  ></img>

                  <div className="">
                    <p className="size-6">巨型開放式貓砂盆 (多色)</p>
                    <p className="size-6 type">貓砂盆</p>
                    <p className="size-6 price">NT$690</p>
                  </div>
                </div>

                <div className="col-3  d-flex flex-column align-items-center justify-content-center">
                  <button className="btn btn-confirm m-2 size-6 m-size-7">
                    再次購買
                  </button>
                  <button className="btn btn-outline-confirm m-2 size-6 m-size-7">
                    加入收藏
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
