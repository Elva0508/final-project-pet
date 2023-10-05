import React, { useState } from "react";

export default function HistoryStatusOne() {
  return (
    <>
      <p className="size-7">2023/08/23</p>
      <div className="d-flex border-bottom my-2">
        <div className="col-9">
          <p className="size-6 title">餵養貓咪</p>
          <p className="size-7 content">單次1,500元 | 台北市內湖區</p>
          <p className="size-7 content">
            任務內容｜ 一天兩次早晚幫忙餵食，貓有一點兇
          </p>
          <p className="size-7 follow">6-10人追蹤</p>
        </div>

        <div className="col-3">
          <button className=" btn-confirm m-2 size-6">刊登中</button>
        </div>
      </div>
    </>
  );
}
