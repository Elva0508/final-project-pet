import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"
import Link from "next/link";
// components
import RoleSelection from '@/components/job/role-selection'
// 用 {} 導入的內容是命名導出的，而不加{}導入的內容是默認導出的。
import LatestMission, { MobileLatestMission } from '@/components/job/latest-mission'
import Search from '@/components/job/search'
import Filter from '@/components/job/filter'
// import MissionCard from '@/components/job/mission-card'
import Pagination from '@/components/pagination';
// react-icons
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// 篩選
const MobileFilter = () => {
  return (
    <Swiper slidesPerView="auto" className="mobile-filter">
      <SwiperSlide>
        <Filter
          items={["到府照顧", "安親寄宿", "到府美容", "行為訓練", "醫療護理"]}
          title="任務類型"
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

// 排序
const Sort = ({ sortOrder, setSortOrder, setSortBy }) => {
  const [isDownIconVisible, setIsDownIconVisible] = useState(false);
  const [isPriceIconVisible, setIsPriceIconVisible] = useState(false);

  const toggleDownIcon = () => {
    setIsDownIconVisible(!isDownIconVisible);
    setIsPriceIconVisible(false); // 重置價格排序圖標

    if (!isDownIconVisible) {
      // 按下刊登時間，切換為降序(10/27-9/2)
      setSortOrder("desc");
    } else {
      // 未按刊登時間，切換為升序
      setSortOrder("asc");
    }
    setSortBy("post_date"); // 按刊登時間排序
  };

  const togglePriceIcon = () => {
    setIsPriceIconVisible(!isPriceIconVisible);
    setIsDownIconVisible(false); // 重置刊登時間排序圖標

    if (!isPriceIconVisible) {
      // 按下價格，切換為降序
      setSortOrder("desc");
    } else {
      // 未按價格，切換為升序
      setSortOrder("asc");
    }

    setSortBy("price"); // 按價格排序
  };

  useEffect(() => {
    console.log("現在是" + sortOrder);
  }, [sortOrder]);

  return (
    <>
      <div className='sort ' >
        <div className='sort-btn d-flex   justify-content-center text-align-center'>
          <button className={`size-7 m-1 p-1 ${isDownIconVisible ? 'active' : ''}`} onClick={toggleDownIcon}>
            刊登時間 {isDownIconVisible ? <FaCaretDown /> : <FaCaretUp />}
          </button>
          <button className={`size-7 m-1 p-1 ${isPriceIconVisible ? 'active' : ''}`} onClick={togglePriceIcon}>
            薪資 {isPriceIconVisible ? <FaCaretDown /> : <FaCaretUp />}
          </button>
        </div>
      </div>
    </>
  )
}

// 使任務卡片的圖片高度與寬度同寬
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

// 任務卡片
const MissionCard = ({ sortOrder, sortBy }) => {
  const [allMissions, setAllMissions] = useState([]);

  const getAllMissions = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/mission/all-missions?sortOrder=${sortOrder}&sortBy=${sortBy}`);
      const data = response.data.data;
      console.log(data);
      setAllMissions(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getAllMissions()
  }, [sortOrder]) // 当排序方式发生变化时重新获取数据

  // 格式化日期
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  // 為每個卡片創建獨立的isFavorite狀態數組
  const [isFavorites, setIsFavorites] = useState(allMissions.map(() => false));

  const toggleFavorite = (index) => {
    const newFavorites = [...isFavorites];
    newFavorites[index] = !newFavorites[index];
    setIsFavorites(newFavorites);
  };

  return (
    <>
      {allMissions.map((v, i) => {
        return (
          <div className='col-6 col-md-4 col-lg-6 col-xl-4' key={v.mission_id}>

            <div className='mission-list-card '>
              <Link href={`/work/find-mission/${v.mission_id}`} >
                <ImageWithEqualDimensions file_path={v.file_path} />
              </Link>
              <div className='mission-content mx-1 mt-2'>
                <Link href={`/work/find-mission/${v.mission_id}`} >
                  <div className='title size-6'>{v.title}</div>
                </Link>
                <div className='d-flex justify-content-between mt-2'>
                  <div className='size-7'>{v.city}{v.area}<br />{formatDate(v.post_date)}</div>
                  <img src={isFavorites[i] ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorites[i] ? "已收藏" : "未收藏"} onClick={() => toggleFavorite(i)} />
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

export default function MissionList() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("post_date");
  console.log(`http://localhost:3005/api/mission/all-missions?sortOrder=${sortOrder}&sortBy=${sortBy}`);

  // const [allMissions, setAllMissions] = useState([]);

  // const getAllMissions = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3005/api/mission/all-missions?sortOrder=${sortOrder}`);
  //     const data = response.data.data;
  //     console.log(data);
  //     setAllMissions(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  // useEffect(() => {
  //   getAllMissions()
  // }, [sortOrder])

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
          <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy} />
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
          <div className='mission-list d-lg-flex justify-content-center align-items-start'>
            {/* 不能使用d-flex d-lg-block block會導致MissionCard垂直排列 */}
            <div className='row d-flex mb-3 g-3 g-md-4'>
              {/* 使用g-3 不用justify-content-between 預設是start 卡片就會照順序排列 */}
              <MissionCard sortOrder={sortOrder} sortBy={sortBy} />
            </div>
          </div>
        </section>
        <Pagination />
      </div>

    </>
  )
}


