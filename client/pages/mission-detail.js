import React, { useState } from 'react'
import Footer from '@/components/footer'
import { IoPaperPlaneOutline } from "react-icons/io5";
import { PiWechatLogoThin } from "react-icons/pi";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function MissionDetail() {
    const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); // 切換收藏狀態
    };
    return (
        <>
            <div className='container mission-detail'>
                <div>麵包屑放這裡</div>
                <header className='mt-3 p-4'>
                    <p>案件編號：2685xy</p>
                    <h2 className='size-3'>新北9/20~9/25 貓咪代餵</h2>
                    <p className='size-6 mt-3'>刊登日期：2023/08/19</p>
                    <p className='size-6 mt-2'>最後更新：2023/08/20</p>
                </header>
                <section className='description'>
                    <div className="item">
                        <div className="item-title size-5">
                            預算金額：
                            <span className="size-6">NT$ 1,200 / 天</span>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item-title size-5">
                            任務日期：<span className="size-6">2023/9/20~2023/9/25</span>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item-title size-5">
                            任務地點：<span className="size-6">新北市三重區</span>
                        </div>
                        <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28912.322574287376!2d121.48607389999998!3d25.066622449999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a8de05921eb3%3A0xe818cd4640a88cc6!2zMjQx5paw5YyX5biC5LiJ6YeN5Y2A!5e0!3m2!1szh-TW!2stw!4v1695367764015!5m2!1szh-TW!2stw" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
                    </div>
                    <div className="item">
                        <div className="item-title size-5">詳細說明</div>
                        <ul className="item-content size-6">
                            <li>幫我照顧兩隻貓咪</li>
                            <li>
                                <p>你需要：</p>
                                <p>📍打掃貓咪弄髒的地方（貓咪有嘔吐的話要幫我撿）</p>
                                <p>📍清理貓砂</p>
                                <p>📍清洗貓咪的飲水機</p>
                                <p>📍需幫我餵罐頭</p>
                                <p>📍確認網路是否正常（如果斷線要幫我重新插插頭）</p>
                            </li>
                            <li>一次約20分鐘內可以完成</li>
                            <li>家中有監視器不介意再應徵</li>
                            <li>希望你家中也有寵物，絕對不能使用任何帶有強迫或暴力的動作對貓咪，喜歡貓咪佳</li>
                        </ul>

                    </div>
                </section>
            </div>
            
            <Footer />
            <section className="ask-and-apply d-flex justify-content-center align-items-center position-relative">
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
                <button className="ask-and-apply-btn btn-second d-flex align-items-center justify-content-center">
                    <IoPaperPlaneOutline />
                    立即應徵
                </button>
            </section>
        </>
    )
}




