import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import axios from "axios"
import Link from "next/link";
import jwt_decode from "jwt-decode";
import { GoogleMap, LoadScript, MarkerF, InfoWindowF, OverlayView } from '@react-google-maps/api';
import { IoPaperPlaneOutline } from "react-icons/io5";
import { PiWechatLogoThin } from "react-icons/pi";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
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

export const MissionDetailSticky = ({ userId, mission_id }) => {
    const handleButtonClick = async () => {
        // setIsLoading(true);
        if (mission_id) {
            try {
                const response = await axios.get(`http://localhost:3005/api/mission/mission-details/${mission_id}`);
                const post_user_id = response.data.post_user_id;
                console.log("post_user_id是" + post_user_id);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        // 檢查是否有有效的 userId
        //如果放入targetID 變數 這邊也要把targetID 變數放進來檢查
        if (userId) {
            // 建立要傳送的數據
            const requestData = {
                chatlist_userId1: userId,
                chatlist_userId2: 31, // 放要對話的 targetID 變數
            };
            console.log("userId1是" + userId)
            console.log("userId2是" + userId)

            try {
                const response = await axios.post(
                    "http://localhost:3005/api/chatlist/creatchat",
                    requestData
                );

                if (response.status === 201) {
                    // 請求成功
                    setMessage("請求成功");
                    const chatUrl = response.data.chatUrl;
                    console.log("chatUrl" + chatUrl);
                    // 在這裡導向到 chatUrl
                    // window.location.href = chatUrl;
                } else if (response.status === 200) {
                    // 消息已存在
                    // setMessage("消息已存在");
                    const chatUrl = response.data.chatUrl;
                    console.log("已存在chatUrl" + chatUrl);
                    // 在這裡導向到 chatUrl
                    // window.location.href = chatUrl;
                } else {
                    // 請求失敗
                    // setMessage("請求失敗: " + response.data.error);
                }
            } catch (error) {
                // 處理錯誤
                // setMessage(error.message || "發生錯誤");
            } finally {
                // setIsLoading(false);
            }
        }
    };
    return (
        <>
            <section className="ask-and-apply d-flex justify-content-center align-items-center">
                <button className="ask-and-apply-btn btn-outline-confirm d-flex align-items-center justify-content-center" onClick={handleButtonClick} >
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
            <div className="item-title size-6 mb-3">詳細說明</div>
            <ul className="item-content size-6" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
}

const MapComponent = ({ lat, lng }) => {
    const mapContainerStyle = {
        width: '85%',
        height: '35vh',
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
    // 用於儲存解析後的userID
    const [userId, setUserId] = useState(null);

    // GOOGLE地圖API：初始狀態
    const [missionLocation, setMissionLocation] = useState({
        lat: 0, // 设置初始值为0或者其他合适的默认值
        lng: 0,
    });
    // 聊天室:
    const [message, setMessage] = useState(""); // 儲存返回後的消息
    const [isLoading, setIsLoading] = useState(false);

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

    // 利用token拿到當前登入的userID
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                const currentUserID = decodedToken.id;
                console.log("currentUserID", currentUserID);
                setUserId(currentUserID);
                // 在此處將令牌token添加到請求標頭
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                console.error("解析Token時出錯", error);
            }
        }
    }, []);

    // 收藏
    const [isFavorite, setIsFavorite] = useState(false);

    // 獲取任務是否已被收藏的狀態
    const getIsFavoriteStatus = async (mission_id) => {
        try {
            const response = await axios.get(`http://localhost:3005/api/mission/fav/${mission_id}?userId=${userId}`);

            if (response.data.result.length > 0) {
                // 如果返回的結果不為空，代表用戶已收藏
                setIsFavorite(true);
            } else {
                // 否則用戶未收藏
                setIsFavorite(false);
            }
        } catch (error) {
            console.error('獲取任務是否已收藏時出錯：', error);
        }
    };
    useEffect(() => {
        if (mission_id && userId) {
            // 獲取任務是否已被收藏的狀態
            getIsFavoriteStatus(mission_id);
        }
    }, [mission_id, userId]);

    const toggleFavorite = () => {
        if (!userId) {
            alert('請先登入會員');
            return;
        }
        console.log("mission_id是:" + mission_id + "userId是:" + userId)
        if (isFavorite) {
            removeFromFavorites(mission_id);
        } else {
            addToFavorites(mission_id);
        }
    };

    const addToFavorites = async (mission_id) => {
        try {
            const response = await axios.put(`http://localhost:3005/api/mission/add-fav/${mission_id}?userId=${userId}`);
            setIsFavorite(true);
        } catch (error) {
            console.error('加到收藏時出錯：', error);
        }
    };

    const removeFromFavorites = async (mission_id) => {
        try {
            const response = await axios.delete(`http://localhost:3005/api/mission/delete-fav/${mission_id}?userId=${userId}`);
            setIsFavorite(false);
        } catch (error) {
            console.error('從收藏中移除時出錯：', error);
        }
    };

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
            const response = await axios.post(`http://localhost:3005/api/mission/add-record?userId=${userId}`, requestData);
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
                    <div className='container mission-detail my-4'>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <Link href="/">首頁</Link>
                                </li>
                                <li class="breadcrumb-item" aria-current="page">
                                    <Link href="/work/find-mission" >
                                        小貓上工(找任務)
                                    </Link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    {v.title}
                                </li>
                            </ol>
                        </nav>
                        <main className="d-flex flex-column flex-lg-row row">
                            <div className='left col-12 col-lg-3'>
                                <aside className='post-user'>
                                    <div className='mt-3 p-4 position-relative'>
                                        <div className=' d-flex '>
                                            <p className='size-6'>案主資訊</p>
                                        </div>
                                        <div className='poster-img text-center my-2'>
                                            <img src={v.cover_photo} />
                                        </div>
                                        <div className='my-2 d-flex justify-content-center align-items-center'>
                                            <p className='size-7 me-1'>{v.name}</p>
                                            <div className='poster-gender'>
                                                {v.gender === '女' ? <BsGenderFemale /> : <BsGenderMale />}
                                            </div>
                                        </div>
                                        <div className='ms-3'>
                                            <p className='size-7 '>聯絡時段</p>
                                            <p>
                                                {v.morning === 1 && '09:00~12:00 '}
                                                {v.noon === 1 && '13:00~18:00 '}
                                                {v.night === 1 && '19:00~21:00 '}
                                                {v.morning === 0 && v.noon === 0 && v.night === 0 && '沒有可連絡時段'}
                                            </p>

                                        </div>
                                    </div>
                                </aside>
                            </div>
                            <div className='right col-12 col-lg-8'>
                                <header className='mt-3 p-4 position-relative'>
                                    <div className=' d-flex '>
                                        <p>案件編號：{v.pid}</p>
                                        <img className='position-absolute' src={isFavorite ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorite ? "已收藏" : "未收藏"} onClick={toggleFavorite} />
                                    </div>

                                    <h2 className='size-5'>{v.title}</h2>
                                    <p className='size-7 mt-3'>刊登日期：{formatDate(v.post_date)}</p>
                                    <p className='size-7 mt-2'>最後更新：{formatDate(v.update_date)}</p>
                                </header>
                                <section className='description my-4 py-1 '>
                                    <div className="item d-flex flex-column flex-sm-row ">
                                        <div className="item-title size-6">
                                            預算金額&emsp;
                                        </div>
                                        <p className="size-6 d-flex align-items-center ms-4 ms-sm-0 salary mt-2 mt-sm-0">NT$ {v.price} / 次</p>
                                    </div>
                                    <div className="item d-flex flex-column flex-sm-row">
                                        <div className="item-title size-6">
                                            任務日期&emsp;
                                        </div>
                                        <p className="size-6 d-flex align-items-center ms-4 ms-sm-0 mt-2 mt-sm-0">{v.start_date === v.end_date ? formatDate(v.start_date) : `${formatDate(v.start_date)}～${formatDate(v.end_date)}`}</p>
                                    </div>
                                    <div className="item d-flex flex-column flex-sm-row mission-place">
                                        <div className="item-title size-6">
                                            任務地點&emsp;
                                        </div>
                                        <p className="size-6 d-flex align-items-center ms-4 ms-sm-0 mt-2 mt-sm-0">{v.city}{v.area}{v.location_detail}</p>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <MapComponent key={`map-${missionLocation.lat}-${missionLocation.lng}`} lat={missionLocation.lat} lng={missionLocation.lng} />
                                    </div>

                                    <CustomHTMLRenderer htmlContent={v.description} />

                                    <div className="item d-flex flex-column flex-sm-row">
                                        <div className="item-title size-6">
                                            任務類型&emsp;
                                        </div>
                                        <p className="size-6 d-flex align-items-center ms-4 ms-sm-0 mt-2 mt-sm-0"> {(() => {
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
                                        <div className="item-title size-6">
                                            支付方式&emsp;
                                        </div>
                                        <p className="size-6 d-flex align-items-center ms-4 ms-sm-0 mt-2 mt-sm-0">{(() => {
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
                                        <div className="item-title size-6">相片/影片</div>
                                        <div className="item-image mt-4">
                                            <ImageSwiper missionImages={missionImages} />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </main>


                    </div>
                )
            })
            }
            <Footer />
            <MissionDetailSticky userId={userId} mission_id={mission_id} setMessage={setMessage} isLoading={isLoading} setIsLoading={setIsLoading} message={message} />
        </>
    )
}