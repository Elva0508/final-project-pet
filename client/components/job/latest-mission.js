import React, { useState } from 'react';
import { CiHeart } from "react-icons/Ci";
import { BiSolidHeart, BiSolidCart } from "react-icons/bi";

// pc版（默認導出）
export default function LatestMission() {
    const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); // 切換收藏狀態
    };
    return (
        <>
            <div className='latest-mission-card d-flex'>
                <div className='mission-img'>
                    <img src="/kitten.jpg" alt="任務" />
                </div>
                <div className='mission-content ms-2'>
                    <div className='title size-6'>雙十連假顧貓 對我的貓好一點 測試換行</div>
                    <div className='d-flex justify-content-between mt-1 mt-sm-2'>
                        <div className='size-7'>台中市大甲區<br />2023-08-21</div>
                        <img src={isFavorite ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorite ? "已收藏" : "未收藏"} onClick={toggleFavorite} />
                        {/* <div onClick={toggleFavorite}>
                            {isFavorite ? (
                                <div className="position-relative inline-block">
                                    <BiSolidHeart className="heart-icon-red" />
                                    <CiHeart className="heart-icon-red-line" />
                                </div>
                            ) : (
                                <CiHeart />
                            )}
                        </div> */}
                    </div>
                    <div className='d-flex justify-content-between align-items-end price'>
                        <div >單次<span className='size-6'> NT$140</span></div>
                        <button className='btn-confirm size-6'>應徵</button>
                    </div>
                </div>
            </div>
        </>
    )
}

// mobile版（命名導出）
export const MobileLatestMission = () => {
    return (
      <>
        <div id="carouselExampleIndicators" class="carousel slide pb-3" data-bs-ride="carousel">
          <div class="carousel-indicators mt-5">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <LatestMission />
            </div>
            <div class="carousel-item">
              <LatestMission />
            </div>
            <div class="carousel-item">
              <LatestMission />
            </div>
          </div>
          
          {/* 上一張 */}
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          {/* 下一張 */}
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </>
    )
  };