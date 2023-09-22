import React from 'react'
import RoleSelection from '@/components/job/role-selection'
import LatestMission from '@/components/job/latest-mission'
import Search from '@/components/job/search'
import Filter from '@/components/job/filter'

export default function MissionList() {
  return (
    <>
      <div className='container'>
        <h1>小貓上工列表</h1>
        <div className='d-flex justify-content-between'>
          <RoleSelection />
          <Search />
        </div>
        <div className='d-flex'>
          <Filter />
          <Filter />
          <Filter />
        </div>

        <div className='latest-mission'>
          <h3 className='size-4'>最新任務</h3>
          <LatestMission />
          <LatestMission />
        </div>
        <div className='mission-list'>

        </div>
      </div>

    </>
  )
}
