import React, { useState, useRef, useEffect } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const Filter = ({ items, title }) => {
  const menuRef = useRef(null);
  useEffect(() => {
    // 加入整個網頁的點擊監聽事件
    document.addEventListener("click", handleClickOutside);

    // 組件卸載時移除點擊監聽
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e) => {
    const dropDown = document.querySelector(".drop-down");
    if (!dropDown.contains(e.target)) {
      // 如果點擊事件的位置沒有在dropdown內，則執行toggle函數
      Toggle("outside");
    }
  };
  const handleTogle = (e) => {
    console.log(e.currentTarget);
    Toggle("inside");
  };

  function Toggle(status) {
    const btn = document.querySelector(".drop-down-btn");
    const menu = document.querySelector(".drop-down-menu");
    const down = document.querySelector(".icon-down");
    const up = document.querySelector(".icon-up");
    if (status === "outside") {
      // 為什麼這裡是相反的? 到時候要檢查一下
      down.classList.add("d-none");
      up.classList.remove("d-none");
      menu.classList.remove("d-none");
      btn.classList.add("drop-down-active");
      btn
        .querySelector(".drop-down-btn-icon")
        .classList.add("drop-down-active");
    }
    down.classList.toggle("d-none");
    up.classList.toggle("d-none");
    menu.classList.toggle("d-none");
    btn.classList.toggle("drop-down-active");
    btn
      .querySelector(".drop-down-btn-icon")
      .classList.toggle("drop-down-active");
  }

  return (
    <div className="drop-down">
      <button className="drop-down-btn" onClick={handleTogle}>
        <div className="drop-down-btn-icon">
          <img src="/job-calendar.svg" />
        </div>
        {title || "選項"}
        <BiSolidDownArrow className="icon icon-down" />
        <BiSolidUpArrow className="icon icon-up d-none" />
      </button>
      <ul className="drop-down-menu d-none" ref={menuRef}>
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
      {/* <div>下拉選單</div> */}
    </div>
  );
};

export default Filter;

// 下拉式選單可傳入變數(props)：
// title => 選單名稱
// items = ['選項一','選項二',...]; => 選單列表

//使用範例：
//<Filter items={["測試1", "測試2"]} title='篩選名稱'/>
