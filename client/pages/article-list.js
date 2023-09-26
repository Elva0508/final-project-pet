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

        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div class="col">
            <ArticleListCard />
          </div>
          <div class="col">
            <ArticleListCard />
          </div>
          <div class="col">
            <ArticleListCard />
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div class="col">
            <ArticleListCard />
          </div>
          <div class="col">
            <ArticleListCard />
          </div>
          <div class="col">
            <ArticleListCard />
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div class="col">
            <ArticleListCard />
          </div>
          <div class="col">
            <ArticleListCard />
          </div>
          <div class="col">
            <ArticleListCard />
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div class="col">
            <ArticleListCard />
          </div>
          <div class="col">
            <ArticleListCard />
          </div>
          <div class="col">
            <ArticleListCard />
          </div>
        </div>

        <div>分頁</div>
      </div>
      <footer>footer</footer>
    </>
  );
}
