import React from "react";
import BreadCrumb from "@/components/article/bread-crumb";
import ArticleCatogory from "@/components/article/article-catogory";
import ArticleListCard from "@/components/article/article-list-card";
import Navbar from "@/components/navbar/navbar";

export default function ArticleList() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="container mt-5 pt-3">
        <div className="mt-5 pt-3">
          <BreadCrumb />
        </div>

        <div className="d-flex justify-content-center mb-5 ">
          <ArticleCatogory />
        </div>

        <div className="mb-5">
          <ArticleListCard />
        </div>
        <div className="mb-5">
          <ArticleListCard />
        </div>
        <div className="mb-5">
          <ArticleListCard />
        </div>
        <div className="mb-5">
          <ArticleListCard />
        </div>
        <div>分頁</div>
      </div>
      <footer>footer</footer>
    </>
  );
}
