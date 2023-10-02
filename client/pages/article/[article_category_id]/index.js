import { useState, useEffect } from "react";
import BreadCrumb from "@/components/article/bread-crumb";
import ArticleCatogory from "@/components/article/article-catogory";
import ArticleListCard from "@/components/article/article-list-card";
import Pagination from "@/components/pagination";
import axios from "axios";

export default function ArticleList() {
  const [articlelist, setArticleList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const getArticleList = async () => {
    await axios
      .get(`http://localhost:3005/article/${setSelectedCategory}`)
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setArticleList(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div>
          <BreadCrumb />
        </div>

        <div className="d-flex justify-content-center mb-5 mt-5">
          <ArticleCatogory />
        </div>

        <div>
          <ArticleListCard category={selectedCategory} />
        </div>

        <div>
          <Pagination />
        </div>
      </div>
    </>
  );
}
