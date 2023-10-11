import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";
import axios from "axios"
import Link from "next/link";
import jwt_decode from "jwt-decode";
import { GoogleMap, LoadScript, MarkerF, InfoWindowF, OverlayView } from '@react-google-maps/api';
import { IoPaperPlaneOutline } from "react-icons/io5";
import { PiWechatLogoThin } from "react-icons/pi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
// swiper:
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

const ImageSwiper = ({ missionImages }) => {
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
                {missionImages.map((v, i) => (
                    <swiper-slide key={i}>
                        <img src={v.file_path} alt={`Image ${i}`} />
                    </swiper-slide>
                ))}
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
            <div className="item-title size-5 mb-3">詳細說明</div>
            <ul className="item-content size-6" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
}

const MapComponent = ({ lat, lng }) => {
    const mapContainerStyle = {
        width: '90%',
        height: '50vh',
    };

    const center = {
        lat,
        lng,
    };
    console.log('center.lat是:', center.lat);
    console.log('center.lng是:', center.lng);

    return (
        <LoadScript googleMapsApiKey="AIzaSyD3M4Wt4xdyN-LrJyCVDwGSUkQ1B8KpKT8">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={16}
            >
                <MarkerF position={center} />
            </GoogleMap>
        </LoadScript>
    );
};


export default function MissionDetail() {
    // const [inputValue, setInputValue] = useState('');

    // const handleInputChange = (event) => {
    //     setInputValue(event.target.value);
    // };

    const router = useRouter();

    const { mission_id } = router.query;

    const [missionDetail, setMissionDetail] = useState([])
    const [missionImages, setMissionImages] = useState([])

    // GOOGLE地圖API：初始狀態
    const [missionLocation, setMissionLocation] = useState({
        lat: 0, // 设置初始值为0或者其他合适的默认值
        lng: 0,
    });

    // 彈跳視窗
    const [selectedMissionId, setSelectedMissionId] = useState(null);
    const [recommendation, setRecommendation] = useState('');
    const [autoSend, setAutoSend] = useState(false);

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
        if (mission_id) {
            // 顯示詳細資料
            getMissionDetail(mission_id);

            // 使用useEffect發起第二個API請求，供ImageSwiper使用
            axios.get(`http://localhost:3005/api/mission/mission-details-img/${mission_id}`)
                .then((response) => {
                    // 將第二個API的數據儲存到missionImages狀態中
                    setMissionImages(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching data from API 2:', error);
                });

            // 使用useEffect發起第三個API請求，供GOOGLE地圖使用
            axios.get(`http://localhost:3005/api/mission/mission-details-map/${mission_id}`)
                .then((response) => {
                    // 將第三個API的數據儲存到missionLocation狀態中
                    // GOOGLE地圖API：從後端獲取經緯度，更新狀態
                    setMissionLocation({
                        lat: response.data.data.location.lat,
                        lng: response.data.data.location.lng,
                    });
                    console.log("lat是:" + response.data.data.location.lat + "lng是:" + response.data.data.location.lng)
                })
                .catch((error) => {
                    console.error('Error fetching data from API 3:', error);
                });
        }
    }, [mission_id]);

    
    // 彈跳視窗(確認送出)
    const handleConfirmSubmit = async () => {
        setSelectedMissionId(mission_id)
        try {
            // 使用 selectedMissionId 作為 missionId
            const requestData = {
                missionId: selectedMissionId,
                recommendation,
                autoSend,
            };

            // 發送 POST 請求將數據發送到後端 API
            const response = await axios.post('http://localhost:3005/api/mission/add-record', requestData);
            console.log('成功添加到應徵紀錄', response.data);
            // 導到聊天室
            // router.push('/chatlist');
        } catch (error) {
            console.error('添加到應徵紀錄出錯', error);
        }
    };

    // 第一次點擊送出就加入應徵紀錄 而非第二次才加
    useEffect(() => {
        handleConfirmSubmit();
    }, [mission_id]);

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
            <div className={`modal fade apply-modal`} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
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
                                <textarea className='recommend-content' value={recommendation} onChange={(e) => setRecommendation(e.target.value)} ></textarea>

                                <div className='auto-send d-flex my-4 align-items-center'>
                                    <input type="checkbox" className='checkbox' checked={autoSend} onChange={() => setAutoSend(!autoSend)} />
                                    <div className='size-6 ms-2'>自動發送小幫手履歷<span className='size-7' >（需開啟小幫手資料）</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-center py-4">
                            <button type="button" className=" btn-outline-confirm" data-bs-dismiss="modal">取消</button>
                            <button type="button" className=" btn-second" onClick={handleConfirmSubmit} data-bs-dismiss="modal">確認送出</button>
                            {/* 在這邊也要加上data-bs-dismiss="modal"才能在送出後關閉modal 才不會到聊天室之後 後面畫面還是灰暗的 */}
                        </div>
                    </div>
                </div>
            </div>

            {missionDetail.map((v, i) => {
                return (
                    <div className='container mission-detail my-3'>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <Link href="/">首頁</Link>
                                </li>
                                <li class="breadcrumb-item" aria-current="page">
                                    <Link href="/work/find-mission" >
                                        任務總覽
                                    </Link>
                                </li>
                                <li class="breadcrumb-item" aria-current="page">
                                    {v.title}
                                </li>
                            </ol>
                        </nav>
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
                                <p className="size-6 d-flex align-items-center ms-4 ms-sm-0">{v.city}{v.area}{v.location_detail}</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <MapComponent key={`map-${missionLocation.lat}-${missionLocation.lng}`} lat={missionLocation.lat} lng={missionLocation.lng} />
                            </div>

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
                                    <ImageSwiper missionImages={missionImages} />
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