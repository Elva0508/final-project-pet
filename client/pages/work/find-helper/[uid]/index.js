import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { LuCalendarClock } from "react-icons/lu";
import { BiMessageRounded } from "react-icons/bi";
import { PiPawPrintFill } from "react-icons/pi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/Ci";
import Footer from "@/components/footer";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Scrollbar, Navigation } from "swiper/modules";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import workService from "@/services/work-service";
import { GoStarFill } from "react-icons/go";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "@/context/fakeAuthContext";
import { useHelper } from "@/context/helperContext";
import { Pagination } from "antd";
// import { Button, Modal } from "antd";
import {
  DatePicker,
  Modal,
  Button,
  RadioGroup,
  Radio,
  Empty,
  Select,
} from "@douyinfe/semi-ui";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";

import dayjs from "dayjs";
// register Swiper custom elements
register();
const ImageSwiper = ({ images }) => {
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
            width:50px;
            height:50px;
            border-radius: 50%;
            color: #F8CB9F;
            box-shadow: 0 0 9px rgba(0, 0, 0, 0.5);
            background-position: center;
            background-size: 25px;
            background-repeat: no-repeat;
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
      <swiper-container
        ref={swiperRef}
        navigation="true"
        space-between="20"
        slides-per-view="auto"
        next-el=".custom-next-button"
        prev-el=".custom-prev-button"
        init="false"
      >
        {images.map((image, index) => (
          <swiper-slide>
            <img src={`${image.file_path}`} />
          </swiper-slide>
        ))}
      </swiper-container>
    </>
  );
};

// const ReviewSwiper = ({ reviews, setReviews }) => {
//   const [transReview, setTransReview] = useState(reviews);

//   const router = useRouter();
//   const { uid } = router.query;
//   const sliderRef = useRef(null);

//   let fiveStar = 0;
//   let fourStar = 0;
//   let threeStar = 0;
//   let twoStar = 0;
//   let oneStar = 0;
//   reviews.map((review) => {
//     switch (review.star_rating) {
//       case 5:
//         fiveStar++;
//         break;
//       case 4:
//         fourStar++;
//         break;
//       case 3:
//         threeStar++;
//         break;
//       case 2:
//         twoStar++;
//         break;
//       case 1:
//         oneStar++;
//         break;
//     }
//   });
//   const settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     // nextArrow: <img src="/caret-right.svg" className="next-arrow" />,
//     // prevArrow: <img src="/caret-left.svg" className="prev-arrow" />,
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 2.5,
//           slidesToScroll: 2,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 1048,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 876,
//         settings: {
//           slidesToShow: 1.5,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 694,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="review-card-group">
//         <div className="size-5">服務評價</div>
//         <p className="m-size-7">
//           (共<span>{reviews.length}</span>則相關評論)
//         </p>

//         {filterReview.length > 0 ? (
//           <Slider {...settings} ref={sliderRef}>
//             {filterReview.map((review) => (
//               <div className="review-card" style={{ width: "350px" }}>
//                 <div className="review-card-head d-flex justify-content-center align-items-center">
//                   <img
//                     className="review-card-avatar"
//                     src={`${review.cover_photo}`}
//                   />
//                   <div className="review-card-info d-flex flex-column justify-content-between ps-2">
//                     <div className="d-flex justify-content-between">
//                       <div className="username size-6">{review.name}</div>
//                       <div className="date size-7">{review.review_date}</div>
//                     </div>
//                     <div className="ranking mb-2">
//                       <Rating
//                         name="half-rating-read"
//                         value={review.star_rating}
//                         readOnly
//                         precision={0.5}
//                         emptyIcon={<StarIcon style={{ opacity: 0.35 }} />}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="review-card-body mt-3">
//                   {review.review_content}
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         ) : (
//           ""
//         )}
//       </div>
//     </>
//   );
// };

// export const HelperDetailSticky = () => {

//   const { isAuthenticated } = useAuth();
//   const router = useRouter();
//   const uid = parseInt(router.query.uid);
//   // console.log(router.query);
//   // useEffect(() => {
//   //   // 初次渲染時載入儲存在localStorage的收藏
//   //   if (localStorage.getItem("helperFav"))
//   //     setCollection(JSON.parse(localStorage.getItem("helperFav")));
//   // }, []);
//   useEffect(() => {
//     // 更新localStorage的收藏
//     if (collection.length === 0) {
//       localStorage.removeItem("helperFav");
//     } else {
//       localStorage.setItem("helperFav", JSON.stringify(collection));
//     }
//   }, [collection]);
//   // const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏
//   // const toggleFavorite = () => {
//   //   setIsFavorite(!isFavorite); // 切換收藏狀態
//   // };

//   return (
//     <section className="get-price d-flex justify-content-around align-items-center">

//       <div className="d-flex justify-content-around align-items-center">
//         <p className="get-price-number size-5 me-2">
//           <span>NT$</span>
//           <span>500</span>/次
//         </p>
//         {/* <Quotation /> */}
//       </div>
//     </section>
//   );
// };
const Quotation = () => {
  const router = useRouter();
  const { uid } = router.query;
  const today = dayjs();
  const [visible, setVisible] = useState(false);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [serviceList, setServiceList] = useState([]);
  const [petsName, setPetsName] = useState(null);
  const showDialog = () => {
    setVisible(true);
  };
  const handleSubmit = () => {
    setVisible(false);
    const user = 1;
    const requestData = {
      customer_id: user,
      startDay,
      endDay,
      days,
      pet_id: petsValue,
      helper_id: uid,
      service_type: serviceType.value,
      time,
      frequency,
      note,
      location,
      subtotal: serviceType.price,
    };
    workService
      .createReqOrder(requestData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          setTime(1);
          setFrequency(1);
          setDays(0);
          setStartDay(null);
          setEndDay(null);
          setPetsValue(null);
          setServiceType({});
          setNote("");
          setLocation("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };

  const [time, setTime] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [days, setDays] = useState(0);
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [petsValue, setPetsValue] = useState(null);
  const [serviceType, setServiceType] = useState({});
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [pets, setPets] = useState([]);
  useEffect(() => {
    if (startDay && endDay) {
      const start = dayjs(startDay);
      const end = dayjs(endDay);
      setDays(end.diff(start, "day") + 1);
      console.log(days);
    } else {
      setDays(0);
    }
  }, [startDay, endDay]);

  useEffect(() => {
    workService
      .getHelperDetail(uid)
      .then((response) => {
        const info = response?.data?.data.profile[0];
        setProfile(info);

        let serviceArr = [{ value: "null", label: "請選擇服務類型", price: 0 }];
        if (info.feed_service) {
          serviceArr.push({
            value: "feed",
            label: "到府代餵",
            price: info.feed_price,
          });
        }
        if (info.beauty_service) {
          serviceArr.push({
            value: "beauty",
            label: "到府美容",
            price: info.beauty_price,
          });
        }
        if (info.house_service) {
          serviceArr.push({
            value: "house",
            label: "安親寄宿",
            price: info.house_price,
          });
        }

        setServiceList(serviceArr);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [uid]);
  useEffect(() => {
    workService
      .getPetInfo(uid)
      .then((response) => {
        setPets(response?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleDisabledStart = (date) => {
    if (dayjs(date).isBefore(today)) {
      return true;
    }
  };
  const handleDisabledEnd = (date) => {
    if (dayjs(date).isBefore(today)) {
      return true;
    }
    if (startDay && dayjs(date).isBefore(startDay)) {
      return true;
    }
  };
  const handleTime = (e) => {
    const position = e.target.getAttribute("position");

    if (position === "left") {
      setTime((prevTime) => {
        return prevTime <= 1 ? prevTime : prevTime - 1;
      });
    }
    if (position === "right") {
      setTime((prevTime) => {
        return prevTime >= 10 ? prevTime : prevTime + 1;
      });
    }
  };
  const handleFrequency = (e) => {
    const position = e.target.getAttribute("position");
    if (position === "left") {
      setFrequency((prevFrequency) => {
        return prevFrequency <= 1 ? prevFrequency : prevFrequency - 1;
      });
    }
    if (position === "right") {
      setFrequency((prevFrequency) => {
        return prevFrequency >= 10 ? prevFrequency : prevFrequency + 1;
      });
    }
  };
  return (
    <div>
      <button
        onClick={showDialog}
        className="get-price-btn d-flex align-items-center justify-content-center"
      >
        <div className="icon-wrapper">
          <LuCalendarClock className="get-price-icon" />
        </div>

        <span>立即預約</span>
      </button>

      <Modal
        title="預約細節"
        visible={visible}
        closable={false}
        maskClosable={false}
        onOk={handleSubmit}
        afterClose={handleAfterClose} //>=1.16.0
        onCancel={handleCancel}
        closeOnEsc={true}
        className="req-quotation"
        footer={
          <div className="req-quotation-footer">
            <Button type="tertiary" onClick={handleCancel}>
              取消
            </Button>
            <button className="btn-confirm" onClick={handleSubmit}>
              確認
            </button>
          </div>
        }
      >
        <div className="body-item d-flex justify-content-between align-items-center">
          <p className="size-6">寵物</p>
          <Select
            defaultValue="請選擇寵物"
            className="pet-list-btn"
            dropdownClassName="pet-list-dropdown"
          >
            {pets.map((pet) => (
              <Select.Option value={pet.pet_id} className="pet-list">
                <img className="pet-photo" src={pet.image}></img>
                <p className="size-6 ms-2">{pet.name}</p>
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="body-item d-flex justify-content-between align-items-center">
          <p className="size-6">開始日期</p>
          <DatePicker
            open={startDateOpen}
            autoSwitchDate={false}
            value={startDay}
            dropdownClassName="req-quotation-date"
            position="bottomRight"
            onChange={(date, dateString) => {
              setStartDay(dateString);
              setStartDateOpen(false);
              console.log(startDay, endDay);
              if (endDay && dayjs(endDay).isBefore(dateString)) {
                console.log("要清掉endDay");
                setEndDay(undefined);

                console.log(endDay);
              }
              setEndDateOpen(true);
            }}
            disabledDate={handleDisabledStart}
            triggerRender={({ placeholder }) => (
              <label
                onClick={() => {
                  setEndDateOpen(false);
                  setStartDateOpen(!startDateOpen);
                }}
              >
                {startDay || "選擇開始日期"}
              </label>
            )}
          />
        </div>
        <div className="body-item d-flex justify-content-between align-items-center">
          <p className="size-6">結束日期</p>
          <DatePicker
            open={endDateOpen}
            autoSwitchDate={false}
            value={endDay}
            dropdownClassName="dateRangeTest"
            position="bottomRight"
            onChange={(date, dateString) => {
              setEndDay(dateString);
              setEndDateOpen(false);
            }}
            disabledDate={handleDisabledEnd}
            triggerRender={({ placeholder }) => (
              <label
                onClick={() => {
                  setStartDateOpen(false);
                  setEndDateOpen(!endDateOpen);
                }}
              >
                {endDay || "選擇結束日期"}
              </label>
            )}
          />
        </div>
        <div className="body-item d-flex justify-content-between align-items-center">
          <p className="size-6">服務類型</p>
          <Select
            style={{ width: 150 }}
            onChangeWithObject
            optionList={serviceList}
            className="service-type_list"
            dropdownClassName="service-type-dropdown"
            placeholder="請選擇服務類型"
            defaultValue={serviceList[0]}
            onChange={(value) => {
              console.log(value);
              setServiceType(value);
            }}
          ></Select>
        </div>
        <div className="body-item d-flex justify-content-between align-items-center">
          <p className="size-6">服務時間</p>
          <div className="d-flex align-items-center">
            <CiCircleChevLeft
              position="left"
              className="icon"
              onClick={handleTime}
            />
            <div>{time * 30} 分鐘</div>
            <CiCircleChevRight
              position="right"
              className="icon"
              onClick={handleTime}
            />
          </div>
        </div>
        <div className="body-item d-flex justify-content-between align-items-center">
          <div className="size-6">每天次數</div>
          <div className="d-flex align-items-center">
            <CiCircleChevLeft
              position="left"
              className="icon"
              onClick={handleFrequency}
            />
            <div>{frequency} 次</div>
            <CiCircleChevRight
              position="right"
              className="icon"
              onClick={handleFrequency}
            />
          </div>
        </div>
        <div className="body-item d-flex justify-content-between align-items-center">
          <p className="size-6">地點</p>
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="body-item d-flex flex-column justify-content-between">
          <p className="size-6 mb-2">備註</p>
          <textarea
            placeholder="輸入備註或是您毛小孩的需求與個性狀況"
            onChange={(e) => {
              console.log(e.target.value);
              setNote(e.target.value);
            }}
          />
        </div>
        <div className="divider my-2"></div>
        <div className="col-md-6 col-8 offset-md-6 offset-4 settlement-amount ">
          <div className="d-flex justify-content-between">
            <p className="">小計</p>
            <p>
              NT$<span>{serviceType?.price || 0}</span>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>天數</p>
            <p>x{days}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>服務時間(每30分鐘)</p>
            <p>x{time}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>每天次數</p>
            <p>x{frequency}</p>
          </div>
          <div className="divider"></div>
          <div className="d-flex justify-content-between">
            <p>總金額</p>
            <p>
              NT$
              <span>{serviceType?.price * days * time * frequency || 0}</span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const PetInfo = ({ petsValue, setPetsValue, petsName, setPetsName }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { uid } = router.query;

  const [isCreate, setIsCreate] = useState(false);
  let tempValue, tempName;

  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    setPetsValue(tempValue);
    setPetsName(tempName);
  };
  const handleCancel = () => {
    setVisible(false);
    setPetsValue(null);
    setPetsName(null);
  };
  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };

  return (
    <>
      <label
        onClick={() => {
          if (isAuthenticated) {
            showDialog();
          } else {
            alert("請先登入會員");
            router.push("/member/login");
          }
        }}
      >
        {petsName || "選擇寵物"}
      </label>

      <Modal
        // title="基本对话框"
        visible={visible}
        centered={true}
        closable={false}
        afterClose={handleAfterClose} //>=1.16.0
        onOk={handleOk}
        onCancel={handleCancel}
        closeOnEsc={true}
        className="pet-info-modal"
        footer={
          <div className="pet-info-modal-footer">
            <Button type="tertiary" onClick={handleCancel}>
              清除
            </Button>
            <button className="btn-confirm" onClick={handleOk}>
              選擇
            </button>
            {/* <button
              className="btn btn-info"
              onClick={() => {
                setIsCreate(true);
              }}
            >
              新增寵物
            </button> */}
          </div>
        }
      >
        {isCreate ? (
          <>
            <div className="d-flex flex-column">
              <p>毛小孩名字</p>
              <input type="text" />
            </div>
            <div className="d-flex flex-column">
              <p>健康狀況描述</p>
              <input type="text" />
            </div>
            <div className="d-flex flex-column">
              <p>出生年</p>
              <input type="number" />
            </div>
            <div className="d-flex flex-column">
              <p>性別</p>
              <input type="radio" />
            </div>
            <div className="d-flex flex-column">
              <p>是否結紮</p>
              <input type="radio" />
            </div>
            <div className="d-flex flex-column">
              <p>是否規律施打疫苗</p>
              <input type="radio" />
            </div>
          </>
        ) : (
          <>
            {pets.length === 0 ? (
              <Empty
                image={
                  <IllustrationConstruction
                    style={{ width: 150, height: 150 }}
                  />
                }
                darkModeImage={
                  <IllustrationConstructionDark
                    style={{ width: 150, height: 150 }}
                  />
                }
                title={"暫無內容"}
                description="請添加您的寵物資訊。"
              />
            ) : (
              <RadioGroup
                type="pureCard"
                direction="horizontal"
                aria-label="選擇寵物"
                defaultValue={petsValue}
                onChange={(e) => {
                  console.log(e.target);
                  tempValue = e.target.value;
                  tempName = e.target.children[1].props.children;
                }}
              >
                {pets.map((pet) => (
                  <Radio
                    value={pet.pet_id}
                    // extra="Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统"
                  >
                    <img className="pet-photo" src={pet.image}></img>
                    <p className="size-6">{pet.name}</p>
                  </Radio>
                ))}
              </RadioGroup>
            )}
          </>
        )}
      </Modal>
    </>
  );
};
const HelperDetail = () => {
  const router = useRouter();
  const uid = parseInt(router.query.uid);
  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const { isAuthenticated, userId } = useAuth();
  const [currentPage, setPage] = useState(1);
  const [filterReview, setFilterReview] = useState([]);
  const [star, setStar] = useState("all");
  const contentRef = useRef();
  const [totalRows, setTotalRows] = useState(null);
  const { collection, setCollection } = useHelper();
  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  // const uid = parseInt(router.query.uid);
  const handleFav = (e) => {
    if (isAuthenticated) {
      if (!collection.find((item) => item === uid)) {
        setCollection((prev) => {
          return [...prev, uid];
        });
      } else {
        setCollection((prev) => {
          const newArr = prev.filter((item) => item !== uid);
          console.log(newArr);
          return newArr;
        });
      }
    } else {
      alert("請先登入會員");
      router.push("/member/login");
    }
  };

  const handleChangeStar = (e) => {
    if (e.target.value) {
      // 有value，代表點在button上而不是button外的div上
      setStar(e.target.value);

      // 將HTML Collection變成可迭代的陣列，先移除所有btn上的樣式，再加樣式在目前點擊的btn上
      const children = e.currentTarget.children;
      let childrenArr = Array.from(children);
      childrenArr.forEach((btn) => {
        btn.classList.remove("filter-btns-focus");
      });
      console.log(e.currentTarget.children);
      e.target.classList.add("filter-btns-focus");
    }
  };
  const changePage = (page) => {
    console.log("Page: ", page);
    setPage(page);
  };
  useEffect(() => {
    const handleScroll = () => {
      const width = window.innerWidth;
      console.log(width);
      const leftBlock = document.querySelector(".left-block");
      if (width > 992) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const distanceToBottom = documentHeight - (scrollY + windowHeight);
        console.log(scrollY, windowHeight, documentHeight);
        // console.log(leftBlock);
        if (distanceToBottom < 145) {
          leftBlock.style.position = "relative";
          leftBlock.style.top = `${scrollY - 325}px`;
        } else {
          leftBlock.style.position = "sticky";
          leftBlock.style.top = "10px";
        }
      } else {
        leftBlock.style.position = "static";
      }
    };

    // 添加事件
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    // 移除事件
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (uid) {
      workService
        .getHelperDetail(uid, currentPage)
        .then((response) => {
          const data = response?.data?.data;
          console.log(response);
          setTotalRows(data.allReviews?.totalRows);
          setProfile(data.profile[0]);
          setReviews(data.reviews);
          setImages(data.images);

          // 計算每個星數的評論數
          data.allReviews?.result.map((review) => {
            switch (parseInt(review.star_rating)) {
              case 5:
                setFiveStar((pre) => {
                  console.log(pre);
                  return pre + 1;
                });

                break;
              case 4:
                setFourStar((pre) => {
                  return pre + 1;
                });
                break;
              case 3:
                setThreeStar((pre) => {
                  return pre + 1;
                });
                break;
              case 2:
                setTwoStar((pre) => {
                  return pre + 1;
                });
                break;
              case 1:
                setOneStar((pre) => {
                  return pre + 1;
                });
                break;
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [uid]);

  useEffect(() => {
    if (profile?.job_description) {
      contentRef.current.innerHTML = profile.job_description;
    }
  }, [profile]);
  useEffect(() => {
    console.log(isAuthenticated);
  }, []);

  useEffect(() => {
    if (uid) {
      workService
        .getFilterReview(uid, star)
        .then((response) => {
          console.log(response.data);
          console.log(response.data.reviews);
          setFilterReview(response.data.reviews);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [uid, star]);

  return (
    <>
      <div className="helper-detail container">
        <div className="d-flex row align-items-start">
          <section className="left-block col-12 col-lg-3 flex-column justify-content-center align-items-center">
            <div className="avatar">
              <img src={profile.cover_photo} />
            </div>
            <div className="profile row justify-content-center justify-content-md-start">
              <div className="size-5 m-size-5 username col-12 text-center my-2">
                {profile.name}
              </div>
              <hr className="profile-divider" />
              <div className="profile-info">
                <p className="intro size-6 size-6">關於我</p>
                <p className="intro size-7 size-7">{profile.Introduction}</p>
              </div>
              <div className="profile-info">
                <p className="intro size-6">我的服務內容</p>
                <p className="intro size-7">到府代餵、安親寄宿(要連資料庫)</p>
              </div>
              <div className="profile-info">
                <p className="intro size-6">我的服務時間</p>
                <p className="intro size-7">日、一、二、三、四、五、六</p>
              </div>
              <div className="profile-info">
                <p className="intro size-6">我的服務地區</p>
                <p className="intro size-7">{profile.service_county}</p>
              </div>

              <div className="left-block-btns-group pc d-none d-lg-flex">
                <div className="d-flex">
                  <button className="btn-message">
                    <BiMessageRounded />
                    <span>傳送訊息</span>
                  </button>
                  <Quotation />
                </div>

                <button className="heart-icon" onClick={handleFav}>
                  {collection.find((item) => item === uid) ? (
                    <>
                      <FaHeart className="fill-icon" />
                      <span>取消收藏</span>
                    </>
                  ) : (
                    <>
                      <FaRegHeart />
                      <span>加入收藏</span>
                    </>
                  )}
                </button>
              </div>
              <div className="left-block-btns-group mobile d-flex d-lg-none">
                <button className="btn-message">
                  <div className="icon-wrapper">
                    <BiMessageRounded />
                  </div>
                  <span>傳送訊息</span>
                </button>
                <Quotation />
                <button className="heart-icon" onClick={handleFav}>
                  {collection.find((item) => item === uid) ? (
                    <>
                      <div className="icon-wrapper">
                        {" "}
                        <FaHeart className="fill-icon" />
                      </div>

                      <span>取消收藏</span>
                    </>
                  ) : (
                    <>
                      <div className="icon-wrapper">
                        <FaRegHeart />
                      </div>

                      <span>加入收藏</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
          <section className="right-block col-12 col-lg-8 description">
            {/* <div className="photo">
              <img src="https://s.yimg.com/ny/api/res/1.2/SbkcZy1AilHNsmQs08nHTw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/zh-tw/news_tvbs_com_tw_938/8c0eb4b2ed4519a4a341a90e72f5d93e" />
            </div> */}
            <div className="item">
              <div className="item-title size-6">小幫手服務介紹</div>
              <hr className="item-divider" />
              <di className="item-content size-7" ref={contentRef}></di>
            </div>
            <div className="item">
              <div className="item-title size-6">服務價格說明</div>
              <hr className="item-divider" />
              <div className="service-price item-content d-flex flex-column gap-2">
                <div className="price-intro-text size-7">
                  到府代餵：<span>單次價格以30分鐘為單位</span>
                </div>
                <div className="price-intro-text size-7">
                  安親寄宿：<span>單次價格以一天為單位</span>
                </div>
                <div className="price-intro-text size-7">
                  到府美容：<span>單次價格以一次美容服務為單位</span>
                </div>

                <div className="d-flex gap-4 mt-3">
                  <div className="price-intro-card">
                    <img src="/job-icon/cat-tree.svg" className="card-bg" />
                    <div className="card-title">
                      <PiPawPrintFill className="card-icon" />
                      到府代餵
                    </div>
                    <div className="card-content">
                      <p>
                        NT$<span className="price">400</span>/半小時
                      </p>
                    </div>
                  </div>
                  <div className="price-intro-card">
                    <img src="/job-icon/cat-tree.svg" className="card-bg" />
                    <div className="card-title">
                      <PiPawPrintFill className="card-icon" />
                      安親寄宿
                    </div>
                    <div className="card-content">
                      <p>
                        NT$<span className="price">400</span>/天
                      </p>
                    </div>
                  </div>
                  <div className="price-intro-card">
                    <img src="/job-icon/cat-tree.svg" className="card-bg" />
                    <div className="card-title">
                      <PiPawPrintFill className="card-icon" />
                      到府美容
                    </div>
                    <div className="card-content">
                      <p>
                        NT$<span className="price">400</span>/次
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="item-title size-6">相片/影片</div>
              <hr className="item-divider" />
              <div className="item-image item-content">
                <ImageSwiper images={images} setImages={setImages} />
              </div>
            </div>

            <div className="item">
              <div className="d-flex align-items-center">
                <div className="item-title size-6">服務評價</div>
                <p className="m-size-7">
                  (共<span>{totalRows}</span>則相關評論)
                </p>
              </div>
              <hr className="item-divider" />
              <div className="evaluation-bar">
                <div className="evaluation-bar-left d-flex flex-column justify-content-center">
                  <p className="size-3 text-center">
                    {profile.average_star === null
                      ? "-"
                      : parseFloat(profile.average_star).toFixed(1)}
                  </p>
                  <div className="ranking mb-2 mx-auto">
                    <Rating
                      name="half-rating-read"
                      value={
                        profile.average_star === null
                          ? 0
                          : parseFloat(profile.average_star)
                      }
                      size="large"
                      readOnly
                      precision={0.5}
                      emptyIcon={<StarIcon style={{ opacity: 0.35 }} />}
                    />
                  </div>
                </div>
                <hr className="evaluation-bar-divider" />
                <div className="evaluation-bar-right d-flex flex-column justify-content-evenly">
                  <div className="bar-group">
                    <p className="number size-6">5</p>
                    <div className="percentage">
                      <div
                        className="have"
                        style={{
                          width: `${(fiveStar / reviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="bar-group">
                    <p className="number size-6">4</p>
                    <div className="percentage">
                      <div
                        className="have"
                        style={{
                          width: `${(fourStar / reviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="bar-group">
                    <p className="number size-6">3</p>
                    <div className="percentage">
                      <div
                        className="have"
                        style={{
                          width: `${(threeStar / reviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="bar-group">
                    <p className="number size-6">2</p>
                    <div className="percentage">
                      <div
                        className="have"
                        style={{
                          width: `${(twoStar / reviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="bar-group">
                    <p className="number size-6">1</p>
                    <div className="percentage">
                      <div
                        className="have"
                        style={{
                          width: `${(oneStar / reviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-btns " onClick={handleChangeStar}>
                <button
                  value={"all"}
                  onClick={handleChangeStar}
                  className="filter-btns-focus"
                >
                  全部評論({totalRows})
                </button>
                <button value={5}>
                  5星(<span>{fiveStar}</span>)
                </button>
                <button value={4}>
                  4星(<span>{fourStar}</span>)
                </button>
                <button value={3}>
                  3星(<span>{threeStar}</span>)
                </button>
                <button value={2}>
                  2星(<span>{twoStar}</span>)
                </button>
                <button value={1}>
                  1星(<span>{oneStar}</span>)
                </button>
              </div>
              {filterReview.length > 0 ? (
                <>
                  {filterReview.map((review) => (
                    <div className="review-card">
                      <div className="review-card-head d-flex justify-content-center align-items-center">
                        <img
                          className="review-card-avatar"
                          src={`${review.cover_photo}`}
                        />
                        <div className="review-card-info d-flex flex-column justify-content-between ps-2">
                          <div className="d-flex justify-content-between">
                            <div className="username size-6">{review.name}</div>
                            <div className="date size-7">
                              {review.review_date}
                            </div>
                          </div>
                          <div className="ranking mb-2">
                            <Rating
                              name="half-rating-read"
                              value={review.star_rating}
                              readOnly
                              precision={0.5}
                              emptyIcon={<StarIcon style={{ opacity: 0.35 }} />}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="review-card-body mt-3">
                        {review.review_content}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
              <Pagination
                current={currentPage}
                total={reviews?.review_count}
                pageSize="10"
                showSizeChanger={false}
                rootClassName="cos-pagination"
                onChange={changePage}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HelperDetail;
