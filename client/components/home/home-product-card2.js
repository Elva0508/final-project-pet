import { Fragment, useState } from "react";
import { BiSolidCart } from "react-icons/bi";
import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";

export default function HomeProductCard2() {
  // 讀取資料庫資料
  const [productData, setProductData] = useState({ result: [] }); // 初始化為一個帶有 result 屬性的物件

  useEffect(() => {
    axios.get("http://localhost:3005/api/product/home").then((response) => {
      setProductData({ result: response.data.result }); // 將伺服器端的 result 放入物件中
    });
  }, []);

  // 初始化 isFavorites 並設置與產品數量相同的初始值（都是 false）
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
        return ""; // 如果找不到匹配的類別名稱，可以返回空字符串或其他適當的值
    }
  }

  return (
    <>
      {productData.result.map((v, i) => {
        return (
          <div className="col-6 col-md-3 col-lg-3 col-xl-3">
            <div className="product-card2" key={v.product_id}>
              <div className="card h-100">
                <Link href={`/product/${v.product_id}`}>
                  <img src={v.images_one} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between align-items-center">
                    {/* 類別按鈕顏色已建好 btn-color-1 一直到btn-color-7 再依需求調整className即可 */}
                    {/* 顏色設定如果需要再調整，可以到以下檔案調整 \final-project-pet\client\styles\components-style\_product-card.scss */}
                    <div
                      className={`btn ${getButtonColorClass(
                        v.category_name
                      )} d-flex align-items-center `}
                    >
                      {v.category_name}
                    </div>
                    <img
                      className="card-herat"
                      src={isFavorites[i] ? "/heart-clicked.svg" : "/heart.svg"}
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
                    <div
                      className="product-sale-price d-flex align-items-center"
                      href="#"
                    >
                      <div className="price fs-4  size-6 m-size-7 me-3">
                        NT${v.specialoffer}
                      </div>
                      <del>NT${v.price}</del>
                    </div>
                  </Link>
                  <button type="submit" className=" btn-confirm ">
                    <BiSolidCart />
                  </button>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
