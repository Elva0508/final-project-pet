import React, { useState, useRef, useEffect } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const Filter = ({ items, title, src }) => {
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // 加入整個網頁的點擊監聽事件
    document.addEventListener("click", handleClickOutside);

    // 組件卸載時移除點擊監聽
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e) => {
    const dropDown = dropDownRef.current;
    if (!dropDown.contains(e.target)) {
      // 如果點擊事件的位置沒有在dropdown內，則執行setIsOpen
      setIsOpen(false);
    }
  };
  const handleToggle = (e) => {
    // 點擊時切換下拉選單狀態
    setIsOpen(!isOpen);
  };

  return (
    <div className="drop-down-filter" ref={dropDownRef}>
      <button
        className={`drop-down-filter-btn ${isOpen ? "drop-down-active" : ""}`}
        onClick={handleToggle}
      >
        <div
          className={`drop-down-filter-btn-icon ${
            isOpen ? "drop-down-active" : ""
          }`}
        >
          <img src={src} />
        </div>
        {title || "選項"}
        <BiSolidDownArrow
          className={`icon icon-down ${!isOpen ? "" : "d-none"}`}
        />
        <BiSolidUpArrow className={`icon icon-up ${isOpen ? "" : "d-none"}`} />
      </button>
      <ul className={`drop-down-filter-menu ${isOpen ? "" : "d-none"}`}>
        {items ? (
          items.map((item) => <li>{item}</li>)
        ) : (
          <>
            <li>選項一</li>
            <li>選項二</li>
            <li>選項三</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Filter;

// 下拉式選單可傳入變數(props)：
// title => 選單名稱
// items = ['選項一','選項二',...]; => 選單列表
// src={"/job-calendar.svg"} =>選單icon

//使用範例：
//<Filter items={["測試1", "測試2"]} title='篩選名稱' src={'/job-calendar.svg'}/>
