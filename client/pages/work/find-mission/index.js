import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"
// components
import RoleSelection from '@/components/job/role-selection'
// 用 {} 導入的內容是命名導出的，而不加{}導入的內容是默認導出的。
import LatestMission, { MobileLatestMission } from '@/components/job/latest-mission'
import Search from '@/components/job/search'
import Filter from '@/components/job/filter'
import MissionCard from '@/components/job/mission-card'
import Pagination from '@/components/pagination';
// react-icons
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const MobileFilter = () => {
  return (
    <Swiper slidesPerView="auto" className="mobile-filter">
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="服務類型"
          src={"/job-icon/plus-service.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="薪資"
          src={"/job-icon/Heart-price.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="地區"
          src={"/job-icon/Discovery-date.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="貓數量"
          src={"/job-icon/edit.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="貓年齡"
          src={"/job-icon/Calendar.svg"}
        />
      </SwiperSlide>
    </Swiper>
  );
};

const Sort = () => {
  const [isUpIconVisible, setIsUpIconVisible] = useState(false);
  const [isPriceIconVisible, setIsPriceIconVisible] = useState(false);

  const toggleUpIcon = () => {
    setIsUpIconVisible(!isUpIconVisible);

    // 如果薪資按鈕已經是 $text-main，則切換薪資按鈕回 $text-mark
    if (isPriceIconVisible) {
      setIsPriceIconVisible(false);
    }
  };

  const togglePriceIcon = () => {
    setIsPriceIconVisible(!isPriceIconVisible);

    // 如果刊登時間按鈕已經是 $text-main，則切換刊登時間按鈕回 $text-mark
    if (isUpIconVisible) {
      setIsUpIconVisible(false);
    }
  };

  return (
    <>
      <div className='sort ' >
        <div className='sort-btn d-flex   justify-content-center text-align-center'>
          <button className={`size-7 m-1 p-1 ${isUpIconVisible ? 'active' : ''}`} onClick={toggleUpIcon}>
            刊登時間 {isUpIconVisible ? <FaCaretUp /> : <FaCaretDown />}
          </button>
          <button className={`size-7 m-1 p-1 ${isPriceIconVisible ? 'active' : ''}`} onClick={togglePriceIcon}>
            薪資 {isPriceIconVisible ? <FaCaretUp /> : <FaCaretDown />}
          </button>
        </div>
      </div>
    </>
  )
}

export default function MissionList() {

  const [allMissions, setAllMissions] = useState([])
  const getAllMissions = async () => {
    await axios.get("http://localhost:3005/api/mission/all-missions")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setAllMissions(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    getAllMissions()
  }, [])

  return (
    <>
      <div className='container pb-5 my-3 find-mission'>
        <div>麵包屑放這裡 </div>
        <div className='d-flex flex-column flex-md-row justify-content-between mt-3'>
          <RoleSelection />
          <Search />
        </div>
        <div className='d-flex justify-content-between align-items-center my-md-3 position-relative'>
          <div className='filters '>
            <MobileFilter />
          </div>
          <button className='add-mission-btn-pc  d-none d-lg-block position-absolute'><img src='/add-mission.svg' className='me-2' />新增任務</button>
          <button className='add-mission-btn-mobile size-6 d-bolck d-lg-none'><img src='/add-mission.svg' className='' /></button>
        </div>

        <div className='d-flex my-2'>
          <Sort />
        </div>

        <section className='d-flex all-mission flex-column flex-lg-row mt-3'>
          {/* 最新任務桌機 */}
          <div className='latest-mission latest-mission-pc d-none d-lg-flex flex-column'>
            <h3 className='size-4  '>最新任務</h3>
            <LatestMission />
            
          </div>
          {/* 最新任務手機 */}
          <div className='latest-mission latest-mission-mobile d-lg-none mb-3 mt-1'>
            <h3 className='size-4'>最新任務</h3>
            <MobileLatestMission />
          </div>
          {/* 任務列表 */}
          <div className='mission-list d-lg-flex justify-content-center'>
            {/* 不能使用d-flex d-lg-block block會導致MissionCard垂直排列 */}
            <div className='row d-flex mb-3 g-3 g-md-4'>
              {/* 使用g-3 不用justify-content-between 預設是start 卡片就會照順序排列 */}
              <MissionCard />
            </div>
          </div>
        </section>
        <Pagination />
      </div>

    </>
  )
}


