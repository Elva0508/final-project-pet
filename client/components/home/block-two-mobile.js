import React from "react";
import ProductCard from "@/components/home/home-product-card";

export default function BlockTwoMobile() {
  return (
    <>
      <div className="block-two-mobile">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row row-cols-1 row-cols-md-3">
                <div className="col-6">
                  <ProductCard />
                </div>
                <div className="col-6">
                  <ProductCard />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row row-cols-1 row-cols-md-3">
                <div className="col-6">
                  <ProductCard />
                </div>
                <div className="col-6">
                  <ProductCard />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row row-cols-1 row-cols-md-3">
                <div className="col-6">
                  <ProductCard />
                </div>
                <div className="col-6">
                  <ProductCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
