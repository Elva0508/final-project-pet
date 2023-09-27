import React, { useEffect, useState, Component } from "react";
import Link from "next/link";
import Filter from "../../../components/job/filter";
import LatestMission from "../../../components/job/latest-mission";
import RoleSelection from "../../../components/job/role-selection";
import Search from "../../../components/job/search";
import { Swiper, SwiperSlide } from "swiper/react";
import useRWD from "@/hooks/useRWD";
import { register } from "swiper/element/bundle";
import { Carousel } from "@trendyol-js/react-carousel";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import Pagination from "@/components/pagination";
import WorkService from "@/services/work-service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
const FamousHelperCard = ({ ...helper }) => {
  const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏
  const service = [
    { label: "到府代餵", value: parseInt(helper.feed_service) },
    { label: "安親寄宿", value: parseInt(helper.home_service) },
    { label: "到府美容", value: parseInt(helper.beauty_service) },
  ];
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // 切換收藏狀態
  };
  return (
    <>
      <div className="famous-helper-card d-flex align-items-center">
        <img
          className="famous-helper-card-img"
          src={helper?.cover_photo}
          alt="任務"
        />
        <div className="helper-content ms-2">
          <div className="title size-6">{helper?.name}</div>
          <div className="ranking">
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <span className="ms-2 size-7">({helper.review_count})</span>
          </div>
          <div className="helper-content-info d-flex justify-content-between">
            <div>
              <p className="m-size-7">{helper?.service_county}</p>
              <p className="m-size-7">
                服務項目：
                {service
                  .filter((item) => item.value != 0)
                  .map((item, index, arr) =>
                    index < arr.length - 1 ? (
                      <span>{item.label}、</span>
                    ) : (
                      <span>{item.label}</span>
                    )
                  )}
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
const MobileFamousHelper = ({ famous, setFamous }) => {
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    nextArrow: <AiOutlineRightCircle />,
    prevArrow: <AiOutlineLeftCircle />,
    responsive: [
      {
        breakpoint: 569,
        settings: {
          slidesToShow: 1.2,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      {/* <Carousel
        show={1.5}
        slide={1}
        transition={0.5}
        leftArrow={<AiOutlineLeftCircle />}
        rightArrow={<AiOutlineRightCircle />}
        className="famous-carousel"

        // // responsive={true}
      >
        {famous.map((helper) => (
          <FamousHelperCard {...helper} />
        ))}
        <FamousHelperCard />
        <FamousHelperCard />
        <FamousHelperCard />
      </Carousel> */}
      <div>
        <Slider {...settings}>
          {famous.map((helper) => (
            <FamousHelperCard {...helper} />
          ))}
        </Slider>
      </div>
    </>
  );
};

const SingleHelperCard = ({ ...helper }) => {
  const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // 切換收藏狀態
  };
  const service = [
    { label: "到府代餵", value: parseInt(helper.feed_service) },
    { label: "安親寄宿", value: parseInt(helper.home_service) },
    { label: "到府美容", value: parseInt(helper.beauty_service) },
  ];

  const servicePrice = [];
  return (
    <>
      <div className="single-card d-flex flex-column align-items-center col-4">
        <img
          className="single-card-img"
          src={helper.cover_photo}
          alt="貓頭貼"
        />
        <div className="single-card-content">
          <div className="single-card-title size-6">{helper.name}</div>
          <div className="ranking d-flex align-items-center mb-1">
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
          </div>
          <div className="single-card-info d-flex justify-content-between">
            <div>
              <p className="m-size-7">{helper.service_county}</p>
              <p className="service-items m-size-7">
                服務項目：
                {service
                  .filter((item) => item.value != 0)
                  .map((item, index, arr) =>
                    index < arr.length - 1 ? (
                      <span>{item.label}、</span>
                    ) : (
                      <span>{item.label}</span>
                    )
                  )}
              </p>
              <p className="service-time m-size-7">
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
const MissionHelperList = () => {
  const arr = Array.from({ length: 12 });
  const [allHelpers, setAllHelpers] = useState([]);
  const [famous, setFamous] = useState([]);
  useEffect(() => {
    WorkService.getAllHelpers()
      .then((res) => {
        setAllHelpers(res.data.data);
        // console.log(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    WorkService.getFamousHelper()
      .then((res) => {
        setFamous(res?.data.famous);
        // console.log(res?.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // WorkService.getCat()
    //   .then((res) => {
    //     const arr = [];
    //     res.data.photos.map((item) => {
    //       arr.push(item.src.tiny);
    //     });
    //     console.log(arr);
    //   })
    //   .catch((e) => console.log(e));
  }, []);
  return (
    <div className="mission-helper-list">
      <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link href="#">首頁</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            小貓上工-小幫手總覽
          </li>
        </ol>
      </nav>

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
            {famous.map((helper) => (
              <FamousHelperCard {...helper} />
            ))}
          </div>
          <div className="famous-helper-mobile d-block d-md-none">
            <MobileFamousHelper famous={famous} setFamous={setFamous} />
          </div>
        </section>
        <section className="helper-list d-flex row flex-wrap">
          {allHelpers?.map((helper) => (
            <SingleHelperCard {...helper} />
          ))}
          <Pagination />
        </section>
      </div>
    </div>
  );
};

export default MissionHelperList;
