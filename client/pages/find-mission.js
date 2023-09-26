import React, { useState, useEffect, useRef } from 'react'
import RoleSelection from '@/components/job/role-selection'
// 用 {} 導入的內容是命名導出的，而不加{}導入的內容是默認導出的。
import LatestMission, { MobileLatestMission } from '@/components/job/latest-mission'
import Search from '@/components/job/search'
import Filter from '@/components/job/filter'
import MissionCard from '@/components/job/mission-card'
import Footer from '@/components/footer'


export default function MissionList() {
  return (
    <>
      <div className='container pb-5'>
        <div>麵包屑放這裡 </div>
        <div className='d-flex flex-column flex-md-row justify-content-between mt-3'>
          <RoleSelection />
          <Search />
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex '>
            <Filter />
            <Filter />
            {/* <Filter /> */}
          </div>
          <button className='add-mission-btn-pc btn-confirm size-6 d-none d-sm-block'><img src='/add-mission.svg' className='me-2' />新增任務</button>
          <button className='add-mission-btn-mobile btn-confirm size-6 d-bolck d-sm-none'><img src='/add-mission.svg' className='' /></button>
        </div>
        <section className='d-flex all-mission flex-column flex-md-row'>
          <div className='latest-mission d-none d-md-flex flex-column'>
            <h3 className='size-4  '>最新任務</h3>
            <LatestMission />
            <LatestMission />
          </div>
          <div className='latest-mission d-md-none'>
            <h3 className='size-4'>最新任務</h3>
            <MobileLatestMission/>
          </div>
          <div className='mission-list d-none d-md-flex justify-content-between '>
            {/* 不能使用d-flex d-md-block block會導致MissionCard垂直排列 */}
            <MissionCard />
            <MissionCard />
            <MissionCard />
          </div>
          <div className="mission-list d-flex d-md-none justify-content-between">
            {/* <MobileMissionCard /> */}
          </div>
        </section>

      </div>
      <Footer />

    </>
  )
}


