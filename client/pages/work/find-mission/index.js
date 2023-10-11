import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
// components
import RoleSelection from "@/components/job/role-selection";
// 用 {} 導入的內容是命名導出的，而不加{}導入的內容是默認導出的。
// import LatestMission, {
//   MobileLatestMission,
// } from "@/components/job/latest-mission";
// import Search from "@/components/job/search";
// import Filter from '@/components/job/filter'
// import MissionCard from '@/components/job/mission-card'
import Pagination from "@/components/pagination";
// react-icons
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// Filter
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// 地區篩選
// import { Cascader } from '@douyinfe/semi-ui';
import { Cascader } from "antd";
import cityData from "@/data/CityCountyData.json";

// 搜尋
const Search = ({ placeholder, color, onClick, search, setSearch, inputValue, setInputValue, setActivePage, setMissionType, setUpdateDate, setMissionCity, setMissionArea, setSortOrder, setSortBy, setButtonText1, setButtonText2, setSelectedCity, setSelectedArea }) => {
  const rippleBtnRef = useRef(null);
  const inputRef = useRef(null);
  const handleRipple = () => {
    const btn = rippleBtnRef.current;
    btn.classList.add("ripple");
    setTimeout(() => {
      btn.classList.remove("ripple");
    }, 500); //動畫持續時間結束後移除動畫效果，讓動畫可以重複使用
  };

  const handleSearch = () => {
    // 清空篩選的資料
    setMissionType(null);
    setUpdateDate(null);
    setMissionCity(null);
    setMissionArea(null);
    setButtonText1('任務類型');
    setButtonText2('更新時間');
    setSelectedCity(null);
    setSelectedArea(null);
    setSortOrder('asc');
    setSortBy('post_date');
    // 依據input進行搜尋
    setSearch(inputValue);
    // 清空輸入框的值
    setInputValue("");
    console.log("按了搜尋按鈕的inputValue是" + inputValue)
    console.log("按了搜尋按鈕的search是" + search)
    setActivePage(1);
  };

  return (
    <div className="job-search">
      <input
        id="search-input"
        type="text"
        placeholder={placeholder || ""}
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          console.log(e.target.value);
          // 不在這裡觸發搜尋，而是更新 inputValue 狀態
          setInputValue(e.target.value);
          console.log("輸入時的inputValue是" + inputValue)
        }}
      />
      <button
        onClick={() => {
          handleRipple();
          handleSearch();
          if (onClick) {
            onClick(inputRef.current.value);
          }
        }}
        ref={rippleBtnRef}
      >
        <BiSearchAlt className="job-search-icon" />
      </button>
    </div>
  );
};

// 最終版篩選
const MyFilter = ({ missionType, setMissionType, missionCity, setMissionCity, missionArea, setMissionArea, updateDate, setUpdateDate, sortOrder, setSortOrder, sortBy, setSortBy, setActivePage, buttonText1, setButtonText1, buttonText2, setButtonText2, selectedCity, setSelectedCity, selectedArea, setSelectedArea }) => {

  // 三：處理任務city下拉選單項的點擊事件
  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedArea(null);
    // console.log(`選中的值是: ${selectedCity}`);
    console.log(`選中的城市是: ${city.CityName}`);
    setMissionCity(city.CityName);
    setMissionArea(null); // 要重置area 第二次篩city才能正常
    // console.log(`選中的missionCity是: ${missionCity}`);
    setActivePage(1);
  };

  // 立即更新missionCity的值 否則第一次點擊會是null(因為異步)
  useEffect(() => {
    console.log(`選中的missionCity是: ${missionCity}`);
    console.log(`"現在是接"+http://localhost:3005/api/mission/all-missions?missionType=${missionType}&missionCity=${missionCity}&missionArea=${missionArea}&sortOrder=${sortOrder}&sortBy=${sortBy}`)
  }, [missionCity]);

  // 三：處理任務area下拉選單項的點擊事件
  const handleAreaChange = (area) => {
    setSelectedArea(area);
    console.log(`選中的地區是: ${area.AreaName}`);
    setMissionArea(area.AreaName);
    setActivePage(1);
  };

  useEffect(() => {
    console.log(`選中的missionArea是: ${missionArea}`);
    console.log(`"現在是接"++http://localhost:3005/api/mission/all-missions?missionType=${missionType}&missionCity=${missionCity}&missionArea=${missionArea}&sortOrder=${sortOrder}&sortBy=${sortBy}`)
  }, [missionArea]);

  // 任務類型選項
  const options1 = [
    { label: '到府照顧', value: 'feed' },
    { label: '安親寄宿', value: 'house' },
    { label: '到府美容', value: 'beauty' },
    { label: '行為訓練', value: 'training' },
    { label: '醫療護理', value: 'medical' },
  ];

  // 更新日期選項
  const options2 = [
    { label: '今天以內', value: 'today' },
    { label: '一週以內', value: 'one_week' },
    { label: '一個月內', value: 'one_month' },
  ];

  // 一：處理任務類型下拉選單項的點擊事件
  const handleItemClick1 = (label) => {
    // 獲取選項的value值
    const selectedValue = options1.find(option => option.label === label)?.value;
    // 更新按鈕文字
    setButtonText1(label);
    // 這裡可以使用selectedValue來執行其他操作
    console.log(`選中的值是: ${selectedValue}`);

    setMissionType(selectedValue);
    setActivePage(1);
  };

  // 二：處理更新日期下拉選單項的點擊事件
  const handleItemClick2 = (label) => {
    const selectedValue = options2.find(option => option.label === label)?.value;
    setButtonText2(label);
    console.log(`選中的值是: ${selectedValue}`);

    setUpdateDate(selectedValue);
    setActivePage(1);
  };

  // 清除篩選條件
  const clearFilters = () => {
    setMissionType(null);
    setUpdateDate(null);
    setMissionCity(null);
    setMissionArea(null);
    setButtonText1('任務類型');
    setButtonText2('更新時間');
    setSelectedCity(null);
    setSelectedArea(null);
    console.log("現在的missionType是" + missionType + "現在的updateDate是" + updateDate + "現在的missionCity是" + missionCity + "現在的missionArea是" + missionArea);
  };

  return (
    <>
      <div className='filters d-flex justify-content-center align-items-center '>
        {/* 一：任務類型 */}
        <div className="btn-group mx-2">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="defaultDropdown1"
            data-bs-toggle="dropdown"
            data-bs-auto-close="true"
            aria-expanded="false"
          >
            <div className="left-background"></div>
            <img src="/job-icon/plus-service.svg" className="me-3" />
            {buttonText1} {/* 按鈕文字狀態 */}
            <BiSolidDownArrow className="ms-2" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="defaultDropdown1">
            {/* 使用map函數動態生成下拉選單項 */}
            {options1.map((option) => (
              <li
                key={option.label}
                className="dropdown-item text-center"
                onClick={() => handleItemClick1(option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>

        {/* 二：更新日期 */}
        <div className="btn-group mx-2">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="defaultDropdown2"
            data-bs-toggle="dropdown"
            data-bs-auto-close="true"
            aria-expanded="false"
          >
            <div className="left-background"></div>
            <img src="/job-icon/Calendar.svg" className="me-3" />
            {buttonText2}
            <BiSolidDownArrow className="ms-2" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="defaultDropdown2">
            {options2.map((option) => (
              <li
                key={option.label}
                className="dropdown-item text-center"
                onClick={() => handleItemClick2(option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
        {/* 三：任務地區 */}
        {/* 城市下拉選單 */}
        <div className="btn-group ms-2">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="defaultDropdown1"
            data-bs-toggle="dropdown"
            data-bs-auto-close="true"
            aria-expanded="false"
          >
            <div className="left-background"></div>
            <img src="/job-icon/Discovery-date.svg" className="me-3" />
            {selectedCity ? selectedCity.CityName : '任務地區'}
            <BiSolidDownArrow className="ms-2" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="defaultDropdown1">
            {cityData.map((city) => (
              <li
                key={city.CityName}
                className="dropdown-item text-center"
                onClick={() => handleCityChange(city)}
              >
                {city.CityName}
              </li>
            ))}
          </ul>
        </div>
        {/* 地區下拉選單，有選city才會出現 */}
        {selectedCity && (
          <div className="btn-group">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="defaultDropdown1"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
            >
              {selectedArea ? selectedArea.AreaName : '選擇地區'}
              <BiSolidDownArrow className="ms-2" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="defaultDropdown1">
              {selectedCity.AreaList.map((area) => (
                <li
                  key={area.ZipCode}
                  className="dropdown-item text-center"
                  onClick={() => handleAreaChange(area)}
                >
                  {area.AreaName}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="btn-second ms-4 filter-button" onClick={clearFilters} >清除篩選</button>
      </div>
    </>
  );
};

// 排序
const Sort = ({ missionType, setMissionType, missionCity, setMissionCity, missionArea, setMissionArea, updateDate, setUpdateDate, sortOrder, setSortOrder, sortBy, setSortBy, search }) => {
  const [activeButton, setActiveButton] = useState("post_date");
  const [iconDirection, setIconDirection] = useState({}); // 用於跟蹤圖標方向

  const toggleButton = (sortBy) => {
    // 切換排序順序
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortBy(sortBy === "post_date" ? "post_date" : "price");
    setActiveButton(sortBy);

    // 更新圖標方向
    const newIconDirection = { ...iconDirection };
    newIconDirection[sortBy] = newSortOrder === "asc" ? "up" : "down";
    setIconDirection(newIconDirection);
  };

  useEffect(() => {
    console.log("現在是" + sortOrder);
    console.log(`排序現在是接+http://localhost:3005/api/mission/all-missions?missionType=${missionType}&updateDate=${updateDate}&missionCity=${missionCity}&missionArea=${missionArea}&sortOrder=${sortOrder}&sortBy=${sortBy}&missionSearch=${search}`)
  }, [sortOrder]);

  return (
    <>
      <div className="sort ">
        <div className="sort-btn d-flex justify-content-center text-align-center">
          <button
            className={`size-7 m-1 p-1 ${activeButton === "post_date" ? "active" : ""
              }`}
            onClick={() => toggleButton("post_date")}
          >
            刊登時間{" "}
            {iconDirection["post_date"] === "down" ? (
              <FaCaretDown />
            ) : (
              <FaCaretUp />
            )}
          </button>
          <button
            className={`size-7 m-1 p-1 ${activeButton === "price" ? "active" : ""
              }`}
            onClick={() => toggleButton("price")}
          >
            薪資{" "}
            {iconDirection["price"] === "down" ? (
              <FaCaretDown />
            ) : (
              <FaCaretUp />
            )}
          </button>
        </div>
      </div>
    </>
  );
};


// 最新任務（電腦版）
const LatestMission = () => {

  const [latestMissions, setLatestMissions] = useState([])

  const getLatestMissions = async () => {
    await axios.get("http://localhost:3005/api/mission/latest-missions")
      .then((response) => {
        const data = response.data.data;
        console.log("data是" + data);
        setLatestMissions(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    getLatestMissions()
  }, [])

  // 格式化日期
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  // 收藏
  const [isFavorites, setIsFavorites] = useState([]);

  useEffect(() => {
    // 在組件加載時從後端獲取已收藏的任務
    const fetchFavoriteMissions = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/mission/fav');
        const favoriteMissionIds = response.data.result.map((fav) => fav.mission_id);

        // 根據已收藏的任務和當前任務列表來初始化 isFavorites 數組
        const initialFavorites = latestMissions.map((mission) =>
          favoriteMissionIds.includes(mission.mission_id)
        );
        setIsFavorites(initialFavorites);
      } catch (error) {
        console.error('前端請求錯誤：', error);
      }
    };

    fetchFavoriteMissions();
  }, [latestMissions]);

  const toggleFavorite = async (index) => {
    try {
      const newFavorites = [...isFavorites];
      newFavorites[index] = !newFavorites[index];
      setIsFavorites(newFavorites); // 立即更新圖標狀態

      const missionId = latestMissions[index].mission_id;
      console.log(missionId)

      if (!isFavorites[index]) {
        // 如果任務未被收藏，發送加入收藏的請求
        await axios.put('http://localhost:3005/api/mission/add-fav', { missionId });
        console.log('已加入收藏');
      } else {
        // 如果任務已被收藏，發送取消收藏的請求
        await axios.delete('http://localhost:3005/api/mission/delete-fav', { data: { missionId } });
        console.log('已取消收藏');
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {latestMissions.map((v, i) => {
        return (
          <div className='latest-mission-card d-flex'>
            <Link href={`/work/find-mission/${v.mission_id}`} >
              <div className='mission-img'>
                <img src={v.file_path} alt="任務" />
              </div>
            </Link>
            <div className='mission-content ms-2'>
              <Link href={`/work/find-mission/${v.mission_id}`} >
                <div className='title size-6'>{v.title}</div>
              </Link>
              <div className='d-flex justify-content-between mt-1 mt-sm-2'>
                <div className='size-7'>{v.city}{v.area}<br />{formatDate(v.post_date)}</div>
                <img src={isFavorites[i] ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorites[i] ? "已收藏" : "未收藏"} onClick={() => toggleFavorite(i)} />
              </div>
              <div className='d-flex justify-content-between align-items-end price'>
                <div >單次<span className='size-6'> NT${v.price}</span></div>
                <button className='btn-confirm size-6'>應徵</button>
              </div>
            </div>
          </div>
        )
      })
      }
    </>
  )
}

// 最新任務（手機版）
const MobileLatestMission = () => {
  const [latestMissions, setLatestMissions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // 追蹤動畫狀態 防止多次快速點擊上一張或下一張按鈕 導致卡片重疊
  const [isAnimating, setIsAnimating] = useState(false);
  const [isIndicatorsDisabled, setIsIndicatorsDisabled] = useState(false);

  const getLatestMissions = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/mission/latest-missions");
      const data = response.data.data;
      setLatestMissions(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getLatestMissions();
  }, []);

  // 格式化日期
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true); // 開始動畫
      // 參數為先前的索引值（預設0）也就是當前活動的幻燈片索引
      setActiveIndex((prevIndex) => (prevIndex + 1) % latestMissions.length);  // 取餘數確保索引保持在有效範圍內
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true); // 開始動畫
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? latestMissions.length - 1 : prevIndex - 1
      );
    }
  };

  // 監聽過渡結束事件，並在過渡結束後重置 isAnimating
  // 在動畫完成後重置狀態以啟用按鈕
  useEffect(() => {
    const transitionEndHandler = () => {
      setIsAnimating(false);
      setIsIndicatorsDisabled(false);
    };

    const carousel = document.querySelector('.carousel-inner');
    carousel.addEventListener('transitionend', transitionEndHandler);

    // 組件卸載（或下一次 useEffect 執行時）時，移除之前附加的事件處理程序
    return () => {
      carousel.removeEventListener('transitionend', transitionEndHandler);
    };
  }, []);

  const handleIndicatorClick = (index) => {
    setIsIndicatorsDisabled(true);
    setActiveIndex(index);
  };

  // 收藏
  const [isFavorites, setIsFavorites] = useState([]);

  useEffect(() => {
    // 在組件加載時從後端獲取已收藏的任務
    const fetchFavoriteMissions = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/mission/fav');
        const favoriteMissionIds = response.data.result.map((fav) => fav.mission_id);

        // 根據已收藏的任務和當前任務列表來初始化 isFavorites 數組
        const initialFavorites = latestMissions.map((mission) =>
          favoriteMissionIds.includes(mission.mission_id)
        );
        setIsFavorites(initialFavorites);
      } catch (error) {
        console.error('前端請求錯誤：', error);
      }
    };

    fetchFavoriteMissions();
  }, [latestMissions]);

  const toggleFavorite = async (index) => {
    try {
      const newFavorites = [...isFavorites];
      newFavorites[index] = !newFavorites[index];
      setIsFavorites(newFavorites); // 立即更新圖標狀態

      const missionId = latestMissions[index].mission_id;
      console.log(missionId)

      if (!isFavorites[index]) {
        // 如果任務未被收藏，發送加入收藏的請求
        await axios.put('http://localhost:3005/api/mission/add-fav', { missionId });
        console.log('已加入收藏');
      } else {
        // 如果任務已被收藏，發送取消收藏的請求
        await axios.delete('http://localhost:3005/api/mission/delete-fav', { data: { missionId } });
        console.log('已取消收藏');
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="carouselExampleIndicators" className="carousel slide pb-3" data-bs-ride="carousel">
      <div className="carousel-indicators mt-5">
        {latestMissions.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            // className={index === activeIndex ? "active" : ""}
            // aria-current={index === activeIndex ? "true" : ""}
            // aria-label={`Slide ${index + 1}`}
            className={`${index === activeIndex ? "active" : ""} ${isIndicatorsDisabled ? "disabled" : ""}`}
            aria-current={index === activeIndex ? "true" : ""}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleIndicatorClick(index)}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {latestMissions.map((v, index) => (
          <div key={v.id} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
            <div className='latest-mission-card d-flex'>
              <div className='mission-img'>
                <img src={v.file_path} alt="任務" />
              </div>
              <div className='mission-content ms-2'>
                <div className='title size-6'>{v.title}</div>
                <div className='d-flex justify-content-between mt-1 mt-sm-2'>
                  <div className='size-7'>{v.city}{v.area}<br />{formatDate(v.post_date)}</div>
                  <img src={isFavorites[index] ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorites[index] ? "已收藏" : "未收藏"} onClick={() => toggleFavorite(index)} />
                </div>
                <div className='d-flex justify-content-between align-items-end price'>
                  <div >單次<span className='size-6'> NT${v.price}</span></div>
                  <button className='btn-confirm size-6'>應徵</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 上一張 */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" onClick={prevSlide}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      {/* 下一張 */}
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" onClick={nextSlide}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};



// 使任務卡片的圖片高度與寬度同寬
function ImageWithEqualDimensions({ file_path }) {
  const imgRef = useRef(null);

  // 使得圖片高度會在螢幕大小改變時跟著改變 而非在重整時才改變
  const handleResize = () => {
    const image = imgRef.current;
    const imageWidth = image.offsetWidth;
    image.style.height = imageWidth + "px";
  };

  useEffect(() => {
    // 獲取圖片元素的引用
    const image = imgRef.current;
    // 獲取圖片的寬度
    const imageWidth = image.offsetWidth;
    // 將寬度值分配给高度
    image.style.height = imageWidth + "px";
    // 添加螢幕大小變化事件監聽器
    window.addEventListener("resize", handleResize);
    // 在組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="mission-img">
      <img ref={imgRef} src={file_path} alt="任務" />
    </div>
  );
}

// 任務卡片（這邊的參數如果忘記設定會讓卡片出不來）
const MissionCard = ({ missionType, missionCity, missionArea, setMissionType, updateDate, setUpdateDate, sortOrder, setSortOrder, sortBy, setSortBy, allMissions, currentData }) => {

  // 格式化日期
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  // 收藏
  const [isFavorites, setIsFavorites] = useState([]);

  useEffect(() => {
    // 在組件加載時從後端獲取已收藏的任務
    const fetchFavoriteMissions = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/mission/fav');
        const favoriteMissionIds = response.data.result.map((fav) => fav.mission_id);

        // 根據已收藏的任務和當前任務列表來初始化 isFavorites 數組
        const initialFavorites = currentData.map((mission) =>
          favoriteMissionIds.includes(mission.mission_id)
        );
        setIsFavorites(initialFavorites);
      } catch (error) {
        console.error('前端請求錯誤：', error);
      }
    };

    fetchFavoriteMissions();
  }, [currentData]);

  const toggleFavorite = async (index) => {
    try {
      const newFavorites = [...isFavorites];
      newFavorites[index] = !newFavorites[index];
      setIsFavorites(newFavorites); // 立即更新圖標狀態

      const missionId = currentData[index].mission_id;
      console.log(missionId)

      if (!isFavorites[index]) {
        // 如果任務未被收藏，發送加入收藏的請求
        await axios.put('http://localhost:3005/api/mission/add-fav', { missionId });
        console.log('已加入收藏');
      } else {
        // 如果任務已被收藏，發送取消收藏的請求
        await axios.delete('http://localhost:3005/api/mission/delete-fav', { data: { missionId } });
        console.log('已取消收藏');
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {currentData.map((v, i) => {
        return (
          <div className="col-6 col-md-4 col-lg-6 col-xl-4" key={v.mission_id}>
            <div className="mission-list-card ">
              <Link href={`/work/find-mission/${v.mission_id}`}>
                <ImageWithEqualDimensions file_path={v.file_path} />
              </Link>
              <div className="mission-content mx-1 mt-2">
                <Link href={`/work/find-mission/${v.mission_id}`}>
                  <div className="title size-6">{v.title}</div>
                </Link>
                <div className="d-flex justify-content-between mt-2">
                  <div className="size-7">
                    {v.city}
                    {v.area}
                    <br />
                    {formatDate(v.post_date)}
                  </div>
                  <img
                    src={isFavorites[i] ? "/heart-clicked.svg" : "/heart.svg"}
                    alt={isFavorites[i] ? "已收藏" : "未收藏"}
                    onClick={() => toggleFavorite(i)}
                  />
                </div>
                <div className='d-flex justify-content-between align-items-end price'>
                  <div  >單次<span className='size-6'> NT${v.price}</span></div>
                  <Link href={`/work/find-mission/${v.mission_id}`} >
                    <button className='btn-confirm size-6'>應徵</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default function MissionList() {
  // 篩選
  const [missionType, setMissionType] = useState(null);
  const [updateDate, setUpdateDate] = useState(null);
  const [missionCity, setMissionCity] = useState("");
  const [missionArea, setMissionArea] = useState(null);
  // 篩選按鈕文字的狀態
  const [buttonText1, setButtonText1] = useState('任務類型');
  const [buttonText2, setButtonText2] = useState('更新時間');
  // 篩選地區文字的狀態
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  // 排序
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState('post_date');
  // 搜尋
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState("");



  const [allMissions, setAllMissions] = useState([]);

  const getAllMissions = async () => {
    try {
      let apiUrl = `http://localhost:3005/api/mission/all-missions?sortOrder=${sortOrder}&sortBy=${sortBy}`;

      if (missionType) {
        apiUrl += `&missionType=${missionType}`;
      }
      if (updateDate) {
        apiUrl += `&updateDate=${updateDate}`;
      }
      if (missionCity) {
        apiUrl += `&missionCity=${missionCity}`;
      }
      if (missionArea) {
        apiUrl += `&missionArea=${missionArea}`;
      }
      if (search) {
        apiUrl += `&missionSearch=${search}`;
      }
      const response = await axios.get(apiUrl);
      const data = response.data.data;
      console.log(data);
      setAllMissions(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllMissions()
  }, [missionType, updateDate, missionCity, missionArea, sortOrder, sortBy, search]) // 當篩選方式、排序方式發生變化時重新獲取數據（非常重要要記得！忘記好幾次）
  // 這邊不添加 inputValue 否則在input輸入時就直接即時搜尋

  useEffect(() => {
    // 在allMissions狀態更新後輸出內容
    console.log("allMissions是", allMissions);
  }, [allMissions]);

  // 分頁
  const itemsPerPage = 18;
  const [activePage, setActivePage] = useState(1);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = allMissions.slice(startIndex, endIndex);
  useEffect(() => {
    console.log("currentData這頁的資料是", currentData);
  }, [currentData]);


  // 在組件加載時重置篩選條件為默認值
  useEffect(() => {
    setMissionType(null);
    setUpdateDate(null);
    setMissionCity(null);
    setMissionArea(null);
    setSortOrder('asc');
    setSortBy('post_date');
    setInputValue('');
    setSearch("");
    // setSelectedCity(null); // 重置城市选择为 null 或默认值
    // setSelectedArea(null); // 重置地区选择为 null 或默认值
    console.log(`重載後是+http://localhost:3005/api/mission/all-missions?missionType=${missionType}&updateDate=${updateDate}&missionCity=${missionCity}&missionArea=${missionArea}&sortOrder=${sortOrder}&sortBy=${sortBy}&missionSearch=${search}`);
  }, []);

  const clearSettings = () => {
    setMissionType(null);
    setUpdateDate(null);
    setMissionCity(""); // 確保將其重置為空字符串
    setMissionArea(null);
    setSortOrder('asc');
    setSortBy('post_date');
    setInputValue('');
    setSearch("");
    // 任何其他你想要重置的狀態變數
    console.log("狀態變數已重置為預設值");
  };



  return (
    <>
      <div className="container pb-5 my-3 find-mission">
        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link href="/">首頁</Link>
            </li>
            <li class="breadcrumb-item" aria-current="page">
              <Link href="/work/find-mission" onclick={clearSettings}>任務總覽</Link>
            </li>
            {search ? (
              <>
                <li class="breadcrumb-item" aria-current="page">
                  搜尋結果
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {search}
                </li>
              </>
            ) : (
              <>
                <li class="breadcrumb-item" aria-current="page">
                  所有
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
          <RoleSelection defaultActive="mission" />
          <Search placeholder="搜尋任務" search={search} setSearch={setSearch} setActivePage={setActivePage} inputValue={inputValue} setInputValue={setInputValue} setMissionType={setMissionType} setUpdateDate={setUpdateDate} setMissionCity={setMissionCity} setMissionArea={setMissionArea} setSortOrder={setSortOrder} setSortBy={setSortBy} setButtonText1={setButtonText1} setButtonText2={setButtonText2} setSelectedCity={setSelectedCity} setSelectedArea={setSelectedArea} />
        </div>
        <div className='d-flex justify-content-between align-items-center mt-md-3 mb-md-4 position-relative'>
          <div className='filters d-flex justify-content-center align-items-center '>
            {/* <MobileFilter missionType={missionType} /> */}
            <MyFilter missionType={missionType} setMissionType={setMissionType} missionCity={missionCity} setMissionCity={setMissionCity} missionArea={missionArea} setMissionArea={setMissionArea}
              updateDate={updateDate} setUpdateDate={setUpdateDate} sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy} setActivePage={setActivePage} buttonText1={buttonText1} setButtonText1={setButtonText1} buttonText2={buttonText2} setButtonText2={setButtonText2} selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
          </div>
          <Link href="/work/create-mission" className="position-absolute add-mission-btn-pc-link">
            <button className="add-mission-btn-pc  d-none d-lg-block btn-confirm ">
              <img src="/add-mission.svg" className="me-2" />
              新增任務
            </button>
          </Link>
          <Link href="/work/create-mission">
            <button className="add-mission-btn-mobile size-6 d-bolck d-lg-none">
              <img src="/add-mission.svg" className="" />
            </button>
          </Link>
        </div>

        <div className='d-flex my-2'>
          <Sort missionType={missionType} setMissionType={setMissionType} missionCity={missionCity} setMissionCity={setMissionCity} missionArea={missionArea} setMissionArea={setMissionArea}
            updateDate={updateDate} setUpdateDate={setUpdateDate} sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        <section className="d-flex all-mission flex-column flex-lg-row mt-3">
          {/* 最新任務桌機 */}
          <div className="latest-mission latest-mission-pc d-none d-lg-flex flex-column">
            <h3 className="size-4  ">最新任務</h3>
            <LatestMission />
          </div>
          {/* 最新任務手機 */}
          <div className="latest-mission latest-mission-mobile d-lg-none mb-3 mt-1">
            <h3 className="size-4">最新任務</h3>
            <MobileLatestMission />
          </div>
          {/* 任務列表 */}
          <div className='mission-list d-lg-flex  justify-content-center align-items-start'>
            {/* 不能使用d-flex d-lg-block block會導致MissionCard垂直排列 */}
            <div className="row d-flex mb-3 g-3 g-md-4">
              {/* 使用g-3 不用justify-content-between 預設是start 卡片就會照順序排列 */}
              <MissionCard sortOrder={sortOrder} sortBy={sortBy} missionType={missionType} setMissionType={setMissionType} missionCity={missionCity} setMissionCity={setMissionCity} missionArea={missionArea} setMissionArea={setMissionArea}
                updateDate={updateDate} setUpdateDate={setUpdateDate} allMissions={allMissions} currentData={currentData} />
            </div>
          </div>
        </section>
        <Pagination itemsPerPage={itemsPerPage} total={allMissions} activePage={activePage} setActivePage={setActivePage} />
      </div>
    </>
  );
}
