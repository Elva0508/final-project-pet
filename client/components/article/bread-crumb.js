import React from "react";

export default function BreadCrumb() {
  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">首頁</a>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <a href="/">小貓兩三知</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <a href="/">動物百科</a>
          </li>
        </ol>
      </nav>
    </>
  );
}
