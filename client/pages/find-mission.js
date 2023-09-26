import React, { useState, useEffect, useRef } from 'react'
import RoleSelection from '@/components/job/role-selection'
// 用 {} 導入的內容是命名導出的，而不加{}導入的內容是默認導出的。
import LatestMission, { MobileLatestMission } from '@/components/job/latest-mission'
import Search from '@/components/job/search'
import Filter from '@/components/job/filter'
import MissionCard, { MobileMissionCard } from '@/components/job/mission-card'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
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
          title="服務費用"
          src={"/job-icon/Heart-price.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={["測試1", "測試2"]}
          title="服務地區"
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

export default function MissionList() {
  return (
    <>
      <div className='container pb-5 my-3 find-mission'>
        <div>麵包屑放這裡 </div>
        <div className='d-flex flex-column flex-md-row justify-content-between mt-3'>
          <RoleSelection />
          <Search />
        </div>
        <div className='d-flex justify-content-between align-items-center my-md-3'>
          <div className='filters '>
            <MobileFilter />
          </div>
          <button className='add-mission-btn-pc   d-none d-lg-block'><img src='/add-mission.svg' className='me-2' />新增任務</button>
          <button className='add-mission-btn-mobile size-6 d-bolck d-lg-none'><img src='/add-mission.svg' className='' /></button>
        </div>
        <section className='d-flex all-mission flex-column flex-md-row'>
          <div className='latest-mission d-none d-md-flex flex-column'>
            <h3 className='size-4  '>最新任務</h3>
            <LatestMission />
            <LatestMission />
          </div>
          <div className='latest-mission d-md-none'>
            <h3 className='size-4'>最新任務</h3>
            <MobileLatestMission />
          </div>
          <div className='mission-list d-none d-md-flex flex-column justify-content-center'>
            {/* 不能使用d-flex d-md-block block會導致MissionCard垂直排列 */}
            <div className='row d-flex justify-content-between mb-3'>
              <div className='col-4'>
                <MissionCard />
              </div>
              <div className='col-4'>
                <MissionCard />
              </div>
              <div className='col-4'>
                <MissionCard />
              </div>
            </div>
            <div className='row  d-flex justify-content-between mb-3'>
              <div className='col-6 col-md-4'>
                <MissionCard />
              </div>
              <div className='col-6 col-md-4'>
                <MissionCard />
              </div>
              <div className='col-6 col-md-4'>
                <MissionCard />
              </div>
            </div>

          </div>
          <div className="mission-list d-flex d-md-none  flex-column">
            <div className='row  d-flex justify-content-between mb-3'>
              <div className='col-6'>
                <MobileMissionCard />
              </div>
              <div className='col-6'>
                <MobileMissionCard />
              </div>
            </div>
            <div className='row  d-flex justify-content-between mb-3'>
              <div className='col-6'>
                <MobileMissionCard />
              </div>
              <div className='col-6'>
                <MobileMissionCard />
              </div>
            </div>
          </div>
        </section>

      </div>

    </>
  )
}


