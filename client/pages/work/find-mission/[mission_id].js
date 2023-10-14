import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import axios from "axios"
import Link from "next/link";
import jwt_decode from "jwt-decode";
import { GoogleMap, LoadScript, MarkerF, InfoWindowF, OverlayView } from '@react-google-maps/api';
import Swal from 'sweetalert2';
import { IoPaperPlaneOutline } from "react-icons/io5";
import { PiWechatLogoThin } from "react-icons/pi";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { BiSolidTimeFive } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaPaw } from "react-icons/fa";
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
// semi
// import { Card, Avatar, Popover } from '@douyinfe/semi-ui';
import { IconInfoCircle } from '@douyinfe/semi-icons';
// mui
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

// function Demo() {
//     const { Meta } = Card;

//     return (
//         <div>
//             <Card 
//                 shadows='hover'
//                 style={{ maxWidth: 300 }} 
//                 bodyStyle={{ 
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between'
//                 }}
//             >
//                 <Meta 
//                     title="10/28到府清貓砂、餵貓、陪貓玩" 
//                     avatar={
//                         <Avatar 
//                             alt='Card meta img'
//                             size="default"
//                             src='https://images.pexels.com/photos/3257811/pexels-photo-3257811.jpeg?auto=compress&cs=tinysrgb&w=800'
//                         />
//                     }
//                 />
//                 <Popover
//                     position='top'
//                     showArrow
//                     content={
//                         <article style={{ padding: 6 }}>
//                             NT$ 800 / 次
//                         </article>
//                     }
//                 >
//                     <FaPaw style={{ color: '#d7965b' }}/>
//                 </Popover>
//             </Card>
//             <br/>
//             <Card 
//                 shadows='always'
//                 style={{ maxWidth: 360 }} 
//                 bodyStyle={{ 
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between'
//                 }}
//             >
//                 <Meta 
//                     title="Semi Doc" 
//                     avatar={
//                         <Avatar 
//                             alt='Card meta img'
//                             size="default"
//                             src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/card-meta-avatar-docs-demo.jpg'
//                         />
//                     }
//                 />
//                 <Popover
//                     position='top'
//                     showArrow
//                     content={
//                         <article style={{ padding: 6 }}>
//                             这是一个 Card
//                         </article>
//                     }
//                 >
//                     <BsGenderFemale style={{ color: 'var(--semi-color-primary)' }}/>
//                 </Popover>
//             </Card>
//         </div>
//     );
// }
function InteractiveCard({ popularMissions, setPopularMissions }) {
    return (
        <>
            {popularMissions.map((v, i) => {
                return (
                    <Card
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                            width: 320,
                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                        className='d-flex flex-column'
                    >
                        <div className='d-flex align-items-center justify-content-between popular-cards'>
                            <AspectRatio ratio="1" sx={{ width: 80 }}>
                                <img
                                    src={v.file_path}
                                    // srcSet={v.file_path}
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                            <Link href={`/work/find-mission/${v.mission_id}`}>
                                <CardContent className='popular-card-content'>
                                    <Typography level="title-lg" id="card-description" className='size-7 popular-card-title'>
                                        {v.title}
                                    </Typography>
                                    <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                                        {v.city}
                                        <Chip
                                            variant="outlined"
                                            color="primary"
                                            size="sm"
                                            sx={{ pointerEvents: 'none' }}
                                        >
                                            NT$ {v.price} / 次
                                        </Chip>
                                    </Typography>
                                </CardContent>
                            </Link>
                        </div>
                    </Card>
                );
            })}
        </>
    );
}

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

// export const MissionDetailSticky = ({ userId, mission_id }) => {
//     const handleButtonClick = async () => {
//         // setIsLoading(true);
//         if (mission_id) {
//             try {
//                 const response = await axios.get(`http://localhost:3005/api/mission/mission-details/${mission_id}`);
//                 const post_user_id = response.data.post_user_id;
//                 console.log("post_user_id是" + post_user_id);
//             } catch (error) {
//                 console.error("Error:", error);
//             }
//         }
//         // 檢查是否有有效的 userId
//         //如果放入targetID 變數 這邊也要把targetID 變數放進來檢查
//         if (userId) {
//             // 建立要傳送的數據
//             const requestData = {
//                 chatlist_userId1: userId,
//                 chatlist_userId2: 31, // 放要對話的 targetID 變數
//             };
//             console.log("userId1是" + userId)
//             console.log("userId2是" + userId)

//             try {
//                 const response = await axios.post(
//                     "http://localhost:3005/api/chatlist/creatchat",
//                     requestData
//                 );

//                 if (response.status === 201) {
//                     // 請求成功
//                     setMessage("請求成功");
//                     const chatUrl = response.data.chatUrl;
//                     console.log("chatUrl" + chatUrl);
//                     // 在這裡導向到 chatUrl
//                     // window.location.href = chatUrl;
//                 } else if (response.status === 200) {
//                     // 消息已存在
//                     // setMessage("消息已存在");
//                     const chatUrl = response.data.chatUrl;
//                     console.log("已存在chatUrl" + chatUrl);
//                     // 在這裡導向到 chatUrl
//                     // window.location.href = chatUrl;
//                 } else {
//                     // 請求失敗
//                     // setMessage("請求失敗: " + response.data.error);
//                 }
//             } catch (error) {
//                 // 處理錯誤
//                 // setMessage(error.message || "發生錯誤");
//             } finally {
//                 // setIsLoading(false);
//             }
//         }
//     };
//     return (
//         <>
//             <section className="ask-and-apply d-flex justify-content-center align-items-center">
//                 <button className="ask-and-apply-btn btn-outline-confirm d-flex align-items-center justify-content-center" onClick={handleButtonClick} >
//                     <PiWechatLogoThin />
//                     線上詢問
//                 </button>
//                 <button className="ask-and-apply-btn btn-second d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                     <IoPaperPlaneOutline />
//                     立即應徵
//                 </button>
//             </section>
//         </>
//     )
// }

function CustomHTMLRenderer({ htmlContent }) {
    return (
        <div className="item detailed-description">
            <div className="item-title size-6 ">詳細說明</div>
            <hr class="item-divider" />
            <ul className="item-introduction size-7" dangerouslySetInnerHTML={{ __html: htmlContent }} />
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

    // 熱門任務
    const [popularMissions, setPopularMissions] = useState([]);
    // 算應徵人數
    const [recordCount, setRecordCount] = useState(0);
    // 取得登入會員的資訊
    const [loginUser, setLoginUser] = useState(null);

    // GOOGLE地圖API：初始狀態
    const [missionLocation, setMissionLocation] = useState({
        lat: 0, // 设置初始值为0或者其他合适的默认值
        lng: 0,
    });
    // 聊天室:
    const [postUserId, setPostUserId] = useState(null); // 聊天室的第二個對象
    const [message, setMessage] = useState(""); // 儲存返回後的消息
    const [isLoading, setIsLoading] = useState(false);
    const [chatlistId, setChatlistId] = useState(null); // 用於儲存解析後的chatlistId

    // 彈跳視窗
    const [selectedMissionId, setSelectedMissionId] = useState(null);
    const [msgInputValue, setMsgInputValue] = useState(""); // 輸入框的值
    const [autoSend, setAutoSend] = useState(false);

    const getMissionDetail = async (mission_id) => {  // 接受 mission_id 作為參數
        try {
            const response = await axios.get(`http://localhost:3005/api/mission/mission-details/${mission_id}`);
            const data = response.data.data;
            console.log("data是" + data);
            setMissionDetail(data);
            // 聊天室
            const post_user_id = response.data.data[0].post_user_id; // 注意這裡要取[0]！因為是陣列
            console.log("post_user_id是" + post_user_id);
            setPostUserId(post_user_id); // 本來這邊是寫在handleButtonClick 但因為異步 要按第二次按鈕 chatlist_userId2才有讀到 所以移到這
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

    // 線上詢問：跟案主線上聊聊
    const handleButtonClick = async () => {
        if (!userId) {
            alert('請先登入會員');
            return;
        }
        // setIsLoading(true);

        // 檢查是否有有效的 userId
        //如果放入targetID 變數 這邊也要把targetID 變數放進來檢查
        if (userId) {
            // 建立要傳送的數據
            const requestData = {
                chatlist_userId1: userId,
                chatlist_userId2: postUserId, // 放要對話的 targetID 變數
            };
            console.log("userId1是" + userId)
            console.log("userId2是" + postUserId)

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
                    window.location.href = chatUrl;
                } else if (response.status === 200) {
                    // 消息已存在
                    // setMessage("消息已存在");
                    const chatUrl = response.data.chatUrl;
                    console.log("已存在chatUrl" + chatUrl);
                    // 在這裡導向到 chatUrl
                    window.location.href = chatUrl;
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

    // 立即應徵(跳出modal)：發出消息找有沒有chatlist_id 沒有就新增
    const handleApplyClick = async () => {
        if (!userId) {
            alert('請先登入會員');
            return;
        }
        // setIsLoading(true);

        // 檢查是否有有效的 userId
        //如果放入targetID 變數 這邊也要把targetID 變數放進來檢查
        if (userId) {
            // 建立要傳送的數據
            const requestData = {
                chatlist_userId1: userId,
                chatlist_userId2: postUserId, // 放要對話的 targetID 變數
            };
            console.log("userId1是" + userId)
            console.log("userId2是" + postUserId)

            try {
                const response = await axios.post(
                    "http://localhost:3005/api/chatlist/creatchat",
                    requestData
                );

                if (response.status === 201) {
                    // 請求成功
                    setMessage("請求成功");
                    const ChatlistId = response.data.chatlistId;     // 這邊找有沒有chatlist_id
                    console.log("ChatlistId" + ChatlistId);

                    //把ChatlistId存到狀態裡後面送消息時使用
                    setChatlistId(ChatlistId);
                    console.log("setChatlistId設置成功");
                } else if (response.status === 200) {
                    // 消息已存在
                    //   setMessage("消息已存在");
                    const chatUrl = response.data.chatUrl;
                    const ChatlistId = response.data.chatlistId;
                    console.log("已存在chatUrl" + chatUrl);
                    console.log("ChatlistId" + ChatlistId);

                    //把ChatlistId存到狀態裡後面送消息時使用
                    setChatlistId(ChatlistId);
                    console.log("setChatlistId設置成功");
                } else {
                    // 請求失敗
                    setMessage("請求失敗: " + response.data.error);
                }
            } catch (error) {
                // 處理錯誤
                setMessage(error.message || "發生錯誤");
            } finally {
                setIsLoading(false);
            }
        }
    };


    // 確認送出(modal裡)：處理訊息送出事件
    const handleSendClick = async () => {

        // 先檢查消息是否為空
        if (!msgInputValue) {
            alert('請輸入自我推薦');
            return;
        }
        try {
            // 發送消息到後端
            const response = await fetch(
                "http://localhost:3005/api/chatroom/sendchat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chatlist_id: chatlistId,
                        talk_userId: userId, // 使用前端頁面登入的 userId
                        chat_content: msgInputValue,
                    }),
                }
            );
            if (response.ok) {
                // 清空輸入框的值
                setMsgInputValue("");
                const chatUrl = `/chatlist/${chatlistId}`;
                // 在這裡導向到 chatUrl
                window.location.href = chatUrl;
            } else {
                console.error("發送消息時出錯");
            }
        } catch (error) {
            console.error("發送消息時出錯", error);
        }
    };

    // 確認送出(modal裡)：寫進應徵紀錄
    const handleConfirmSubmit = async () => {
        setSelectedMissionId(mission_id)
        try {
            // 使用 selectedMissionId 作為 missionId
            const requestData = {
                missionId: selectedMissionId,
                // recommendation,
                // autoSend,
            };
            console.log("requestData:" + requestData);

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

    // 熱門任務
    const getPopularMissions = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/api/mission/popular`);
            const data = response.data.result;  //注意這裡是result
            console.log("data是" + data);
            setPopularMissions(data);
            console.log("現在的popularMissions是" + popularMissions);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 算應徵人數
    const getRecordCount = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/api/mission/record-count/${mission_id}`);
            const data = response.data.result[0];  //注意這裡是result 陣列裡只有一個物件 所以要記得補[0]
            console.log("Data received:", data);
            setRecordCount(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 彈跳視窗：登入者資訊
    const getLoginUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/api/mission/login-user?userId=${userId}`);
            const data = response.data.result[0];  //注意這裡是result 陣列裡只有一個物件 所以要記得補[0]
            console.log("登入者資訊的data是:" + data);
            setLoginUser(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getPopularMissions();
        // getRecordCount();
        // getLoginUser();
    }, [])
    useEffect(() => {
        getRecordCount(mission_id);  //要記得給參數
    }, [mission_id]) // 依賴陣列也要記得寫
    useEffect(() => {
        getLoginUser(userId);  //要記得給參數  //非同步操作 需要一些時間來完成
    }, [userId]) // 依賴陣列也要記得寫

    console.log("recordCount:", recordCount);
    console.log("loginUser:", loginUser);

    // 算登入者的年齡
    const birthdayString = loginUser ? loginUser.birthday : null;  // 確保只有在loginUser被設置時 才會進行後續操作 避免在組件渲染前loginUser還沒有被設置 造成loginUser.birthday為null
    console.log("birthdayString是" + birthdayString);
    const birthdayDate = new Date(birthdayString);
    const today = new Date();  // 取得今天的日期
    let age = today.getFullYear() - birthdayDate.getFullYear();   // 計算年齡
    // 如果今天的月份小於生日的月份，或今天的月份等於生日的月份但日期小於生日的日期，
    // 則年齡減少一年，因為生日還沒到
    if (
        today.getMonth() < birthdayDate.getMonth() ||
        (today.getMonth() === birthdayDate.getMonth() && today.getDate() < birthdayDate.getDate())
    ) {
        age--;
    }

    return (
        <>
            {/* Modal */}
            {/* {userId && ( */}
            {/* 本來是想讓有userId時才跳modal 但一直報錯 */}
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
                                    <img src={loginUser ? loginUser.cover_photo : ''} />
                                </div>
                                <div className="justify-content-center">
                                    <div className="size-4">
                                        {loginUser ? loginUser.name : ''}
                                        {/* 本來只寫{loginUser.name}會報錯null(即使先前在console已看到loginUser被設置) 這是因為在頁面渲染之前 loginUser還沒有被設置 (loginUser仰賴數組userId) 像recordCount就沒這問題  */}
                                    </div>
                                    <p className="size-6 mt-1">
                                        {age}歲
                                    </p>
                                    <p className='size-6 mt-1'>{loginUser ? loginUser.city + loginUser.area : ''}</p>
                                </div>
                            </div>
                            <div className='recommend mt-4'>
                                <div className='size-5 mb-2'>自我推薦</div>
                                <textarea className='recommend-content' value={msgInputValue}
                                    onChange={(e) => setMsgInputValue(e.target.value)} ></textarea>

                                <div className='auto-send d-flex my-4 align-items-center'>
                                    <input type="checkbox" className='checkbox' checked={autoSend} onChange={() => setAutoSend(!autoSend)} />
                                    <div className='size-6 ms-2'>自動發送小幫手履歷<span className='size-7' >（需開啟小幫手資料）</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-center py-4">
                            <button type="button" className=" btn-outline-confirm" data-bs-dismiss="modal">取消</button>
                            <button type="button" className=" btn-second" onClick={() => {
                                handleConfirmSubmit();  //寫進應徵紀錄
                                handleSendClick();  // 處理訊息送出事件+跟案主聊(導到聊天室)
                            }} data-bs-dismiss="modal">確認送出</button>
                            {/* 在這邊也要加上data-bs-dismiss="modal"才能在送出後關閉modal 才不會到聊天室之後 後面畫面還是灰暗的 */}
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}

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
                        <main className="d-flex flex-column flex-lg-row row justify-content-between g-lg-5">
                            <div className='left col-12 col-lg-3'>
                                <aside className='post-user'>
                                    <div className='mt-3'>
                                        <div className=' d-flex p-4 pb-3'>
                                            <p className='size-6'>刊登案主</p>
                                        </div>
                                        <div className='poster-img text-center my-2'>
                                            <img src={v.cover_photo} />
                                        </div>
                                        <div className='mt-2 mb-3 d-flex justify-content-center align-items-center'>
                                            <p className='size-7 me-1'>{v.name}</p>
                                            <div className='poster-gender'>
                                                {v.gender === '女' ? <BsGenderFemale /> : <BsGenderMale />}
                                            </div>
                                        </div>
                                        <hr className='poster-divider mb-4' />
                                        <div className='ms-3 mb-3 px-4'>
                                            <p className='size-7 mb-1'><BiSolidTimeFive /><span className='ms-1'>聯絡時段</span></p>
                                            <p>
                                                {v.contact_morning === 1 && '09:00~12:00 '}
                                                {v.contact_noon === 1 && '13:00~18:00 '}
                                                {v.contact_night === 1 && '19:00~21:00 '}
                                                {v.contact_morning === 0 && v.contact_noon === 0 && v.contact_night === 0 && '案主未填'}
                                            </p>
                                        </div>
                                        <div className='ms-3 mb-3 px-4'>
                                            <p className='size-7 mb-1'><MdEmail /><span className='ms-1'>E-mail</span></p>
                                            <p className='poster-email'>
                                                {v.email}
                                            </p>
                                        </div>
                                        {/* <button className="chat-btn btn-outline-confirm " onClick={handleButtonClick} >
                                            <PiWechatLogoThin />
                                            線上詢問
                                        </button>
                                        {userId && (    // 會員有登入時顯示這顆
                                            <button className="chat-btn btn-second d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleApplyClick}>
                                                <IoPaperPlaneOutline />
                                                立即應徵
                                            </button>
                                        )}
                                        {!userId && (   // 會員沒登入時顯示這顆
                                            <button className="chat-btn btn-second d-flex align-items-center justify-content-center" onClick={handleApplyClick}>
                                                <IoPaperPlaneOutline />
                                                立即應徵
                                            </button>
                                        )} */}

                                        {/* 新的 */}
                                        <div className="left-block-btns-group d-flex align-items-center">
                                            <button className="left-block-btn d-flex align-items-center justify-content-center" onClick={handleButtonClick} >
                                                <div className='left-block-icon'><PiWechatLogoThin /></div>
                                                <span>線上詢問</span>
                                            </button>
                                            {userId && (    // 會員有登入時顯示這顆
                                                <button className="left-block-btn apply-now-btn  d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleApplyClick}>
                                                    <div className='left-block-icon'> <IoPaperPlaneOutline /></div>
                                                    <span>立即應徵</span>
                                                </button>
                                            )}
                                            {!userId && (   // 會員沒登入時顯示這顆
                                                <button className="left-block-btn apply-now-btn d-flex align-items-center justify-content-center" onClick={handleApplyClick}>
                                                    <div className='left-block-icon'> <IoPaperPlaneOutline /></div>
                                                    <span>立即應徵</span>
                                                </button>
                                            )}


                                            {/* <button className="heart-icon" onClick={toggleFavorite}>
                                                {isFavorite  ? (
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
                                            </button> */}
                                        </div>


                                    </div>
                                </aside>
                                <aside className='post-user mt-4'>
                                    <div className='mt-3 p-4'>
                                        <div className=' d-flex '>
                                            <p className='size-6'>熱門任務</p>
                                        </div>
                                        <div>
                                            <InteractiveCard popularMissions={popularMissions} setPopularMissions={setPopularMissions} />
                                        </div>
                                    </div>
                                </aside>

                            </div>
                            <div className='right col-12 col-lg-9'>
                                <header className='mt-3 py-4 px-5 position-relative'>
                                    <div className=' d-flex '>
                                        <p className='header-font'>案件編號：{v.pid}</p>
                                        <img className='position-absolute' src={isFavorite ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorite ? "已收藏" : "未收藏"} onClick={toggleFavorite} />
                                    </div>

                                    <h2 className='size-5'>{v.title}</h2>
                                    <p className='size-7 mt-3 header-font'>刊登日期：{formatDate(v.post_date)}</p>
                                    <div className='d-flex mt-2 justify-content-between'>
                                        <p className='size-7 header-font'>最後更新：{formatDate(v.update_date)}</p>
                                        <p className='size-7 header-font'>已有 {recordCount.user_count} 人應徵</p>
                                    </div>

                                </header>
                                <section className='description my-4 py-1 '>
                                    <div className="item d-flex flex-column ">
                                        <div className="item-title size-6">
                                            預算金額
                                        </div>
                                        <hr class="item-divider" />
                                        <p className="size-7 d-flex align-items-center ms-4 ms-sm-0 salary mt-2 mt-sm-0">NT$ {v.price} / 次</p>
                                    </div>
                                    <div className="item d-flex flex-column">
                                        <div className="item-title size-6">
                                            任務日期
                                        </div>
                                        <hr class="item-divider" />
                                        <p className="size-7 d-flex align-items-center ms-4 ms-sm-0 mt-2 mt-sm-0 item-content">{v.start_date === v.end_date ? formatDate(v.start_date) : `${formatDate(v.start_date)}～${formatDate(v.end_date)}`}</p>
                                    </div>
                                    <div className="item d-flex flex-column mission-place">
                                        <div className="item-title size-6">
                                            任務地點
                                        </div>
                                        <hr class="item-divider" />
                                        <p className="size-7 d-flex align-items-center ms-4 ms-sm-0 mt-2 mt-sm-0 item-content">{v.city}{v.area}{v.location_detail}</p>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <MapComponent key={`map-${missionLocation.lat}-${missionLocation.lng}`} lat={missionLocation.lat} lng={missionLocation.lng} />
                                    </div>

                                    <CustomHTMLRenderer htmlContent={v.description} />

                                    <div className="item d-flex flex-column ">
                                        <div className="item-title size-6">
                                            任務類型
                                        </div>
                                        <hr class="item-divider" />
                                        <p className="size-7 d-flex align-items-center ms-4 ms-sm-0 mt-2 mt-sm-0 item-content"> {(() => {
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
                                    <div className="item d-flex flex-column ">
                                        <div className="item-title size-6">
                                            支付方式
                                        </div>
                                        <hr class="item-divider" />
                                        <p className="size-7 d-flex align-items-center ms-4 ms-sm-0 mt-2 mt-sm-0 item-content">{(() => {
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
                                    {/* <Demo /> */}
                                </section>
                            </div>
                        </main>


                    </div>
                )
            })
            }
            {/* <Footer /> */}
            {/* <MissionDetailSticky userId={userId} mission_id={mission_id} setMessage={setMessage} isLoading={isLoading} setIsLoading={setIsLoading} message={message} /> */}
        </>
    )
}