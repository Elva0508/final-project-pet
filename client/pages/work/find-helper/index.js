import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Filter from "../../../components/job/filter";
import LatestMission from "../../../components/job/latest-mission";
import RoleSelection from "../../../components/job/role-selection";
import { Swiper, SwiperSlide } from "swiper/react";
import useRWD from "@/hooks/useRWD";
import { register } from "swiper/element/bundle";
import { Carousel } from "@trendyol-js/react-carousel";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { BsArrowBarRight, BsFillHeartFill, BsHeart } from "react-icons/bs";
import WorkService from "@/services/work-service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Pagination } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import "animate.css";
register();
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Tune } from "@mui/icons-material";

const Search = ({
  handleSearch,
  placeholder,
  color,
  onClick,
  search,
  setSearch,
  setFilterType,
}) => {
  const rippleBtnRef = useRef(null);
  const handleRipple = () => {
    const btn = rippleBtnRef.current;
    btn.classList.add("ripple");
    setTimeout(() => {
      btn.classList.remove("ripple");
    }, 500); //動畫持續時間結束後移除動畫效果，讓動畫可以重複使用
  };

  return (
    <div className="job-search">
      <input
        type="text"
        placeholder={"搜尋小幫手"}
        value={search}
        onChange={(e) => {
          console.log(e.target.value);
          setSearch(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleRipple();
          handleSearch();
        }}
        ref={rippleBtnRef}
      >
        <BiSearchAlt className="job-search-icon" />
      </button>
    </div>
  );
};
const MobileFilter = ({
  allHelpers,
  setAllHelpers,
  filterType,
  setFilterType,
  order,
  setOrder,
  setPage,
  setTotalRows,
  setCurrentSearch,
}) => {
  const [titleContent, setTitleContent] = useState("服務類型");
  const handleType = (value) => {
    // 改變filterType類型時，清除search值(如果有search值的話filter改變不會重新打API)、page值回到1，重設filter打API改變info
    setPage(1);
    setCurrentSearch(null);
    setFilterType(value);
  };
  const handleOrder = (value, parentValue) => {
    setPage(1);
    setOrder({ value, parentValue });
    WorkService.getOrderHelper(filterType, parentValue, value, 1)
      .then((response) => {
        console.log(response);
        setAllHelpers(response?.data.data);
        setTotalRows(response?.data?.totalRows);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    // useEffect監聽filterType的狀態，透過狀態來更新title的名稱
    switch (filterType) {
      case "all":
        setTitleContent("服務類型");
        break;
      case "feed":
        setTitleContent("到府代餵");
        break;
      case "house":
        setTitleContent("安親寄宿");
        break;
      case "beauty":
        setTitleContent("到府美容");
        break;
    }
  }, [filterType]);

  return (
    <Swiper slidesPerView="auto" className="mobile-filter">
      <SwiperSlide>
        <Filter
          items={{
            title: titleContent,
            value: "type",
            children: [
              { label: "到府代餵", value: "feed" },
              { label: "安親寄宿", value: "house" },
              { label: "到府美容", value: "beauty" },
            ],
          }}
          src={"/job-icon/plus-service.svg"}
          onClick={handleType}
          order={order}
          filterType={filterType}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={{
            title: "服務費用",
            value: "price",
            children: [
              { label: "由高到低", value: "DESC" },
              { label: "由低到高", value: "ASC" },
            ],
          }}
          src={"/job-icon/Heart-price.svg"}
          onClick={handleOrder}
          order={order}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={{
            title: "熱門程度",
            value: "hot",
            children: [
              { label: "由高到低", value: "DESC" },
              { label: "由低到高", value: "ASC" },
            ],
          }}
          src={"/job-icon/Discovery-date.svg"}
          onClick={handleOrder}
          order={order}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={{
            title: "服務評價",
            value: "rating",
            children: [
              { label: "由高到低", value: "DESC" },
              { label: "由低到高", value: "ASC" },
            ],
          }}
          src={"/job-icon/Discovery-date.svg"}
          onClick={handleOrder}
          order={order}
        />
      </SwiperSlide>
    </Swiper>
  );
};
const FamousHelperCard = ({ ...helper }) => {
  const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏
  const [isFavHovered, setIsFavHovered] = useState(false);
  const service = [
    { label: "到府代餵", value: parseInt(helper.feed_service) },
    { label: "安親寄宿", value: parseInt(helper.house_service) },
    { label: "到府美容", value: parseInt(helper.beauty_service) },
  ];
  const handleFav = (e) => {
    if (!isFavorite) {
      e.currentTarget.classList.add("animate__animated", "animate__heartBeat");
      setIsFavorite(true);
    } else {
      e.currentTarget.classList.remove(
        "animate__animated",
        "animate__heartBeat"
      );
      setIsFavorite(false);
    }
  };
  return (
    <>
      <div
        className={`famous-helper-card d-flex align-items-center ${
          isFavorite ? "" : "active-fav-in-fam-card"
        }`}
      >
        <div className="img-wrapper">
          <img
            className="famous-helper-card-img"
            src={helper?.cover_photo}
            alt="任務"
          />
        </div>

        <div className="helper-content ms-2">
          <div className="title size-6">{helper?.name}</div>
          <div className="ranking d-flex">
            <Rating
              name="half-rating-read"
              value={parseFloat(helper?.average_star)}
              precision={0.5}
              readOnly
              emptyIcon={<StarIcon style={{ opacity: 0.35 }} />}
            />
            <span className="ms-1 size-7">({helper.review_count})</span>
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
            <div className="fav-icon">
              {isFavHovered || isFavorite ? (
                <BsFillHeartFill
                  className="fav-icon-fill"
                  onClick={handleFav}
                  onMouseEnter={() => {
                    setIsFavHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsFavHovered(false);
                  }}
                />
              ) : (
                <BsHeart
                  className="fav-icon-hollow"
                  onMouseEnter={() => {
                    setIsFavHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsFavHovered(false);
                  }}
                />
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end price">
            <div>
              單次<span className="size-6"> NT$140</span>
            </div>
            <button className="size-6 animate-button-one">
              <Link href={`/work/find-helper/${helper.user_id}`}>洽詢</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const MobileFamousHelper = ({ famous, setFamous }) => {
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: true,
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            background-color: #FFFDFB;
            width:32px;
            height:32px;
            border-radius: 50%;
            color: #F8CB9F;
            box-shadow: 0 0 9px rgba(0, 0, 0, 0.5);
            background-position: center;
            background-size: 18px;
            background-repeat: no-repeat; 
            // opacity:0.5;          
          }
          
          .swiper-button-prev {
            background-image: url("/caret-left.svg");

          }
          .swiper-button-next {
            background-image: url("/caret-right.svg");    
          }
          .swiper-button-next svg,
          .swiper-button-prev svg {
            color: transparent;
          }
      `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);
  return (
    <>
      {/* <Slider {...settings}>
          {famous.map((helper) => (
            <FamousHelperCard {...helper} />
          ))}
        </Slider> */}
      <>
        <swiper-container
          ref={swiperRef}
          navigation="true"
          space-between="20"
          slides-per-view="auto"
          next-el=".custom-next-button"
          prev-el=".custom-prev-button"
          init="false"
        >
          {famous.map((helper) => (
            <swiper-slide>
              <FamousHelperCard {...helper} />
            </swiper-slide>
          ))}
        </swiper-container>
      </>
    </>
  );
};

export const MobileLatestMission = () => {};

const SingleHelperCard = ({ ...helper }) => {
  const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏
  const [isFavHovered, setIsFavHovered] = useState(false);

  const service = [
    { label: "到府代餵", value: parseInt(helper.feed_service) },
    { label: "安親寄宿", value: parseInt(helper.house_service) },
    { label: "到府美容", value: parseInt(helper.beauty_service) },
  ];
  const handleFav = (e) => {
    if (!isFavorite) {
      e.currentTarget.classList.add("animate__animated", "animate__heartBeat");
      setIsFavorite(true);
    } else {
      e.currentTarget.classList.remove(
        "animate__animated",
        "animate__heartBeat"
      );
      setIsFavorite(false);
    }
  };
  const servicePrice = [];
  console.log(service);
  return (
    <>
      <div
        className={`single-card d-flex flex-column align-items-center ${
          isFavorite ? "" : "active-fav-in-card"
        }`}
      >
        <img
          className="single-card-img"
          src={helper.cover_photo}
          alt="貓頭貼"
        />
        <div className="single-card-content">
          <div className="single-card-title size-6">{helper.name}</div>
          <div className="ranking d-flex align-items-center mb-1">
            <Rating
              name="half-rating-read"
              value={parseFloat(helper.average_star)}
              precision={0.5}
              readOnly
              emptyIcon={<StarIcon style={{ opacity: 0.35 }} />}
            />

            <span className="ms-1 size-7">
              ({helper.review_count === null ? "0" : helper.review_count})
            </span>
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

            <div className="fav-icon">
              {isFavHovered || isFavorite ? (
                <BsFillHeartFill
                  className="fav-icon-fill"
                  onClick={handleFav}
                  onMouseEnter={() => {
                    setIsFavHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsFavHovered(false);
                  }}
                />
              ) : (
                <BsHeart
                  className="fav-icon-hollow"
                  onMouseEnter={() => {
                    setIsFavHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsFavHovered(false);
                  }}
                />
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-end price">
            <div>
              單次<span className="size-6"> NT$140</span>
            </div>
            <button className="size-6 animate-button-one">
              <Link href={`/work/find-helper/${helper.user_id}`}>洽詢</Link>
            </button>
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
  const [filterType, setFilterType] = useState("all");
  const [order, setOrder] = useState(null);
  const [search, setSearch] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [currentPage, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(18);
  useEffect(() => {
    if (!currentSearch) {
      setPage(1);
      if (order) {
        WorkService.getOrderHelper(
          filterType,
          order.parentValue,
          order.value,
          currentPage
        )
          .then((response) => {
            console.log(response);
            setAllHelpers(response?.data?.data);
            setTotalRows(response?.data?.totalRows);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        WorkService.getAllHelpers(filterType, 1)
          .then((res) => {
            setAllHelpers(res.data.data);
            setTotalRows(res?.data?.totalRows);
          })
          .catch((e) => {
            console.log(e);
          });
      }
      WorkService.getFamousHelper(filterType)
        .then((res) => {
          setFamous(res?.data.famous);
          // console.log(res?.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [filterType]);

  useEffect(() => {
    if (order) {
      WorkService.getOrderHelper(
        filterType,
        order.parentValue,
        order.value,
        currentPage
      )
        .then((response) => {
          console.log(response);
          setAllHelpers(response?.data?.data);
          setTotalRows(response?.data?.totalRows);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      WorkService.getAllHelpers(filterType, currentPage)
        .then((res) => {
          setAllHelpers(res.data.data);
          setTotalRows(res?.data?.totalRows);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentPage]);

  const handleBack = () => {
    setFilterType("all");
    setPage(1);
    setOrder(null);
    setCurrentSearch(null);
    WorkService.getAllHelpers(filterType, currentPage)
      .then((res) => {
        setAllHelpers(res?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const changePage = (page) => {
    console.log("Page: ", page);
    setPage(page);
  };
  const handleSearch = () => {
    WorkService.getSearchHelper(search)
      .then((response) => {
        // 查詢時，清除各種state設定值
        // console.log(response);
        setAllHelpers(response?.data.data);
        setPage(1);
        setTotalRows(response?.data?.totalRows);
        setCurrentSearch(search);
        setSearch("");
        setFilterType("all");
        setOrder(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="mission-helper-list container">
      <nav className="breadcrumb-wrapper my-4 " aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link href="/" className="active-hover">
              首頁
            </Link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <Link
              href="/work/find-helper"
              onClick={handleBack}
              className="active-hover"
            >
              小貓上工(找幫手)
            </Link>
          </li>
          {currentSearch ? (
            <>
              <li class="breadcrumb-item" aria-current="page">
                搜尋結果
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {currentSearch}
              </li>
            </>
          ) : (
            <>
              <li class="breadcrumb-item active" aria-current="page">
                {filterType === "feed"
                  ? "到府代餵"
                  : filterType === "house"
                  ? "安親寄宿"
                  : filterType === "beauty"
                  ? "到府美容"
                  : "所有"}
              </li>
            </>
          )}
        </ol>
      </nav>

      <div className="search d-flex flex-md-row flex-column justify-content-between align-items-center ">
        <RoleSelection defaultActive="helper" />
        <Search
          placeholder={"搜尋小幫手"}
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className="filters">
        <MobileFilter
          allHelpers={allHelpers}
          setAllHelpers={setAllHelpers}
          filterType={filterType}
          setFilterType={setFilterType}
          order={order}
          setOrder={setOrder}
          setPage={setPage}
          setTotalRows={setTotalRows}
          setCurrentSearch={setCurrentSearch}
        />
      </div>
      <div className="mb-2">
        <p className="size-6 d-flex justify-content-end align-items-center me-2">
          {order?.parentValue === "price" &&
            (order?.value === "ASC" ? (
              <>
                服務費用 <BsArrowBarRight /> 由低到高
              </>
            ) : (
              <>
                服務費用 <BsArrowBarRight /> 由高到低
              </>
            ))}
        </p>
        <p className="size-6 d-flex justify-content-end align-items-center me-2 ">
          {order &&
            order?.parentValue === "hot" &&
            (order?.value === "ASC" ? (
              <>
                熱門程度 <BsArrowBarRight /> 由低到高
              </>
            ) : (
              <>
                熱門程度 <BsArrowBarRight /> 由高到低
              </>
            ))}
        </p>
        <p className="size-6 d-flex justify-content-end align-items-center me-2 ">
          {order?.parentValue === "rating" &&
            (order?.value === "ASC" ? (
              <>
                服務評價 <BsArrowBarRight /> 由低到高
              </>
            ) : (
              <>
                服務評價 <BsArrowBarRight /> 由高到低
              </>
            ))}
        </p>
      </div>

      <div className="d-flex flex-lg-row flex-column align-items-start justify-content-between gap-4">
        <section className="famous-helper">
          <p className="famous-helper-title size-5">熱門小幫手</p>
          <div className="famous-helper-pc d-lg-block d-none">
            {famous.map((helper) => (
              <FamousHelperCard {...helper} />
            ))}
          </div>
          <div className="famous-helper-mobile d-block d-lg-none">
            <MobileFamousHelper famous={famous} setFamous={setFamous} />
          </div>
        </section>
        <section className="helper-list d-flex flex-wrap">
          {allHelpers?.map((helper) => (
            <SingleHelperCard {...helper} />
          ))}
        </section>
      </div>
      <Pagination
        current={currentPage}
        total={totalRows}
        pageSize="18"
        showSizeChanger={false}
        rootClassName="cos-pagination"
        onChange={changePage}
      />
    </div>
  );
};

export default MissionHelperList;
