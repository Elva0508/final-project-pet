import { Fragment, useState } from "react";
import { BiSolidCart } from "react-icons/bi";
import axios from 'axios';
import { useEffect } from "react";
import Link from "next/link";
import Counter from '@/components/product/quantity-counter';


export default function ProductCard2({ productData, mainPic, setMainPic }) {

  // 點擊事件處理函數，更新主圖片的 URL
  const handleImageClick = (newImageUrl) => {
    setMainPic(newImageUrl);
  };

  // 初始化 isFavorites 並設置與產品數量相同的初始值（都是 false）
  const [isFavorites, setIsFavorites] = useState(() => (
    Array(productData.length).fill(false)
  ));

  const toggleFavorite = (index) => {
    const newFavorites = [...isFavorites];
    newFavorites[index] = !newFavorites[index];
    setIsFavorites(newFavorites);
  };

  function getButtonColorClass(categoryName) {
    switch (categoryName) {
      case '食物':
        return 'btn-color-1';
      case '用品':
        return 'btn-color-2';
      case '清潔':
        return 'btn-color-3';
      case '保健':
        return 'btn-color-4';
      case '護理':
        return 'btn-color-5';
      default:
        return ''; // 如果找不到匹配的類別名稱，可以返回空字符串或其他適當的值
    }
  }

  return (
    <>
      {productData.map((v, i) => {
        return (
          <div className="col-6 col-md-4 col-lg-6 col-xl-4">
            <div className="product-card2" key={v.product_id}>
              <div className="card" >
                <Link href={`/product/${v.category_id}/${v.subcategory_id}/${v.product_id}`} >
                  <img src={v.images_one} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body p-0" >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="card-text-vendor size-7 m-size-7">{v.vendor}</div>
                    {/* 類別按鈕顏色已建好 btn-color-1 一直到btn-color-7 再依需求調整className即可 */}
                    {/* 顏色設定如果需要再調整，可以到以下檔案調整 \final-project-pet\client\styles\components-style\_product-card.scss */}
                    {/* <div className={`btn ${getButtonColorClass(v.category_name)} d-flex align-items-center `}>{v.category_name}</div> */}
                    <img className="card-herat" src={isFavorites[i] ? "/heart-clicked.svg" : "/heart.svg"} alt={isFavorites[i] ? "已收藏" : "未收藏"} onClick={() => toggleFavorite(i)} />
                  </div>
                  <Link href={`/product/${v.product_id}`} >
                    <div className="card-text size-6 m-size-7">{v.product_name}</div>
                    <div className="product-sale-price d-flex align-items-center" href="#">
                      <div className="price fs-4  size-6 m-size-7 me-3">NT${v.specialoffer}</div>
                      <del>NT${v.price}</del>
                    </div>
                  </Link>
                  {/* 彈跳視窗按鈕 */}
                  {/* data-bs-target={`#exampleModal${v.product_id}`} 要注意*/}
                  {/* <button type="button" className=" btn-confirm" data-bs-toggle="modal" data-bs-target={`#exampleModal${v.product_id}`}>
                    <BiSolidCart />
                  </button> */}
                  {/* 彈跳視窗 */}
                  {/* id={`exampleModal${v.product_id}`} 要注意*/}
                  <div class="modal fade product-itembox" id={`exampleModal${v.product_id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <section className="product-itembox row justify-content-center"  >
                            <div className="product-pic col-lg-6" >
                              <figure className="main-pic  ">
                                <img src={mainPic} alt="..."></img>
                              </figure>
                              <div className="other-pic mt-2 ">
                                <div className='row g-2 d-flex justify-content-center '>
                                  <img src={v.images_one} alt="..." onClick={() => handleImageClick(v.images_one)}></img>
                                  <img src={v.images_two} alt="..." onClick={() => handleImageClick(v.images_two)}></img>
                                </div>
                              </div>
                            </div>
                            <div className="product-detail col-lg-6">
                              <h4 className="name size-5">{v.product_name}</h4>
                              <div className="brand d-flex size-6">{v.vendor}</div>
                              <div className="price-wrapper">
                                <div className="pricebox_detail  d-flex">
                                  <div className="priceBlock me-4" >
                                    <span className="PriceName1 size-5 ">NT$</span>
                                    <span className="font-big size-5">{v.price}</span>
                                  </div>
                                  <div className="font-delete size-6" >NT${v.price}</div>
                                </div>
                              </div>
                              <div className="type d-flex flex-column">
                                <div className="type-chinese">規格</div>
                                {/* <div className="type-btn d-flex mt-1">
                                  {v.type_names.split(',').map((typeName, i) => (
                                    <button
                                      key={i}
                                      type="button"
                                      className="btn-outline-brown me-4"
                                    >
                                      {typeName.trim()} 
                                    </button>
                                  ))}
                                </div> */}
                                <div className="type-btn d-flex ">
                                </div>
                              </div>
                              <div className="quantity-counter">
                                <Counter />
                              </div>
                              <div className="add-to-cart">
                                <button type="submit" className=" btn-confirm">
                                  加入購物車
                                </button>
                              </div>
                              <div className="add-to-favorites">
                                <button type="button" className=" btn-second">
                                  加入收藏
                                </button>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
              </div>




            </div>





          </div>

        )
      })}

    </>
  );
}