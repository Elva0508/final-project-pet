import React from "react";
import ArticleListCard from "../article/article-list-card";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function BlockSix() {
  return (
    <>
      <div className="block-six">
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row row-cols-1 row-cols-md-3 g-4 p-5">
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
            </div>
            <div class="carousel-item">
              <div class="row row-cols-1 row-cols-md-3 g-4 p-5">
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
            </div>
            <div class="carousel-item">
              <div class="row row-cols-1 row-cols-md-3 g-4 p-5">
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
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <FaChevronLeft size={70} style={{ color: "#512f10" }} />
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <FaChevronRight size={70} style={{ color: "#512f10" }} />
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
