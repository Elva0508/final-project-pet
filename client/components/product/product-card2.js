import { Fragment, useState } from "react";
import { BiSolidCart } from "react-icons/bi";
import axios from 'axios';
import { useEffect } from "react";
import Link from "next/link";

export default function ProductCard2() {



  // 讀取資料庫資料
  const [productData, setProductData] = useState({ result: [] }); // 初始化為一個帶有 result 屬性的物件

  useEffect(() => {
    axios.get("http://localhost:3005/api/product").then((response) => {
      setProductData({ result: response.data.result }); // 將伺服器端的 result 放入物件中
    });
  }, []);

  // 初始化 isFavorites 並設置與產品數量相同的初始值（都是 false）
  const [isFavorites, setIsFavorites] = useState(() => (
    Array(productData.result.length).fill(false)
  ));

  const toggleFavorite = (index) => {
    const newFavorites = [...isFavorites];
    newFavorites[index] = !newFavorites[index];
    setIsFavorites(newFavorites);
  };


  return (
    <>
      {productData.result.map((v, i) => {
        return (
          <div className="col-6 col-md-4 col-lg-6 col-xl-4">
            <div className="product-card2" key={v.product_id}>
              <div className="card" >
                <Link href={`/product/${v.product_id}`} >
                <img src={v.images_one} className="card-img-top" alt="..."/>
                </Link> 
                <div className="card-body" >
                  <div className="d-flex justify-content-between align-items-center">
                    {/* 類別按鈕顏色已建好 btn-color-1 一直到btn-color-7 再依需求調整className即可 */}
                    {/* 顏色設定如果需要再調整，可以到以下檔案調整 \final-project-pet\client\styles\components-style\_product-card.scss */}
                    <div className="btn btn-color-1 d-flex align-items-center py-3">{v.subcategory_name}</div>
                    <img className="card-herat" src={isFavorites[i] ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorites[i] ? "已收藏" : "未收藏"} onClick={() => toggleFavorite(i)} />

                  </div>
                  <Link href={`/product/${v.product_id}`} >
                  <div className="card-text size-6 m-size-7">{v.product_name}</div>
                  <div className="product-sale-price d-flex align-items-center" href="#">
                    <div className="price fs-4 mx-2 size-7 m-size-7">NT${v.specialoffer}</div>
                    <del>NT${v.price}</del>
                  </div>
                  </Link> 
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



