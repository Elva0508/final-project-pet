import React, { useState } from 'react';
import Footer from '@/components/footer';
import Counter from '@/components/product/quantity-counter';
import { AiFillStar } from 'react-icons/ai';
import ProductCard2 from '@/components/product/product-card2';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import EvaluationBar from '@/components/evaluation-bar';




export default function ProductDetail() {

    //商品介紹和推薦跳頁
    const [activeSection, setActiveSection] = useState('product-description')

    // 點擊事件處理函數，更新主圖片的 URL
    const handleImageClick = (newImageUrl) => {
        setMainPic(newImageUrl);
    };
    const [mainPic, setMainPic] = useState('/product/product-test.jpg');

    return (
        <>
            <div className='product-detail'>
                <div className="container ">
                    <p>我是麵包蟹</p>
                    <section className="product-itembox row justify-content-center" >
                        <div className="product-pic col-lg-6">
                            <figure className="main-pic  ">
                                <img src={mainPic} alt="..."></img>
                            </figure>
                            <div className="other-pic mt-2 ">
                                <div className='row g-2 d-flex justify-content-around '>
                                    <img src="/product/product-test.jpg" alt="..." onClick={() => handleImageClick('/product/product-test.jpg')}
                                    ></img>
                                    <img src="/product/product-test2.jpg" alt="..." onClick={() => handleImageClick('/product/product-test2.jpg')}></img>
                                    <img src="/product/product-test3.jpg" alt="..." onClick={() => handleImageClick('/product/product-test3.jpg')}></img>
                                    <img src="/product/product-test4.jpg" alt="..." onClick={() => handleImageClick('/product/product-test4.jpg')}></img>
                                </div>
                            </div>
                        </div>

                        <div className="product-detail col-lg-6">
                            <h4 className="name size-5">貓用｜1種肉低敏無膠主食罐 82G</h4>
                            <div className="brand d-flex size-6">汪喵星球</div>
                            <div className="price-wrapper">
                                <div className="pricebox_detail  d-flex">
                                    <div className="priceBlock me-4" >
                                        <span className="PriceName1 size-5 ">NT$</span>
                                        <span className="font-big size-5">2,490</span>
                                    </div>
                                    <div className="font-delete size-6" >NT$2,770</div>
                                </div>
                            </div>
                            <div className="type d-flex flex-column">
                                <div className="type-chinese">規格</div>
                                <div className="type-btn d-flex ">
                                    <button type="button" className="btn-outline-brown me-4">
                                        口味1
                                    </button>
                                    <button type="button" className="btn-outline-brown me-4">
                                        口味2
                                    </button>
                                    <button type="button" className="btn-outline-brown me-4">
                                        口味3
                                    </button>
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

                    <section className='product-detail-tabs d-flex justify-content-center'>
                        <ul className="nav nav-underline d-flex w-100 justify-content-around ">
                            <li className="nav-item1">
                                <a
                                    className={`nav-link size-6 ${activeSection === 'product-description' ? 'active' : ''}`}
                                    aria-current="page"
                                    // href="#product-description"
                                    onClick={() => setActiveSection('product-description')}
                                >
                                    商品介紹
                                </a>
                            </li>
                            <li className="nav-item2">
                                <a
                                    className={`nav-link size-6 ${activeSection === 'customer-message' ? 'active' : ''}`}
                                    aria-current="page"
                                    // href="#customer-message"
                                    onClick={() => setActiveSection('customer-message')}
                                >
                                    顧客評價
                                </a>
                            </li>
                        </ul>
                    </section>
                    {/* 商品介紹 */}
                    {activeSection === 'product-description' && (
                        <section className="product-description  " >
                            <div className="description">
                                <p>
                                    ● 拓展設計可增大一倍內部空間 可躺可睡 外出時的臨時住所
                                    <br />
                                    ● 3秒即可完成拓展及閉合
                                    <br />
                                    ● 大面積網格布使用 保持內部空氣流通
                                    <br />
                                    ● 透明視窗滿足寵物好奇心
                                    <br />
                                    ● 門簾可遮擋或捲起 可於不同狀態使用
                                    <br />
                                    ● 底部配有防塵布 用於保持包體底面捷徑
                                </p>
                            </div>
                            <div className="product-description-pic text-center ">
                                <figure className="main-pic ">
                                    <img src="/product/product-test.jpg" alt="..."></img>
                                </figure>
                                <figure className="main-pic ">
                                    <img src="/product/product-test.jpg" alt="..."></img>
                                </figure>
                                <figure className="main-pic ">
                                    <img src="/product/product-test.jpg" alt="..."></img>
                                </figure>
                                <figure className="main-pic ">
                                    <img src="/product/product-test.jpg" alt="..."></img>
                                </figure>
                            </div>
                        </section>
                    )}

                    {/* 顧客評價 */}
                    {activeSection === 'customer-message' && (
                        <section className="customer-message" >
                            <div className="star ">
                                <div className="Overall-rating-detail ">
                                    <EvaluationBar />
                                </div>
                            </div>
                            <div className="customer ">
                                <div className="customer-name">王小姐</div>
                                <div className="customer-star">
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                </div>
                                <div className="customer-content">
                                    唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬
                                </div>
                            </div>
                            <div className="customer">
                                <div className="customer-name">王小姐</div>
                                <div className="customer-star">
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                </div>
                                <div className="customer-content">
                                    唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬
                                </div>
                            </div><div className="customer">
                                <div className="customer-name">王小姐</div>
                                <div className="customer-star">
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                </div>
                                <div className="customer-content">
                                    唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬爛產生器唬
                                </div>
                            </div>
                        </section>
                    )}

                    <section className='recommend-product p-4'>
                        <div className="customer-message-title text-center mb-3 ">
                            <h4 className="name size-4">你可能會喜歡的商品</h4>
                        </div>
                        <div id="carouselExampleControls" className="carousel slide " data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active ">
                                    <div className="d-flex justify-content-around ">
                                           <ProductCard2 />
                                           <ProductCard2 />
                                           <ProductCard2 />
                                           <ProductCard2 />  
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-flex justify-content-around ">
                                        <ProductCard2 />
                                        <ProductCard2 />
                                        <ProductCard2 />
                                        <ProductCard2 />
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <FaChevronLeft size={70} style={{ color: '#512f10' }} />
                                <span className="visually-hidden">Previous</span>
                            </button>

                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <FaChevronRight size={70} style={{ color: '#512f10' }} />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>


                    </section>
                </div>
            </div>
        </>
    );
}



