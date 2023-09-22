import React, { useState }  from 'react'

export default function MissionCard() {
    const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); // 切換收藏狀態
    };
    return (
        <>
            <div className='mission-list-card'>
                <div className='mission-img'>
                    <img src="/kitten.jpg" alt="任務" />
                </div>
                <div className='mission-content mx-1 mt-2'>
                    <div className='title size-6'>雙十連假顧貓 對我的貓好一點 測試換行</div>
                    <div className='d-flex justify-content-between mt-2'>
                        <div>台中市大甲區<br />2023-08-21</div>
                        <img src={isFavorite ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorite ? "已收藏" : "未收藏"} onClick={toggleFavorite} />
                    </div>
                    <div className='d-flex justify-content-between align-items-end price'>
                        <div >單次<span className='size-6'> NT$140</span></div>
                        <button className='btn-confirm size-6'>應徵</button>
                    </div>
                </div>
            </div>
        </>
    )
}
