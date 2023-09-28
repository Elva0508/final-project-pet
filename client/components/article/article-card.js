import React from "react";

export default function ArticleCard() {
  return (
    <>
      <div className="article-card">
        <div className="card mb-3">
          <div className="card-img">
            <img
              src="https://hahow-production.imgix.net/61d5551b34026d0006b9739a?w=1000&sat=0&auto=format&s=e51739054c4e07c23b09f0c457d500a4"
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="card-body">
            <span className="card-title size-3 m-size-4">何謂天然豆腐砂：讓貓咪擁有舒適的體驗</span>
            <p className="card-text size-5 m-size-6">
              <small className="text-body-secondary">19.Aug.2023</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
