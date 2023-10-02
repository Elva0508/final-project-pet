import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiSend } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import Footer from "@/components/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation } from "swiper/modules";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import workService from "@/services/work-service";
import { GoStarFill } from "react-icons/go";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
// register Swiper custom elements
register();

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
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
      <button className="get-price-btn btn-second d-flex  align-items-center justify-content-center">
        <FiSend className="get-price-icon" />
        查看報價
      </button>
    </section>
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