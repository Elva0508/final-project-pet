import React from "react";

export default function ArticleListCard() {
  return (
    <>
      <div className="article-list-card">
        <a href="/">
          <div className="card h-100">
            <img
              src="https://www.pet-care.com.tw/Content/upload/News/143594e8-2512-4c18-9f34-9ca02045beca.jpeg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title size-6 m-size-6">何謂天然豆腐砂：讓貓咪擁有舒適的體驗</h5>
              <p className="card-text size-7 m-size-7">19.Aug.2023</p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
