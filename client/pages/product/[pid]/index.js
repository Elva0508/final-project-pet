import React, { useState } from 'react';
import Footer from '@/components/footer';
import Counter from '@/components/product/quantity-counter';
import { AiFillStar } from 'react-icons/ai';
import ProductCard2 from '@/components/product/product-card2';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import EvaluationBar from '@/components/evaluation-bar';
import ProductCard from '@/components/home/home-product-card';
import axios from 'axios';
import { useEffect } from "react";
import { useRouter } from "next/router";




export default function ProductDetail() {

    //商品介紹和推薦跳頁
    const [activeSection, setActiveSection] = useState('product-description')


    // 讀取資料庫資料
    const router = useRouter();
    const product_id = router.query.pid;
    const [productData, setProductData] = useState([]);

    const [mainPic, setMainPic] = useState(''); // 初始化為 v.images_one

    // 點擊事件處理函數，更新主圖片的 URL
    const handleImageClick = (newImageUrl) => {
        setMainPic(newImageUrl);
    };

    useEffect(() => {
        if (product_id) {
            axios.get(`http://localhost:3005/api/product/product-detail/${product_id}`)
                .then((response) => {
                    setProductData(response.data.result); // 直接设置为数组

                })
                .catch((error) => {
                    console.error("Error fetching product data:", error);
                });
        }
    }, [product_id]);
    console.log(productData)

    return (

        
        <>
            <div className='product-detail'>
                <div className="container ">
                    <p>我是麵包蟹</p>

                    {productData.map((v, i) => {
                        return (
                            <>
                                <section className="product-itembox row justify-content-center" key={v.product_id} >
                                    <div className="product-pic col-lg-6" >
                                        <figure className="main-pic  ">
                                            <img src={mainPic} alt="..."></img>
                                        </figure>
                                        <div className="other-pic mt-2 ">
                                            <div className='row g-2 d-flex justify-content-start '>
                                                <img src={v.images_one} alt="..." onClick={() => handleImageClick(v.images_one)}></img>
                                                <img src={v.images_two} alt="..." onClick={() => handleImageClick(v.images_two)}></img>
                                                {/* <img src={v.images_three} alt="..." onClick={() => handleImageClick(v.images_three)}></img>
                                                <img src={v.images_four} alt="..." onClick={() => handleImageClick(v.images_four)}></img> */}
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
                                                    <span className="font-big size-5">{v.specialoffer}</span>
                                                </div>
                                                <div className="font-delete size-6" >NT${v.price}</div>
                                            </div>
                                        </div>
                                        <div className="type d-flex flex-column">
                                            <div className="type-chinese">規格</div>
                                            <div className="type-btn d-flex ">
                                                {v.type_names.split(',').map((typeName, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        className="btn-outline-brown me-4"
                                                    >
                                                        {typeName.trim()} {/* 移除可能的前後空格 */}
                                                    </button>
                                                ))}
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
                                            {v.description}
                                        </div>
                                        <div className="product-description-pic text-center ">
                                            <figure className="main-pic ">
                                                <img src={v.images_one} alt="..."></img>
                                            </figure>
                                            <figure className="main-pic ">
                                                <img src={v.images_two} alt="..."></img>
                                            </figure>
                                            {/* <figure className="main-pic ">
                                                <img src={v.images_three} alt="..."></img>
                                            </figure>
                                            <figure className="main-pic ">
                                                <img src={v.images_four} alt="..."></img>
                                            </figure> */}
                                        </div>
                                    </section>
                                )}

                               
                            </>







                        );
                    })}

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
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-flex justify-content-around ">
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
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



