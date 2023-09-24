import React from 'react';
import Footer from '@/components/footer';
import Counter from '@/components/quantity-counter';
import { AiFillStar } from 'react-icons/ai';
import ProductCard from '@/components/product/product-card';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default function ProductDetail() {
    return (
        <>
            <div className="container">
                <p>我是麵包蟹</p>
                <section className="product-itembox d-flex" >
                    <div className="product-pic col-6 justify-content-center">
                        <div className="main-pic">
                            <img src="/product/product-test.jpg" alt="..."></img>
                        </div>
                        <div className="other-pic d-flex justify-content-between mt-2  ">
                            <img src="/product-test.jpg" alt="..."></img>
                            <img src="/product-test.jpg" alt="..."></img>
                            <img src="/product-test.jpg" alt="..."></img>
                            <img src="/product-test.jpg" alt="..."></img>
                        </div>
                    </div>

                    <div className="product-detail col-6">
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
                            <a className="nav-link size-6 " aria-current="page" href="#product-description">商品介紹</a>
                        </li>
                        <li className="nav-item2">
                            <a className="nav-link size-6" aria-current="page" href="#customer-message">顧客評價</a>
                        </li>
                    </ul>
                </section>

                <section className="product-description" id="product-description">
                    <div className="customer-message-title text-center ">
                        <h4 className="name size-6">商品介紹</h4>
                    </div>
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
                    <div className="image text-center ">
                        <img src="/product-test.jpg" alt="..."></img>
                        <img src="/product-test.jpg" alt="..."></img>
                        <img src="/product-test.jpg" alt="..."></img>
                    </div>
                </section>

                <section className="customer-message" id="customer-message">
                    <div className="customer-message-title text-center ">
                        <h4 className="name size-6">顧客評價</h4>
                    </div>
                    <div className="star d-flex">
                        <div className="Overall-rating col-4 p-4">
                            <p className="size-5">4.4</p>
                            <div className="staricon">
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                        </div>
                        <div className="Overall-rating-detail col-8">
                            還沒做
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
                <section className='recommend-product p-4'>
                    <div className="customer-message-title text-center mb-3 ">
                        <h4 className="name size-4">你可能會喜歡的商品</h4>
                    </div>
                    <div id="carouselExampleControls" className="carousel slide " data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="d-flex justify-content-around m-1">
                                    <ProductCard />
                                    <ProductCard />
                                    <ProductCard />
                                    <ProductCard />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="d-flex justify-content-around m-1">
                                    <ProductCard />
                                    <ProductCard />
                                    <ProductCard />
                                    <ProductCard />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <FaChevronLeft size={80} style={{ color: '#512f10' }} />
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <FaChevronRight size={80} style={{ color: '#512f10' }} />
                            <span className="visually-hidden">Next</span>
                        </button>

                    </div>


                </section>
            </div>
                <footer>
                    <Footer />
                </footer>
            </>
            );
}

