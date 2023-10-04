import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiSend } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import Footer from "@/components/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation } from "swiper/modules";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import workService from "@/services/work-service";
import { GoStarFill } from "react-icons/go";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
// import { Button, Modal } from "antd";
import {
  DatePicker,
  Modal,
  Button,
  CheckboxGroup,
  Checkbox,
} from "@douyinfe/semi-ui";
import dayjs from "dayjs";
// register Swiper custom elements
register();

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { TextArea } from "@douyinfe/semi-ui";
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
const ReviewSwiper = ({ reviews }) => {
  const [transReview, setTransReview] = useState(reviews);

  return (
    <Swiper
      modules={[Scrollbar]}
      spaceBetween={20}
      slidesPerView="auto"
      scrollbar={{
        draggable: true,
        dragSize: "150px",
      }}
    >
      {reviews.map((review) => (
        <SwiperSlide key={review.review_id}>
          <div className="review-card">
            <div className="review-card-head d-flex justify-content-center align-items-center">
              <img
                className="review-card-avatar"
                src={`${review.cover_photo}`}
              />
              <div className="review-card-info d-flex flex-column justify-content-between ps-2">
                <div className="d-flex justify-content-between">
                  <div className="username size-6">{review.name}</div>
                  <div className="date size-6">{review.review_date}</div>
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
            <div className="review-card-body mt-3">{review.review_content}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const HelperDetailSticky = () => {
  return (
    <section className="get-price d-flex justify-content-around align-items-center">
      <p className="get-price-number size-4 m-0">
        NT$<span>500</span>/次
      </p>
      <Quotation />
    </section>
  );
};
const Quotation = () => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    console.log("Ok button clicked");
  };
  const handleCancel = () => {
    setVisible(false);
    console.log("Cancel button clicked");
  };
  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };
  const [time, setTime] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [days, setDays] = useState(0);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const today = dayjs();
  const [startDay, setStartDay] = useState(undefined);
  const [endDay, setEndDay] = useState(undefined);

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
        className="get-price-btn btn-second d-flex  align-items-center justify-content-center"
      >
        <FiSend className="get-price-icon" />
        查看報價
      </button>

      <Modal
        title="預約細節"
        fullScreen
        visible={visible}
        onOk={handleOk}
        afterClose={handleAfterClose} //>=1.16.0
        onCancel={handleCancel}
        closeOnEsc={true}
        className="req-quotation"
        footer={
          <div className="req-quotation-footer">
            <Button type="tertiary" onClick={handleCancel}>
              取消
            </Button>
            <button className="btn-confirm" onClick={handleOk}>
              確認
            </button>
          </div>
        }
      >
        <div className="d-flex justify-content-between">
          <p>寵物</p>
          <PetInfo />
        </div>
        <div className="d-flex justify-content-between">
          <p>開始日期</p>
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
        <div className="d-flex justify-content-between">
          <p>結束日期</p>
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
        <div className="d-flex justify-content-between">
          <p>服務時間</p>
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
        <div className="d-flex justify-content-between">
          <div>每天次數</div>
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
        <div className="d-flex justify-content-between">
          <p>地點</p>
          <input type="text" value={"台灣桃園市楊梅區環南路309巷13號"} />
        </div>
        <div className="d-flex flex-column justify-content-between">
          <p>備註</p>
          <TextArea placeholder="輸入備註或是您毛小孩的需求與個性狀況" />
        </div>
        <div className="divider my-2"></div>
        <div className="col-md-6 col-8 offset-md-6 offset-4 settlement-amount ">
          <div className="d-flex justify-content-between">
            <p className="">小計</p>
            <p>
              NT$<span>400</span>
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
              NT$<span>{400 * days * time * frequency}</span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const PetInfo = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [pets, setPets] = useState([]);
  useEffect(() => {
    workService
      .getPetInfo(uid)
      .then((response) => {
        console.log(response);
        setPets(response?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    console.log("Ok button clicked");
  };
  const handleCancel = () => {
    setVisible(false);
    console.log("Cancel button clicked");
  };
  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };

  return (
    <>
      <label onClick={showDialog}>選擇寵物</label>
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
              取消
            </Button>
            <button className="btn-confirm" onClick={handleOk}>
              確認
            </button>
          </div>
        }
      >
        <CheckboxGroup
          type="pureCard"
          direction="horizontal"
          aria-label="CheckboxGroup 示例"
        >
          {pets.map((pet) => (
            <Checkbox
              value={pet.pet_id}
              // extra="Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统"
            >
              <img className="pet-photo" src={pet.image}></img>
              <p className="size-6">{pet.name}</p>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Modal>
    </>
  );
};
const HelperDetail = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (uid) {
      workService
        .getHelperDetail(uid)
        .then((response) => {
          setProfile(response?.data?.data.profile[0]);
          setReviews(response?.data?.data.reviews);
          setImages(response?.data?.data.images);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [uid]);
  let fiveStar = 0;
  let fourStar = 0;
  let threeStar = 0;
  let twoStar = 0;
  let oneStar = 0;
  reviews.map((review) => {
    switch (review.star_rating) {
      case 5:
        fiveStar++;
        break;
      case 4:
        fourStar++;
        break;
      case 3:
        threeStar++;
        break;
      case 2:
        twoStar++;
        break;
      case 1:
        oneStar++;
        break;
    }
  });
  return (
    <>
      <div className="helper-detail container-fluid">
        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">首頁</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link href="/work/find-helper">小幫手總覽</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {uid}
            </li>
          </ol>
        </nav>
        <header className="d-flex flex-md-row flex-column justify-content-center align-items-center">
          <div className="avatar">
            <img src={profile.cover_photo} />
          </div>
          <div className="profile row justify-content-center justify-content-md-start">
            <div className="size-2 m-size-3 username col-4 col-md-12 text-end text-sm-start">
              {profile.name}
            </div>
            <p className="intro size-6 col-12">{profile.Introduction}</p>
            <div className="review size-6 d-flex my-2 align-items-center col-4 col-md-12 ">
              <span className="">
                {profile.average_star === null
                  ? "0.0"
                  : parseFloat(profile.average_star).toFixed(1)}
              </span>
              <GoStarFill className="icon" />
              <span>
                ({profile.review_count === null ? 0 : profile.review_count})
              </span>
            </div>
            <button className="btn-confirm btn-message d-flex justify-content-center align-items-center">
              <BiMessageRounded />
              傳送訊息
            </button>
          </div>
        </header>
        <section className="description">
          <div className="item">
            <div className="item-title size-4">相片/影片：</div>
            <div className="item-image item-content">
              <ImageSwiper images={images} setImages={setImages} />
            </div>
          </div>
          <div className="item">
            <div className="item-title size-4">小幫手介紹：</div>
            <p className="item-content size-6">{profile.job_description}</p>
          </div>
          <div className="item">
            <div className="item-title size-4 ">可服務時間：</div>
            <span className="size-4 item-content">
              日、一、二、三、四、五、六
            </span>
          </div>
          <div className="item">
            <div className="item-title size-4">可服務地區：</div>
            <span className="size-4 item-content">台北市、新北市</span>
          </div>
          <div className="item">
            <div className="item-title size-4">連絡電話：</div>
            <span className="size-4 item-content">0912-345-678</span>
          </div>
          <div className="item">
            <div className="item-title size-4">電子信箱</div>
            <span className="size-4 item-content">example01@test.com</span>
          </div>
        </section>
        <section className="">
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
            <div className="evaluation-bar-divider"></div>
            <div className="evaluation-bar-right d-flex flex-column justify-content-evenly">
              <div className="bar-group">
                <p className="number size-6">5</p>
                <div className="percentage">
                  <div
                    className="have"
                    style={{ width: `${(fiveStar / reviews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bar-group">
                <p className="number size-6">4</p>
                <div className="percentage">
                  <div
                    className="have"
                    style={{ width: `${(fourStar / reviews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bar-group">
                <p className="number size-6">3</p>
                <div className="percentage">
                  <div
                    className="have"
                    style={{ width: `${(threeStar / reviews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bar-group">
                <p className="number size-6">2</p>
                <div className="percentage">
                  <div
                    className="have"
                    style={{ width: `${(twoStar / reviews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bar-group">
                <p className="number size-6">1</p>
                <div className="percentage">
                  <div
                    className="have"
                    style={{ width: `${(oneStar / reviews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="review-card-group d-flex">
            <ReviewSwiper reviews={reviews} />
          </div>
        </section>
      </div>
    </>
  );
};

export default HelperDetail;
