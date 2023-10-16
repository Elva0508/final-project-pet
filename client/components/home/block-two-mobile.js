import { Fragment, useState, useEffect } from "react";
import { BiSolidCart } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";

export default function BlockTwoMobile() {
  const [productData, setProductData] = useState({ result: [] });
  
  useEffect(() => {
    axios.get("http://localhost:3005/api/product/home").then((response) => {
      setProductData({ result: response.data.result });
    });
  }, []);

  const [isFavorites, setIsFavorites] = useState(() =>
    Array(productData.result.length).fill(false)
  );

  const toggleFavorite = (index) => {
    const newFavorites = [...isFavorites];
    newFavorites[index] = !newFavorites[index];
    setIsFavorites(newFavorites);
  };

  function getButtonColorClass(categoryName) {
    switch (categoryName) {
      case "食物":
        return "btn-color-1";
      case "用品":
        return "btn-color-2";
      case "清潔":
        return "btn-color-3";
      case "保健":
        return "btn-color-4";
      case "護理":
        return "btn-color-5";
      default:
        return "";
    }
  }

  //將產品兩兩一組
  const productGroups = [];
  for (let i = 0; i < productData.result.length; i += 2) {
    const group = productData.result.slice(i, i + 2);
    productGroups.push(group);
  }

  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        {productGroups.map((group, groupIndex) => (
          <div
            className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
            key={groupIndex}
          >
            <div className="row">
              {group.map((v, i) => (
                <div className="col-6 col-md-3 col-lg-3 col-xl-3" key={i}>
                  <div className="product-card2" key={v.product_id}>
                    <div className="card h-100">
                      <Link href={`/product/${v.product_id}`}>
                        <img
                          src={v.images_one}
                          className="card-img-top"
                          alt="..."
                        />
                      </Link>
                      <div className="card-body p-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className={`btn ${getButtonColorClass(
                              v.category_name
                            )} d-flex align-items-center `}
                          >
                            {v.category_name}
                          </div>
                          <img
                            className="card-herat"
                            src={
                              isFavorites[i] ? "/heart-clicked.svg" : "/heart.svg"
                            }
                            alt={isFavorites[i] ? "已收藏" : "未收藏"}
                            onClick={() => toggleFavorite(i)}
                          />
                        </div>
                        <Link href={`/product/${v.product_id}`}>
                          <div className="card-text-vendor size-7 m-size-7">
                            {v.vendor}
                          </div>
                          <div className="card-text size-6 m-size-7">
                            {v.product_name}
                          </div>
                          <div className="product-sale-price d-flex align-items-center" href="#">
                            <div className="price fs-4 size-6 m-size-7 me-3">
                              NT${v.specialoffer}
                            </div>
                            <del>NT${v.price}</del>
                          </div>
                        </Link>
                        <button type="submit" className="btn-confirm">
                          <BiSolidCart />
                        </button>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" ariahidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}