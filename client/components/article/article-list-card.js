import React from "react";

export default function ArticleListCard() {
  return (
    <>
      <div className="article-list-card">
        <a href="/">
          <div class="card h-100">
            <img
              src="https://www.pet-care.com.tw/Content/upload/News/143594e8-2512-4c18-9f34-9ca02045beca.jpeg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">何謂天然豆腐砂：讓貓咪擁有舒適的體驗</h5>
              <p class="card-text">19.Aug.2023</p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
