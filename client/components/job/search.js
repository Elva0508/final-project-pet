import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const Search = ({ placeholder, color }) => {
  const handleRipple = () => {
    const btn = document.querySelector("button");
    btn.classList.add("ripple");
    setTimeout(() => {
      btn.classList.remove("ripple");
    }, 500); //動畫持續時間結束後移除動畫效果，讓動畫可以重複使用
  };

  return (
    <div className="job-search">
      <input type="text" placeholder={placeholder || ""} />
      <button onClick={handleRipple}>
        <BiSearchAlt className="job-search-icon" />
      </button>
      <div className="ripple"></div>
    </div>
  );
};

export default Search;

// Search元件可傳入變數(props)：
// placehoder={輸入自訂的placeholder文字}
