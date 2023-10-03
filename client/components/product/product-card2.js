import { Fragment, useState } from "react";
import { CiHeart } from "react-icons/Ci";
import { BiSolidHeart, BiSolidCart } from "react-icons/bi";
import axios from 'axios';
import { useEffect } from "react";

export default function ProductCard2() {
  const [isFavorite, setIsFavorite] = useState(false); // 初始狀態為未收藏

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // 切換收藏狀態
  };


  //讀取資料庫資料
  const [productData, setProductData] = useState({ result: [] }); // 初始化為一個帶有 result 屬性的物件

  useEffect(() => {
    axios.get("http://localhost:3005/api/product").then((response) => {
      setProductData({ result: response.data.result }); // 將伺服器端的 result 放入物件中
    });
  }, []);

  return (
    <>
      {productData.result.map((v, i) => {
        return (
          <div className="col-6 col-md-4 col-lg-6 col-xl-4">
            <div className="product-card2" key={v.product_id}>
              <div className="card" >
                

                <img
                  src={v.images_one}
                  className="card-img-top"
                  alt="..."
                />

               

                <div className="card-body" >
                  <div className="d-flex justify-content-between align-items-center">
                    {/* 類別按鈕顏色已建好 btn-color-1 一直到btn-color-7 再依需求調整className即可 */}
                    {/* 顏色設定如果需要再調整，可以到以下檔案調整 \final-project-pet\client\styles\components-style\_product-card.scss */}
                    <div className="btn btn-color-1 d-flex align-items-center py-3">{v.subcategory_name}</div>
                  </div>

                  <div className="card-text size-6 m-size-7">{v.product_name}</div>
                  <div className="product-sale-price d-flex align-items-center" href="#">
                    <div className="price fs-4 mx-2 size-7 m-size-7">NT${v.specialoffer}</div>
                    <del>NT${v.price}</del>
                  </div>
                  <button type="submit" className=" btn-confirm mx-1">
                    <BiSolidCart />
                  </button>
                </div>
              </div>
            </div>
          </div>

        )
      })}

    </>
  );
}



