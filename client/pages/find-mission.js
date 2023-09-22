import React from 'react'
import RoleSelection from '@/components/job/role-selection'
import LatestMission from '@/components/job/latest-mission'
import Search from '@/components/job/search'
import Filter from '@/components/job/filter'
import MissionCard from '@/components/job/mission-card'
import Footer from '@/components/footer'

export default function MissionList() {
  return (
    <>
      <div className='container pb-5'>
        <div>麵包屑放這裡</div>
        <div className='d-flex justify-content-between mt-3'>
          <RoleSelection />
          <Search />
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex'>
            <Filter />
            <Filter />
            <Filter />
          </div>
          <button className='add-mission-btn btn-confirm size-6'><img src='/add-mission.svg' className='me-2' />新增任務</button>
        </div>
        <section className='d-flex all-mission'>
          <div className='latest-mission'>
            <h3 className='size-4'>最新任務</h3>
            <LatestMission />
            <LatestMission />
          </div>
          <div className='mission-list d-flex justify-content-between'>
            <MissionCard />
            <MissionCard />
            <MissionCard />
          </div>
        </section>
       
      </div>
      <Footer />

    </>
  )
}
