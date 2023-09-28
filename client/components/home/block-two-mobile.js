import React from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/home/home-product-card";

export default function BlockTwo() {
  return (
    <>
      <div className="block-two-mobile">
        <div className="block-six">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row row-cols-1 row-cols-md-3 g-4 px-5">
                  <div className="col-6">
                    <Link href="/">
                      <ProductCard />
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link href="/">
                      <ProductCard />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row row-cols-1 row-cols-md-3 g-4 px-5">
                  <div className="col-6">
                    <Link href="/">
                      <ProductCard />
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link href="/">
                      <ProductCard />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* <button
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
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
