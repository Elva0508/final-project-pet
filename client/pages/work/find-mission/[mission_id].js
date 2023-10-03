import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";
import axios from "axios"
import { IoPaperPlaneOutline } from "react-icons/io5";
import { PiWechatLogoThin } from "react-icons/pi";
import { FaRegHeart, FaHeart } from "react-icons/fa";



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
                        src='https://picsum.photos/id/40/300/300'
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src='https://images.pexels.com/photos/982300/pexels-photo-982300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src='https://images.pexels.com/photos/384555/pexels-photo-384555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src='https://images.pexels.com/photos/7149465/pexels-photo-7149465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src='https://images.pexels.com/photos/8985189/pexels-photo-8985189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src='https://images.pexels.com/photos/14721098/pexels-photo-14721098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src='https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    />
                </swiper-slide>
                <swiper-slide>
                    <img
                        src='https://images.pexels.com/photos/979247/pexels-photo-979247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    />
                </swiper-slide>
            </swiper-container>
        </>
    );
};

export const MissionDetailSticky = () => {
    const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); // 切換收藏狀態
    };

    return (
        <>
            <section className="ask-and-apply d-flex justify-content-center align-items-center">
                <div className='position-absolute fav' onClick={toggleFavorite}>
                    {isFavorite ? (
                        <div className='d-flex flex-column justify-content-end align-items-cnter'><FaHeart className='size-4 heart-icon' /><span>取消</span></div>
                    ) : (
                        <div className='d-flex flex-column justify-content-end align-items-cnter '><FaRegHeart className='size-4 heart-icon' /><span>收藏</span></div>
                    )}
                </div>
                <button className="ask-and-apply-btn btn-outline-confirm d-flex align-items-center justify-content-center">
                    <PiWechatLogoThin />
                    線上詢問
                </button>
                <button className="ask-and-apply-btn btn-second d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <IoPaperPlaneOutline />
                    立即應徵
                </button>
            </section>
        </>
    )
}

function CustomHTMLRenderer({ htmlContent }) {
    return (
        <div className="item">
            <div className="item-title size-5">詳細說明</div>
            <ul className="item-content size-6" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
}

export default function MissionDetail() {
    // const [inputValue, setInputValue] = useState('');

    // const handleInputChange = (event) => {
    //     setInputValue(event.target.value);
    // };

    const router = useRouter();
    const { mission_id } = router.query;

    const [missionDetail, setMissionDetail] = useState([])
    const getMissionDetail = async (mission_id) => {  // 接受 mission_id 作為參數
        try {
            const response = await axios.get(`http://localhost:3005/api/mission/mission-details/${mission_id}`);
            const data = response.data.data;
            console.log("data是" + data);
            setMissionDetail(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        console.log("Effect called with mission_id:", mission_id);
        if (mission_id) {
            getMissionDetail(mission_id);
        }
    }, [mission_id])

    // 格式化日期
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    return (
        <>
            {/* Modal */}
            <div className="modal fade apply-modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title size-4" id="exampleModalLabel">立即應徵</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className='modal-body'>
                            <div className="profile d-flex justify-content-center align-items-center">
                                <div className="avatar">
                                    <img src="/kitten.jpg" />
                                </div>
                                <div className="justify-content-center">
                                    <div className="size-4">
                                        雅晴
                                    </div>
                                    <p className="size-6 mt-1">
                                        25歲
                                    </p>
                                    <p className='size-6 mt-1'>新北市三重區</p>
                                </div>
                            </div>
                            <div className='recommend mt-4'>
                                <div className='size-5 mb-2'>自我推薦</div>
                                <textarea className='recommend-content'></textarea>

                                <div className='auto-send d-flex my-4 align-items-center'>
                                    <input type="checkbox" className='checkbox' />
                                    <div className='size-6 ms-2'>自動發送小幫手履歷<span className='size-7' >（需開啟小幫手資料）</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-center py-4">
                            <button type="button" className=" btn-outline-confirm" data-bs-dismiss="modal">取消</button>
                            <button type="button" className=" btn-second">確認送出</button>
                        </div>
                    </div>
                </div>
            </div>

            {missionDetail.map((v, i) => {
                return (
                    <div className='container mission-detail my-3'>
                        <div>麵包屑放這裡</div>
                        <header className='mt-3 p-4'>
                            <p>案件編號：{v.pid}</p>
                            <h2 className='size-3'>{v.title}</h2>
                            <p className='size-6 mt-3'>刊登日期：{formatDate(v.post_date)}</p>
                            <p className='size-6 mt-2'>最後更新：{formatDate(v.update_date)}</p>
                        </header>
                        <section className='description my-4 py-1 '>
                            <div className="item d-flex flex-column flex-sm-row ">
                                <div className="item-title size-5">
                                    預算金額：
                                </div>
                                <p className="size-6 d-flex align-items-center ms-4 ms-sm-0 salary">NT$ {v.price} / 次</p>
                            </div>
                            <div className="item d-flex flex-column flex-sm-row">
                                <div className="item-title size-5">
                                    任務日期：
                                </div>
                                <p className="size-6 d-flex align-items-center ms-4 ms-sm-0">{v.start_date === v.end_date ? formatDate(v.start_date) : `${formatDate(v.start_date)}～${formatDate(v.end_date)}`}</p>
                            </div>
                            <div className="item d-flex flex-column flex-sm-row">
                                <div className="item-title size-5">
                                    任務地點：
                                </div>
                                <p className="size-6 d-flex align-items-center ms-4 ms-sm-0">{v.city}{v.area}</p>
                            </div>
                            <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28912.322574287376!2d121.48607389999998!3d25.066622449999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a8de05921eb3%3A0xe818cd4640a88cc6!2zMjQx5paw5YyX5biC5LiJ6YeN5Y2A!5e0!3m2!1szh-TW!2stw!4v1695367764015!5m2!1szh-TW!2stw" referrerpolicy="no-referrer-when-downgrade"></iframe></div>

                            <CustomHTMLRenderer htmlContent={v.description} />

                            <div className="item d-flex flex-column flex-sm-row">
                                <div className="item-title size-5">
                                    任務類型：
                                </div>
                                <p className="size-6 d-flex align-items-center ms-4 ms-sm-0"> {(() => {
                                    switch (v.mission_type) {
                                        case 1:
                                            return '到府照顧';
                                        case 2:
                                            return '安親寄宿';
                                        case 3:
                                            return '到府美容';
                                        case 4:
                                            return '行為訓練';
                                        case 5:
                                            return '醫療護理';
                                        default:
                                            return '其他';
                                    }
                                })()}</p>
                            </div>
                            <div className="item d-flex flex-column flex-sm-row">
                                <div className="item-title size-5">
                                    支付方式：
                                </div>
                                <p className="size-6 d-flex align-items-center ms-4 ms-sm-0">{(() => {
                                    switch (v.payment_type) {
                                        case 1:
                                            return '現金';
                                        case 2:
                                            return '轉帳匯款';
                                        default:
                                            return '其他';
                                    }
                                })()}</p>
                            </div>
                            <div className="item">
                                <div className="item-title size-5">相片/影片：</div>
                                <div className="item-image item-content">
                                    <ImageSwiper />
                                </div>
                            </div>
                        </section>
                    </div>
                )
            })
            }

        </>
    )
}
