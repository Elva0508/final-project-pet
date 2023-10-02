import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function ArticleListCard({ category }) {
  const [articleListCard, setArticleListCard] = useState([]);

  const getArticleListCard = async () => {
    await axios
      .get(`http://localhost:3005/article/${category}`)
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setArticleListCard(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getArticleListCard();
  }, [category]);

  return (
    <>
      <div className="article-list-card">
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {articleListCard.map((v, i) => {
            return (
              <>
                <div className="col">
                  <Link href={`/article/${v.article_id}`}>
                    <div className="card h-100" key={v.article_id}>
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
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
