import { useState, useEffect } from "react";
import Link from "next/link";

export default function ArticleListCard() {
  const [articleListCard, setArticleListCard] = useState([]);

  // // 向伺服器要求資料，設定到狀態中
  const getArticleListCard = async () => {
    const res = await fetch("http://localhost:3005/api/article/home");

    const data = await res.json();

    // console.log(data);
    // 設定到狀態中 -> 會觸發重新渲染(re-render)
    if (Array.isArray(data)) setArticleListCard(data);
  };

  // // didMount 初次渲染"後", 向伺服器要求資料，設定到狀態中
  useEffect(() => {
    getArticleListCard();
  });

  // 只要前三篇文章
  const firstThreeArticles = articleListCard.slice(0, 3);
  const secondThreeArticles = articleListCard.slice(3, 6);
  const thirdThreeArticles = articleListCard.slice(6, 9);

  return (
    <>
      <div className="article-list-card">
        <div className="carousel-item active">
          <div className="row g-4 px-5">
            <div className="col">
              <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                {firstThreeArticles.map((v, i) => {
                  return (
                    <div className="col" key={`article-card-${v.article_id}`}>
                      <Link
                        href={`/article/${v.article_category_id}/${v.article_id}`}
                      >
                        <div className="card h-100">
                          <img src={v.img} alt="..." />
                          <div className="card-body">
                            <h5 className="card-title size-6 m-size-6">
                              {v.title}
                            </h5>
                            <p className="card-text size-7 m-size-7">
                              {v.published_date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row g-4 px-5">
            <div className="col">
              <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                {secondThreeArticles.map((v, i) => {
                  return (
                    <div className="col" key={`article-card-${v.article_id}`}>
                      <Link
                        href={`/article/${v.article_category_id}/${v.article_id}`}
                      >
                        <div className="card h-100">
                          <img src={v.img} alt="..." />
                          <div className="card-body">
                            <h5 className="card-title size-6 m-size-6">
                              {v.title}
                            </h5>
                            <p className="card-text size-7 m-size-7">
                              {v.published_date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row g-4 px-5">
            <div className="col">
              <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                {thirdThreeArticles.map((v, i) => {
                  return (
                    <div className="col" key={`article-card-${v.article_id}`}>
                      <Link
                        href={`/article/${v.article_category_id}/${v.article_id}`}
                      >
                        <div className="card h-100">
                          <img src={v.img} alt="..." />
                          <div className="card-body">
                            <h5 className="card-title size-6 m-size-6">
                              {v.title}
                            </h5>
                            <p className="card-text size-7 m-size-7">
                              {v.published_date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
