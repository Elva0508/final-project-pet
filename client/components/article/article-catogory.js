import { useState, useEffect } from "react";
import axios from "axios";

export default function ArticleCatogory() {
  const [articlecatogory, setArticleCatogory] = useState([]);

  const getArticleCatogory = async () => {
    await axios
      .get("http://localhost:3005/article/category")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setArticleCatogory(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getArticleCatogory();
  }, []);
  return (
    <>
      <div className="article-catogory"></div>
      {articlecatogory.map((v, i) => {
        return (
          <>
            <button type="button" className="btn-brown mx-1 active">
              {v.name}
            </button>
          </>
        );
      })}
    </>
  );
}
