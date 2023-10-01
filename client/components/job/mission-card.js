import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"

// 使圖片高度與寬度同寬
function ImageWithEqualDimensions({ file_path }) {
    const imgRef = useRef(null);

    // 使得圖片高度會在螢幕大小改變時跟著改變 而非在重整時才改變
    const handleResize = () => {
        const image = imgRef.current;
        const imageWidth = image.offsetWidth;
        image.style.height = imageWidth + 'px';
    };

    useEffect(() => {
        // 獲取圖片元素的引用
        const image = imgRef.current;
        // 獲取圖片的寬度
        const imageWidth = image.offsetWidth;
        // 將寬度值分配给高度
        image.style.height = imageWidth + 'px';
        // 添加螢幕大小變化事件監聽器
        window.addEventListener('resize', handleResize);
        // 在組件卸載時移除事件監聽器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="mission-img">
            <img
                ref={imgRef}
                src={file_path}
                alt="任務"
            />
        </div>
    );
}

export default function MissionCard() {
    const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); // 切換收藏狀態
    };

    const [allMissions, setAllMissions] = useState([]);

    const getAllMissions = async () => {
        try {
            const response = await axios.get("http://localhost:3005/api/mission/all-missions");
            const data = response.data.data;
            console.log(data);
            setAllMissions(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        getAllMissions()
    }, [])




    return (
        <>
            {allMissions.map((v, i) => {
                return (
                    <div className='col-6 col-md-4 col-lg-6 col-xl-4'>
                        <div className='mission-list-card '>
                            <ImageWithEqualDimensions file_path={v.file_path} />
                            <div className='mission-content mx-1 mt-2'>
                                <div className='title size-6'>{v.title}</div>
                                <div className='d-flex justify-content-between mt-2'>
                                    <div className='size-7'>{v.city}{v.area}<br />{v.post_date}</div>
                                    <img src={isFavorite ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorite ? "已收藏" : "未收藏"} onClick={toggleFavorite} />
                                </div>
                                <div className='d-flex justify-content-between align-items-end price'>
                                    <div  >單次<span className='size-6'> NT${v.price}</span></div>
                                    <button className='btn-confirm size-6'>應徵</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>
    )




}

