import React, { useState } from "react";
import { CiHeart } from "react-icons/Ci";
import { BiSolidHeart } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function JobStatusTwo() {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // 切換收藏狀態
  };
  return (
    <>
      <div className="form-check border-bottom border-top">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label " for="flexCheckDefault">
          全選
          <RiDeleteBin5Line />
        </label>
      </div>
      <div className="d-flex border-bottom my-2 justify-content-between">
        <div className=" d-flex  ">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label " for="flexCheckDefault">
              <p className="size-7 d-md-none d-block">2023/08/23</p>
              <p className="size-6 title d-md-none d-block">餵養貓咪</p>
              <p className="size-7 content d-md-none d-block">陳小姐</p>
              <p className="size-7 content d-md-none d-block">
                單次1,500元 | 台北市內湖區
              </p>
              <p className="size-7 content d-md-none d-block">
                任務內容｜ 一天兩次早晚幫忙餵食，貓有一點兇
              </p>
              <p className="size-7 follow d-md-none d-block">6-10人追蹤</p>
            </label>
          </div>
          {/* 1 */}
          <div className="d-md-flex d-none">
            <div>
              <p className="size-7 me-3">2023/08/23</p>
            </div>
            <div>
              <div className="d-flex">
                <p className="size-6 title">餵養貓咪</p>
                <div className="ms-3" onClick={toggleFavorite}>
                  {isFavorite ? <BiSolidHeart /> : <CiHeart />}
                </div>
              </div>
              <p className="size-7 content">陳小姐</p>
              <p className="size-7 content">單次1,500元 | 台北市內湖區</p>
              <p className="size-7 content">
                任務內容｜ 一天兩次早晚幫忙餵食，貓有一點兇
              </p>
              <p className="size-7 follow">6-10人追蹤</p>
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-column align-items-center">
            <button className="btn btn-confirm m-2 size-6 ">應徵</button>
          </div>

          <div className="d-flex flex-column">
            <p className="size-7 text-center apply">2023-08-22</p>
            <p className="size-7 text-center apply">已應徵</p>
          </div>
        </div>
      </div>
    </>
  );
}
