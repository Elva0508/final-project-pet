import React from "react";
import ArticleListCard from "../article/article-list-card";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function BlockSix() {
  return (
    <>
      <div className="block-six">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row row-cols-1 row-cols-md-3 g-4 px-5">
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
            </div>
            <div className="carousel-item">
              <div className="row row-cols-1 row-cols-md-3 g-4 px-5">
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
            </div>
            <div className="carousel-item">
              <div className="row row-cols-1 row-cols-md-3 g-4 px-5">
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
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <FaChevronLeft size={70} style={{ color: "#512f10" }} />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <FaChevronRight size={70} style={{ color: "#512f10" }} />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
