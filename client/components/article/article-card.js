import React from "react";

export default function ArticleCard() {
  return (
    <>
      <div className="article-card">
        <div class="card mb-3">
          <div className="card-img">
            <img
              src="https://hahow-production.imgix.net/61d5551b34026d0006b9739a?w=1000&sat=0&auto=format&s=e51739054c4e07c23b09f0c457d500a4"
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body">
            <span class="card-title">何謂天然豆腐砂：讓貓咪擁有舒適的體驗</span>
            <p class="card-text">
              <small class="text-body-secondary">19.Aug.2023</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
