import { Fragment, useState } from "react";
import { CiHeart } from "react-icons/Ci";
import { BiSolidHeart,BiSolidCart} from "react-icons/bi";
import axios from 'axios';
import { useEffect } from "react";

export default function ProductCard2() {
  const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // 切換收藏狀態
  };


  //讀取資料庫資料
  const [productData, setProductData] = useState({}); // 用來存放從後端獲取的產品資料

  useEffect(() => {
    // 在組件加載後，發送 GET 請求到後端 API 以獲取產品資料
    axios.get("http://localhost:3005/api/product").then((response) => {
      // response.data 包含了後端返回的 JSON 資料
      setProductData(response.data.result);
    });
  }, []); // 空數組表示這個效果只會在組件加載時執行一次



  return (
    <>
      <div className="product-card">
        {/* <div className="card" style={{ width: "275px", height: "425px" }}> */}
          <div className="card" >
          <img
            src="https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_M3PD150101-e-0.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
            {/* 類別按鈕顏色已建好 btn-color-1 一直到btn-color-7 再依需求調整className即可 */}
            {/* 顏色設定如果需要再調整，可以到以下檔案調整 \final-project-pet\client\styles\components-style\_product-card.scss */}
              <div className="btn btn-color-1 d-flex align-items-center">貓草</div>
              <div className="" onClick={toggleFavorite}>
                {isFavorite ? (
                  <div className="position-relative inline-block">
                    <BiSolidHeart className="heart-icon-red" />
                    <CiHeart className="heart-icon-red-line" />
                  </div>
                ) : (
                  <CiHeart />
                )}
              </div>
            </div>

            <div className="card-text size-6 m-size-7">{productData.product_name}</div>
            <div className="product-sale-price d-flex align-items-center" href="#">
              <del>$220</del>
              <div className="price fs-4 mx-2  size-7 m-size-7">NT$140</div>
              <div className="rounded-circle cart p-1 d-flex justify-content-end align-items-center">
              <BiSolidCart className="cart"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
