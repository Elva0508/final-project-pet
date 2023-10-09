import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
// components
import RoleSelection from "@/components/job/role-selection";
// 用 {} 導入的內容是命名導出的，而不加{}導入的內容是默認導出的。
import LatestMission, {
  MobileLatestMission,
} from "@/components/job/latest-mission";
import Search from "@/components/job/search";
// import Filter from '@/components/job/filter'
// import MissionCard from '@/components/job/mission-card'
import Pagination from "@/components/pagination";
// react-icons
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
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


// 篩選-共用
const Filter = ({ items, src, onClick, order }) => {
  const dropDownRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log(event);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleOption = (e) => {
  //   console.log(e.target.getAttribute("value"));
  // };
  return (
    <div className="drop-down-filter" ref={dropDownRef}>
      <button
        className={`drop-down-filter-btn ${anchorEl ? "drop-down-active" : ""}`}
        onClick={handleClick}
      >
        <div
          className={`drop-down-filter-btn-icon ${
            anchorEl ? "drop-down-active" : ""
          }`}
        >
          <img src={src} />
        </div>
        {items.title || "選項"}
        <BiSolidDownArrow
          className={`icon icon-down ${!anchorEl ? "" : "d-none"}`}
        />
        <BiSolidUpArrow
          className={`icon icon-up ${anchorEl ? "" : "d-none"}`}
        />
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="drop-down-filter-menu"
      >
        {items?.children?.map((item) => {
          if (
            order &&
            order.value === item.value &&
            order.parentValue === items.value
          ) {
            return (
              <MenuItem
                disabled={true}
                onClick={() => {
                  handleClose();
                  if (onClick) {
                    onClick(item.value, items.value);
                  }
                }}
              >
                <span value={item.value}>{item.label}</span>
              </MenuItem>
            );
          }
          return (
            <MenuItem
              onClick={() => {
                handleClose();
                if (onClick) {
                  onClick(item.value, items.value);
                }
              }}
            >
              <span value={item.value}>{item.label}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};


// 篩選-自訂
const MobileFilter = ({ missionType, setMissionType, sortOrder, setSortOrder, setSortBy }) => {

  const [selectedTitles, setSelectedTitles] = useState({
    type: "任務類型",
    city: "地區",
    salary: "薪資",
    update: "更新日期",
  });

  const handleOptionClick = (selectedValue, filterType) => {
    setSelectedTitles((prevTitles) => ({
      ...prevTitles,
      [filterType]: selectedValue,
    }));
  };

  // 地區
  // const options = cityData.map((city) => {
  //   return {
  //     value: city.CityName,
  //     label: city.CityName,
  //     children: city.AreaList.map((area) => {
  //       return { value: area.ZipCode, label: area.AreaName };
  //     }),
  //   };
  // });
  // const [city, setCity] = useState(undefined);
  // const [area, setArea] = useState(undefined);
  // const onChange = (value, selectedOptions) => {
  //   console.log(value, selectedOptions);
  //     setCity(selectedOptions[0].label);
  //     setArea(selectedOptions[1].label);
  // };


  return (
    <Swiper slidesPerView="auto" className="mobile-filter">
      {/* <SwiperSlide>
        <Cascader
          options={options}
          onChange={onChange}
          placeholder="選擇縣市"
          className="location-select"
          popupClassName="location-cascader"
        />
      </SwiperSlide> */}
      <SwiperSlide>
        <Filter
          items={{
            title: selectedTitles["type"],
            value: "type",
            children: [
              { label: "到府照顧", value: "feed" },
              { label: "安親寄宿", value: "house" },
              { label: "到府美容", value: "beauty" },
              { label: "行為訓練", value: "training" },
              { label: "醫療護理", value: "medical" },
            ],
          }}
          src={"/job-icon/plus-service.svg"}
          onClick={(selectedValue) => handleOptionClick(selectedValue, "type")}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={{
            title: "地區",
            value: "city",
            children: [{ label: "", value: "" }],
          }}
          src={"/job-icon/Discovery-date.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={{
            title: "薪資",
            value: "salary",
            children: [{ label: "", value: "" }],
          }}
          src={"/job-icon/Heart-price.svg"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Filter
          items={{
            title: selectedTitles["update"],
            value: "update",
            children: [
              { label: "今日", value: "day" },
              { label: "一周內", value: "week" },
              { label: "一個月內", value: "month" },
            ],
          }}
          src={"/job-icon/Calendar.svg"}
          onClick={(selectedValue) => handleOptionClick(selectedValue, "update")}
        />
      </SwiperSlide>
    </Swiper>
  );
};

// 篩選-bootstrap
// const MyFilter = () => {
//   // 初始化按钮文本的状态
//   const [buttonText, setButtonText] = useState('任務類型');

//   // 处理下拉菜单项的点击事件
//   const handleItemClick = (text) => {
//     // 更新按钮文本
//     setButtonText(text);
//   };

//   // 地區
//   // const options = cityData.map((city) => {
//   //   return {
//   //     value: city.CityName,
//   //     label: city.CityName,
//   //     children: city.AreaList.map((area) => {
//   //       return { value: area.ZipCode, label: area.AreaName };
//   //     }),
//   //   };
//   // });
//   // const [city, setCity] = useState(undefined);
//   // const [area, setArea] = useState(undefined);
//   // const onChange = (value, selectedOptions) => {
//   //   console.log(value, selectedOptions);
//   //   setCity(selectedOptions[0].label);
//   //   setArea(selectedOptions[1].label);
//   // };
//   return (
//     <>
//       <div class="btn-group">
//         <button className="btn dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
//           <div class="left-background"></div>
//           <img src='/job-icon/plus-service.svg' className='me-3' />{buttonText}
//           <BiSolidDownArrow className='ms-2' />
//         </button>
//         <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
//           <li className="dropdown-item text-center" onClick={() => handleItemClick('到府照顧')}>到府照顧</li>
//           <li className="dropdown-item text-center" onClick={() => handleItemClick('安親寄宿')}>安親寄宿</li>
//           <li className="dropdown-item text-center" onClick={() => handleItemClick('到府美容')}>到府美容</li>
//           <li className="dropdown-item text-center" onClick={() => handleItemClick('行為訓練')}>行為訓練</li>
//           <li className="dropdown-item text-center" onClick={() => handleItemClick('醫療護理')}>醫療護理</li>
//         </ul>
//       </div>
//       <div class="btn-group">
//         <button class="btn dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
//           <div class="left-background"></div>
//           <img src='/job-icon/plus-service.svg' className='me-3' />任務地區
//           <BiSolidDownArrow className='ms-2' />
//         </button>
//         <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
//           <li className="dropdown-item text-center">到府照顧</li>
//         </ul>
//       </div>
//     </>
//   )
// }

// 單組
// const MyFilter = () => {
//   const [buttonText, setButtonText] = useState('任務類型');

//   const options = [
//     { label: '到府照顧', value: 'feed' },
//     { label: '安親寄宿', value: 'house' },
//     { label: '到府美容', value: 'beauty' },
//     { label: '行為訓練', value: 'training' },
//     { label: '醫療護理', value: 'medical' },
//   ];

//   // 處理下拉選單項的點擊事件
//   const handleItemClick = (label) => {
//     // 獲取選項的value值
//     const selectedValue = options.find(option => option.label === label)?.value;

//     // 更新按鈕文字
//     setButtonText(label);

//     // 這裡可以使用selectedValue來執行其他操作
//     console.log(`选中的值是: ${selectedValue}`);
//   };

//   return (
//     <>
//       <div className="btn-group">
//         <button
//           className="btn dropdown-toggle"
//           type="button"
//           id="defaultDropdown"
//           data-bs-toggle="dropdown"
//           data-bs-auto-close="true"
//           aria-expanded="false"
//         >
//           <div className="left-background"></div>
//           <img src="/job-icon/plus-service.svg" className="me-3" />
//           {buttonText} 
//           <BiSolidDownArrow className="ms-2" />
//         </button>
//         <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
//           {/* 使用map函數動態生成下拉選單項 */}
//           {options.map((option) => (
//             <li
//               key={option.label}
//               className="dropdown-item text-center"
//               onClick={() => handleItemClick(option.label)}
//             >
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// 只差地區
// const DropdownGroup = ({ buttonText, options, id, imgSrc }) => {
//   const [selectedText, setSelectedText] = useState(buttonText);

//   // 處理下拉選單項的點擊事件
//   const handleItemClick = (label) => {
//     // 獲取選項的value值
//     const selectedOption = options.find(option => option.label === label);
//     // 更新按鈕文字
//     setSelectedText(label);

//     // 這裡可以使用selectedValue來執行其他操作
//     console.log(`选中的值是: ${selectedOption.value}`);
//   };

//   return (
//     <div className="btn-group">
//       <button
//         className="btn dropdown-toggle"
//         type="button"
//         id={id}
//         data-bs-toggle="dropdown"
//         data-bs-auto-close="true"
//         aria-expanded="false"
//       >
//         <div className="left-background"></div>
//         <img src={imgSrc} className="me-3" /> {/* 使用傳遞的imgSrc */}
//         {selectedText}
//         <BiSolidDownArrow className="ms-2" />
//       </button>
//       <ul className="dropdown-menu" aria-labelledby={id}>
//         {/* 使用map函數動態生成下拉選單項 */}
//         {options.map((option) => (
//           <li
//             key={option.label}
//             className="dropdown-item text-center"
//             onClick={() => handleItemClick(option.label)}
//           >
//             {option.label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// 只差地區
// const MyFilter = () => {
//   const typeOptions = [
//     { label: '到府照顧', value: 'feed' },
//     { label: '安親寄宿', value: 'house' },
//     { label: '到府美容', value: 'beauty' },
//     { label: '行為訓練', value: 'training' },
//     { label: '醫療護理', value: 'medical' },
//   ];

//   const dateOptions = [
//     { label: '今日以內', value: 'today' },
//     { label: '一週以內', value: 'one_week' },
//     { label: '一個月內', value: 'one_month' },
//   ];

//   const cityOptions = [
//     { label: '', value: '' },
//   ];

//   return (
//     <>
//       <DropdownGroup
//         buttonText="任務類型"
//         options={typeOptions}
//         id="jobDropdown"
//         imgSrc="/job-icon/plus-service.svg"
//       />

//       <DropdownGroup
//         buttonText="更新日期"
//         options={dateOptions}
//         id="dateDropdown"
//         imgSrc="/job-icon/Calendar.svg"
//       />

//       <DropdownGroup
//         buttonText="任務地區"
//         options={cityOptions}
//         id="dateDropdown"
//         imgSrc="/job-icon/Discovery-date.svg"
//       />
//     </>
//   );
// };


// 最終版篩選
const MyFilter = ({ missionType, setMissionType, missionCity, setMissionCity, missionArea, setMissionArea, updateDate, setUpdateDate, sortOrder, setSortOrder, sortBy, setSortBy }) => {
  // 按鈕文字的狀態
  const [buttonText1, setButtonText1] = useState('任務類型');
  const [buttonText2, setButtonText2] = useState('更新時間');

  // 地區狀態
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  // 三：處理任務city下拉選單項的點擊事件
  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedArea(null);
    // console.log(`選中的值是: ${selectedCity}`);
    console.log(`選中的城市是: ${city.CityName}`);
    setMissionCity(city.CityName);
    setMissionArea(null); // 要重置area 第二次篩city才能正常
    // console.log(`選中的missionCity是: ${missionCity}`);
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
  };

  // 二：處理更新日期下拉選單項的點擊事件
  const handleItemClick2 = (label) => {
    const selectedValue = options2.find(option => option.label === label)?.value;
    setButtonText2(label);
    console.log(`選中的值是: ${selectedValue}`);

    setUpdateDate(selectedValue);
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
        <button className="btn-second ms-4 filter-button" onClick={clearFilters} >清空條件</button>
      </div>
    </>
  );
};

// 以下是有地區的 晚點再弄
// const MyFilter = () => {
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [selectedArea, setSelectedArea] = useState(null);

//   const handleCityChange = (city) => {
//     setSelectedCity(city);
//     setSelectedArea(null);
//   };

//   const handleAreaChange = (area) => {
//     setSelectedArea(area);
//   };

//   return (
//     <div>
//       {/* 城市下拉菜单 */}
//       <div className="btn-group">
//         <button
//           className="btn dropdown-toggle"
//           type="button"
//           id="cityDropdown"
//           data-bs-toggle="dropdown"
//           data-bs-auto-close="true"
//           aria-expanded="false"
//         >
//           {selectedCity ? selectedCity.CityName : '任務地區'}
//         </button>
//         <ul className="dropdown-menu" aria-labelledby="cityDropdown">
//           {cityData.map((city) => (
//             <li
//               key={city.CityName}
//               className="dropdown-item text-center"
//               onClick={() => handleCityChange(city)}
//             >
//               {city.CityName}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* 地區下拉菜單 */}
//       {selectedCity && (
//         <div className="btn-group">
//           <button
//             className="btn dropdown-toggle"
//             type="button"
//             id="areaDropdown"
//             data-bs-toggle="dropdown"
//             data-bs-auto-close="true"
//             aria-expanded="false"
//           >
//             {selectedArea ? selectedArea.AreaName : '選擇地區'}
//           </button>
//           <ul className="dropdown-menu" aria-labelledby="areaDropdown">
//             {selectedCity.AreaList.map((area) => (
//               <li
//                 key={area.ZipCode}
//                 className="dropdown-item text-center"
//                 onClick={() => handleAreaChange(area)}
//               >
//                 {area.AreaName}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };




// 排序
const Sort = ({ missionType, setMissionType, missionCity, setMissionCity, missionArea, setMissionArea, updateDate, setUpdateDate, sortOrder, setSortOrder, sortBy, setSortBy }) => {
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
    console.log(`排序現在是接+http://localhost:3005/api/mission/all-missions?missionType=${missionType}&updateDate=${updateDate}&missionCity=${missionCity}&missionArea=${missionArea}&sortOrder=${sortOrder}&sortBy=${sortBy}`)
  }, [sortOrder]);

  return (
    <>
      <div className="sort ">
        <div className="sort-btn d-flex justify-content-center text-align-center">
          <button
            className={`size-7 m-1 p-1 ${
              activeButton === "post_date" ? "active" : ""
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
            className={`size-7 m-1 p-1 ${
              activeButton === "price" ? "active" : ""
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
const MissionCard = ({ missionType, missionCity, missionArea, setMissionType, updateDate, setUpdateDate, sortOrder, setSortOrder, sortBy, setSortBy }) => {
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
  }, [missionType, updateDate, missionCity, missionArea, sortOrder, sortBy]) // 當篩選方式、排序方式發生變化時重新獲取數據（非常重要要記得！忘記好幾次）

  // 格式化日期
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
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
  const [missionType, setMissionType] = useState(null);
  const [updateDate, setUpdateDate] = useState(null);
  const [missionCity, setMissionCity] = useState("");
  const [missionArea, setMissionArea] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState('post_date');



  // 在組件加載時重置篩選條件為默認值
  useEffect(() => {
    setMissionType(null);
    setUpdateDate(null);
    setMissionCity(null);
    setMissionArea(null);
    setSortOrder('asc');
    setSortBy('post_date');
    // setSelectedCity(null); // 重置城市选择为 null 或默认值
    // setSelectedArea(null); // 重置地区选择为 null 或默认值
    console.log(`重載後是+http://localhost:3005/api/mission/all-missions?missionType=${missionType}&updateDate=${updateDate}&missionCity=${missionCity}&missionArea=${missionArea}&sortOrder=${sortOrder}&sortBy=${sortBy}`);
  }, []);


  return (
    <>
      <div className="container pb-5 my-3 find-mission">
        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link href="/">首頁</Link>
            </li>
            <li class="breadcrumb-item" aria-current="page">
              <Link href="/work/find-mission">任務總覽</Link>
            </li>
          </ol>
        </nav>

        <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
          <RoleSelection defaultActive="mission" />
          <Search placeholder="搜尋任務" />
        </div>
        <div className='d-flex justify-content-between align-items-center mt-md-3 mb-md-4 position-relative'>
          <div className='filters d-flex justify-content-center align-items-center '>
            {/* <MobileFilter missionType={missionType} /> */}
            <MyFilter missionType={missionType} setMissionType={setMissionType} missionCity={missionCity} setMissionCity={setMissionCity} missionArea={missionArea} setMissionArea={setMissionArea}
              updateDate={updateDate} setUpdateDate={setUpdateDate} sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy} />
          </div>
          <button className="add-mission-btn-pc  d-none d-lg-block position-absolute">
            <img src="/add-mission.svg" className="me-2" />
            新增任務
          </button>
          <button className="add-mission-btn-mobile size-6 d-bolck d-lg-none">
            <img src="/add-mission.svg" className="" />
          </button>
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
                updateDate={updateDate} setUpdateDate={setUpdateDate} />
            </div>
          </div>
        </section>
        {/* <Pagination /> */}
      </div>
    </>
  );
}
