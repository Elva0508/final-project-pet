import React from "react";
import BreadCrumb from "@/components/article/bread-crumb";
import ArticleCatogory from "@/components/article/article-catogory";
import ArticleListCard from "@/components/article/article-list-card";
import Pagination from "@/components/pagination";

export default function ArticleList() {
  return (
    <>
      <div className="container mt-5">
        <div>
          <BreadCrumb />
        </div>

        <div className="d-flex justify-content-center mb-5 mt-5">
          <ArticleCatogory />
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <ArticleListCard />
          </div>
          <div className="col">
            <ArticleListCard />
          </div>
          <div className="col">
            <ArticleListCard />
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <ArticleListCard />
          </div>
          <div className="col">
            <ArticleListCard />
          </div>
          <div className="col">
            <ArticleListCard />
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <ArticleListCard />
          </div>
          <div className="col">
            <ArticleListCard />
          </div>
          <div className="col">
            <ArticleListCard />
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <ArticleListCard />
          </div>
          <div className="col">
            <ArticleListCard />
          </div>
          <div className="col">
            <ArticleListCard />
          </div>
        </div>

        <div>
          <Pagination />
        </div>
      </div>
    </>
  );
}
