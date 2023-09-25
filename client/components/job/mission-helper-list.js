import React, { useState } from "react";
import Filter from "./filter";
import LatestMission from "./latest-mission";
import RoleSelection from "./role-selection";
import Search from "./search";
import { Swiper, SwiperSlide } from "swiper/react";
import useRWD from "@/hooks/useRWD";
import { register } from "swiper/element/bundle";
import { Carousel } from "@trendyol-js/react-carousel";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
register();
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const MobileFilter = () => {
  return (
    <Swiper slidesPerView="auto" className="mobile-filter">
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="服務類型"
          src={"/job-icon/plus-service.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="服務費用"
          src={"/job-icon/Heart-price.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="服務地區"
          src={"/job-icon/Discovery-date.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="服務次數"
          src={"/job-icon/Discovery-date.svg"}
        />
      </SwiperSlide>
    </Swiper>
  );
};
const FamousHelperCard = () => {
  const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // 切換收藏狀態
  };
  return (
    <>
      <div className="famous-helper-card d-flex align-items-center">
        <img className="famous-helper-card-img" src="/kitten.jpg" alt="任務" />
        <div className="helper-content ms-2">
          <div className="title size-6">Pet House</div>
          <div className="ranking">
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
          </div>
          <div className="helper-content-info d-flex justify-content-between">
            <div>
              <p className="m-size-7">台中市大甲區</p>
              <p className="m-size-7">
                服務項目：<span>安親寄宿、到府美容</span>
              </p>
              <p className="m-size-7">
                服務時間：<span>周一至周日</span>
              </p>
            </div>
            <img
              src={isFavorite ? "/heart-clicked.svg" : "/heart.svg"}
              alt={isFavorite ? "已收藏" : "未收藏"}
              onClick={toggleFavorite}
            />
          </div>
          <div className="d-flex justify-content-between align-items-end price">
            <div>
              單次<span className="size-6"> NT$140</span>
            </div>
            <button className="size-6 btn-confirm">洽詢</button>
          </div>
        </div>
      </div>
    </>
  );
};
const MobileFamousHelper = () => {
  return (
    <>
      <Carousel
        show={1.5}
        slide={1}
        transition={0.5}
        leftArrow={<AiOutlineLeftCircle />}
        rightArrow={<AiOutlineRightCircle />}
        className="famous-carousel"
        children={[
          <FamousHelperCard />,
          <FamousHelperCard />,
          <FamousHelperCard />,
          <FamousHelperCard />,
        ]}
        // responsive={true}
      >
        {/* <FamousHelperCard />
        <FamousHelperCard />
        <FamousHelperCard />
        <FamousHelperCard />
        <FamousHelperCard /> */}
        {/* <div color="#f27a1a"></div>
        <div color="#d53f8c">
          <FamousHelperCard />
        </div>
        <div color="#16be48">
          <FamousHelperCard />
        </div>
        <div color="#3f51b5">
          <FamousHelperCard />
        </div>
        <img
          src={`https://picsum.photos/id/${Math.floor(
            Math.random() * 200
          )}/300/300`}
        /> */}
      </Carousel>
    </>
  );
};

const SingleHelperCard = () => {
  const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // 切換收藏狀態
  };
  return (
    <>
      <div className="single-card d-flex flex-column align-items-center">
        <img className="single-card-img" src="/kitten.jpg" alt="任務" />
        <div className="helper-content">
          <div className="single-card-title size-6">Pet House</div>
          <div className="ranking d-flex align-items-center mb-1">
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
          </div>
          <div className="single-card-info d-flex justify-content-between">
            <div>
              <p>台中市大甲區</p>
              <p>
                服務項目：<span>安親寄宿</span>
              </p>
              <p>服務時間：周一至周日</p>
            </div>
            <img
              src={isFavorite ? "/heart-clicked.svg" : "/heart.svg"}
              alt={isFavorite ? "已收藏" : "未收藏"}
              onClick={toggleFavorite}
            />
          </div>

          <div className="d-flex justify-content-between align-items-end price">
            <div>
              單次<span className="size-6"> NT$140</span>
            </div>
            <button className="size-6 btn-confirm">洽詢</button>
          </div>
        </div>
      </div>
    </>
  );
};
const MissionHelperList = () => {
  const status = useRWD();
  const arr = Array.from({ length: 12 });
  return (
    <div className="mission-helper-list">
      <div className="search d-flex flex-md-row flex-column justify-content-between align-items-center">
        <RoleSelection />
        <Search />
      </div>
      <div className="filters">
        <MobileFilter />
      </div>

      <div className="d-flex flex-md-row flex-column justify-content-between">
        <section className="famous-helper justify-content-between">
          <p className="famous-helper-title size-5">最熱門小幫手</p>
          <div className="famous-helper-pc d-md-block d-none">
            <FamousHelperCard />
            <FamousHelperCard />
            <FamousHelperCard />
          </div>
          <div className="famous-helper-mobile d-flex d-md-none">
            <MobileFamousHelper />
          </div>
        </section>
        <section className="helper-list d-flex flex-wrap">
          {arr.map((item) => (
            <SingleHelperCard />
          ))}
        </section>
      </div>
    </div>
  );
};

export default MissionHelperList;
// 375 10px編劇 + 44px按鈕 + 321卡片(內編劇20px)
