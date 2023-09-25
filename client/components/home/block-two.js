import React from "react";
import ProductCard from "@/components/home/home-product-card";

export default function BlockTwo() {
  return (
    <>
      <h1>BlockTwo</h1>
      <div className="block-two">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col-lg-3">
            <div class="card h-100">
              <ProductCard />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card h-100">
              <ProductCard />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card h-100">
              <ProductCard />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card h-100">
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
