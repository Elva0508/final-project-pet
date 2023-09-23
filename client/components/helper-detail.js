import React, { useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import Footer from "@/components/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation } from "swiper/modules";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
const ReviewCard = () => {
  return (
    <div className="review-card">
      <div className="review-card-head d-flex justify-content-center align-items-center">
        <div className="review-card-avatar"></div>
        <div className="review-card-info d-flex flex-column justify-content-between ps-2">
          <div className="d-flex justify-content-between">
            <div className="username size-6">張三</div>
            <div className="date size-6">2023年8月15日</div>
          </div>
          <div className="ranking mb-2">
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
            <img src="/star.svg" alt="星星" />
          </div>
        </div>
      </div>
      <div className="review-card-body mt-2">
        唬爛產生器唬JOJP爛產生器唬爛產生器唬爛產生器唬。。爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產151生器唬爛產生器唬爛產生器唬，爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬JK爛產生器唬
      </div>
    </div>
  );
};
const ImageSwiper = () => {
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
        <swiper-slide>
          <img
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 200
            )}/300/300`}
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 200
            )}/300/300`}
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 200
            )}/300/300`}
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 200
            )}/300/300`}
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 200
            )}/300/300`}
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 200
            )}/300/300`}
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 200
            )}/300/300`}
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 200
            )}/300/300`}
          />
        </swiper-slide>
      </swiper-container>
    </>
  );
};
const ReviewSwiper = () => {
  const [device, setDevice] = useState("PC");
  useEffect(() => {
    window.addEventListener("resize", handleRWD);
    handleRWD();
    return () => {
      window.removeEventListener("resize", () => {
        console.log("卸載組件");
      });
    };
  }, []);
  function handleRWD() {
    const width = window.innerWidth;
    width <= 375
      ? setDevice("mobile")
      : width > 375 && width <= 768
      ? setDevice("tablet")
      : setDevice("PC");
  }
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
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <ReviewCard />
      </SwiperSlide>
    </Swiper>
  );
};

const HelperDetail = () => {
  return (
    <>
      <div className="helper-detail">
        <header className="d-flex flex-md-row flex-column justify-content-center align-items-center">
          <div className="avatar">
            <img src="" />
          </div>
          <div className="profile row justify-content-center justify-content-md-start">
            <div className="size-2 m-size-3 username col-4 col-md-12 text-end text-sm-start">
              雅晴
            </div>
            <p className="intro size-6 col-12">
              此區是自我介紹：我從小時候家裡一直都有養狗《貴賓、米克斯⋯⋯》，直到14年前自己領養一隻8歲的米格魯兒子開始了不歸路，陸續再領養第二隻米格魯女兒、2隻貓咪，2020年那年5月經歷大女兒突然驟逝、11月兒子罹癌之後離世、陸續經歷大咪有泌尿道問題、小咪氣喘發作，讓我看見更多毛孩生病的路程，所以有了想照顧需要被照顧的毛孩，希望也期許自己能有更多能力、並更努力學習如何去照顧被需要的孩子！
            </p>
            <div className="review size-6 d-flex my-2 align-items-center col-4 col-md-12 ">
              <span className="">5.0</span>
              <img src="/star.svg"></img>
              <span>(10)</span>
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
              <ImageSwiper />
            </div>
          </div>
          <div className="item">
            <div className="item-title size-4">小幫手介紹：</div>
            <p className="item-content size-6">
              孩子們主要活動區域在二樓，害羞的孩子來不用擔心沒地方躲藏，但若是喜愛探險/活動量的主子們，更適合來我家，我家樓中樓，一、二樓相當夠寶貝當成馬拉松賽跑。
              <br />
              我家有3隻孩子，2咪1旺，基本上安親寄宿的孩子會有自己獨立的房間活動。
              <br />
              我一次只照顧2個家庭客人的孩子，來我們家的孩子至少會有10坪大的獨立+共用活動空間，孩子可以任意待在床以外的空間，如果毛孩有亂尿尿的情形，我會給他穿尿布，會亂尿尿又無法穿尿布的毛孩恕我無法提供服務😢
              <br />
              房間的窗戶沒有防護網，但寶貝來的話會緊閉窗戶並開冷氣，孩子大部份時間都會有人陪伴～但有時候白天的時間我需要外出接案子，家裡沒人在的時候，孩子會自己在獨立的房間活動，晚上的時間一定會有人在家。
            </p>
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
          <div className="evaluation-bar test">
            <div className="evaluation-bar-left d-flex flex-column justify-content-center">
              <p className="size-3 text-center">5</p>
              <div className="ranking mb-2 mx-auto">
                <img src="/star.svg" alt="星星" />
                <img src="/star.svg" alt="星星" />
                <img src="/star.svg" alt="星星" />
                <img src="/star.svg" alt="星星" />
                <img src="/star.svg" alt="星星" />
              </div>
            </div>
            <div className="evaluation-bar-divider"></div>
            <div className="evaluation-bar-right d-flex flex-column justify-content-evenly">
              <div className="bar-group">
                <p className="number size-6">5</p>
                <div className="percentage">
                  <div className="have"></div>
                  <div className="no-have"></div>
                </div>
              </div>
              <div className="bar-group">
                <p className="number size-6">4</p>
                <div className="percentage">
                  <div className="have"></div>
                  <div className="no-have"></div>
                </div>
              </div>
              <div className="bar-group">
                <p className="number size-6">3</p>
                <div className="percentage">
                  <div className="have"></div>
                  <div className="no-have"></div>
                </div>
              </div>
              <div className="bar-group">
                <p className="number size-6">2</p>
                <div className="percentage">
                  <div className="have"></div>
                  <div className="no-have"></div>
                </div>
              </div>
              <div className="bar-group">
                <p className="number size-6">1</p>
                <div className="percentage">
                  <div className="have"></div>
                  <div className="no-have"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="review-card-group d-flex">
            <ReviewSwiper />
          </div>
        </section>
      </div>
      <Footer />
      <section className="get-price d-flex justify-content-around align-items-center">
        <p className="get-price-number size-4 m-0">
          NT$<span>500</span>/次
        </p>
        <button className="get-price-btn btn-second d-flex  align-items-center justify-content-center">
          <FiSend className="get-price-icon" />
          查看報價
        </button>
      </section>
    </>
  );
};

export default HelperDetail;
