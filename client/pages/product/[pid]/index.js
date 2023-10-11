import React, { useState } from 'react';
import Counter from '@/components/product/quantity-counter';
import { AiFillStar } from 'react-icons/ai';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import ProductCard3 from '@/components/product/product-card3';
import { useCart } from "@/hooks/useCart"
import { FiPlus } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';

//next裡innerhtml語法
function ProductDescription({ htmlContent }) {
    return (
        <div className="item" dangerouslySetInnerHTML={{ __html: htmlContent }}>
        </div>
    );
}


export default function ProductDetail() {

    //用來儲存收藏
    const [collection, setCollection ]  = useState([]);

    // 用於儲存解析後的userID
    const [userId, setUserId] = useState(null);

    // 利用token拿到當前登入的userID
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                const currentUserID = decodedToken.id;
                console.log("currentUserID", currentUserID);
                setUserId(currentUserID);
                // 在此處將令牌token添加到請求標頭
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                console.error("解析Token時出錯", error);
            }
        }
    }, []);

    //計算數量
    const [count, setCount] = useState(1);
    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    const handleIncrement = () => {
        setCount(count + 1);
    };


    //商品介紹和推薦跳頁
    const [activeSection, setActiveSection] = useState('product-description')

    // 讀取product個別id資料
    const router = useRouter();
    const product_id = router.query.pid;

    const [productData, setProductData] = useState([]);
    useEffect(() => {
        if (product_id) {
            axios.get(`http://localhost:3005/api/product/product-detail/${product_id}`)
                .then((response) => {
                    setProductData(response.data.result); // 直接设置为数组
                    setMainPic(response.data.result[0].images_one)
                    // console.log(response.data.result[0].images_one)
                })
                .catch((error) => {
                    console.error("Error fetching product data:", error);
                });
        }
    }, [product_id]);
    // console.log(productData)


    //圖片抽換
    const [mainPic, setMainPic] = useState(''); // 初始化為 v.images_one

    // 點擊事件處理函數，更新主圖片的 URL
    const handleImageClick = (newImageUrl) => {
        setMainPic(newImageUrl);
    };

    // 讀取review資料
    const [reviewData, setReviewData] = useState([]); // 使用空数组作为默认值
    useEffect(() => {
        if (product_id) {
            axios.get(`http://localhost:3005/api/product/product-detail/${product_id}/reviews`)
                .then((response) => {
                    setReviewData(response.data.result); // 直接设置为数组
                    // console.log(response.data.result);
                })
                .catch((error) => {
                    console.error("Error fetching product data:", error);
                });
        }
    }, [product_id]);

    // 從 response.data.result 中獲取星級的數據
    const starRatings = reviewData.map((review) => review.star_rating);

    // 計算星星平均數
    const calculateAverageRating = (starRatings) => {
        if (starRatings.length === 0) {
            return 0; //如果沒有星星，平均數等於0
        }
        //(accumulator, rating) => accumulator + rating, 0 這句看不懂!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const totalRating = starRatings.reduce((accumulator, rating) => accumulator + rating, 0);
        const averageRating = totalRating / starRatings.length;
        return averageRating;
    };

    const averageRating = calculateAverageRating(starRatings);

    // 星星評論的長度，例如 [5, 4, 3, 2, 1]
    const starRatingLengths = [5, 4, 3, 2, 1];

    // 計算每個星級的百分比長度
    const calculatePercentageLengths = (starRatingLengths, starRatings) => {
        const percentageLengths = starRatingLengths.map((rating) => {
            // 計算每個星級評分的數量
            const ratingCount = starRatings.filter((ratingValue) => ratingValue === rating).length;
            // 計算百分比長度，假設總數量為 starRatings.length
            const percentage = (ratingCount / starRatings.length) * 100;
            return percentage;
        });
        return percentageLengths;
    };

    // 獲取星星評分的百分比長度數組
    const percentageLengths = calculatePercentageLengths(starRatingLengths, starRatings);

    //推薦隨機8筆
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3005/api/product/recommend') // 設有一個API可以獲取隨機產品
            .then((response) => {
                // 從API響應中獲取隨機產品
                const randomProducts = response.data;
                // 將隨機產品設置為狀態
                setRandomProducts(randomProducts);
            })
            .catch((error) => {
                console.error('Error fetching random products:', error);
            });

        getCollection()
        
    }, []);

    // 添加商品到購物車的函式
    const { cart, setCart } = useCart();
    //儲存選中的type_id-selectedTypeId
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const getCart = () => {
        axios.get("http://localhost:3005/api/product/cart?userId=${userId}")
            .then((response) => {
                const data = response.data.result;
                const newData = data.map((v) => {
                    return { ...v, buy: true }
                })
                setCart(newData)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const addCart = async (product_id, product_type_id, quantity) => {
        console.log(product_id, product_type_id, quantity)

        // 檢查購物車中是否已經存在具有相同 id 和類型的商品
        const have = cart.find((v) => v.product_id == product_id && v.type_id == product_type_id);
        console.log(have);

        // 如果購物車中沒有相同的商品
        if (have === undefined) {
            console.log(cart);

            try {
                // 發送HTTP請求將商品添加到購物車
                const response = await axios.put(
                    `http://localhost:3005/api/product/car?userId=${userId}`,
                    { product_id, product_type_id, quantity },
                    console.log(product_id, product_type_id, quantity),
                    console.log('我是會員'+ userId)
                );
            } catch (error) {
                console.error("錯誤：", error);
            }

            // 獲取最新的購物車資料
            getCart();
        } else { // 如果購物車中已經存在相同的商品
            try {
                // 計算新的商品數量（增加1）
                const newQuantity = have.quantity + 1;
                console.log(newQuantity);
                console.log(id);

                // 發送HTTP請求將商品數量更新為新數量
                const response = await axios.put(
                    `http://localhost:3005/api/product/cartplus`,
                    { id, newQuantity, type }
                );
            } catch (error) {
                console.error("錯誤：", error);
            }

            // 獲取最新的購物車資料
            getCart();
        }
    };

    // 添加商品到收藏的函式
   
    //儲存選中的type_id-selectedTypeId 加到購物車時已經有寫了
    // const [selectedTypeId, setSelectedTypeId] = useState('');
    const getCollection = () => {
        axios.get("http://localhost:3005/api/product/collections?userId=${userId}")
            .then((response) => {
                setCollection(response.data.result);
                console.log(response.data.result)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        
    }

    const addCollection = async (product_id, product_type) => {
        console.log(product_id, product_type)

        // 檢查收藏中是否已經存在具有相同 id 和類型的商品
        const have = collection.find((v) => v.product_id == product_id && v.type_id == product_type);
        console.log(have);

        // 如果購物車中沒有相同的商品
        if (have === undefined) {
            try {
                // 發送HTTP請求將商品添加到購物車
                const response = await axios.put(
                    `http://localhost:3005/api/product/collections?userId=${userId}`,
                    { product_id, product_type }
                );
            } catch (error) {
                console.error("錯誤：", error);
            }

            // 獲取最新的收藏資料
            getCollection();
        }
        //  else { // 如果購物車中已經存在相同的商品
        //     try {

        //     } catch (error) {
        //         console.error("錯誤：", error);
        //     }

        //     // 獲取最新收藏資料
        //     getCart();
        // }
    };


    return (
        <>
            <div className='product-detail'>
                <div className="container ">
                    {productData.map((v, i) => {
                        return (
                            <>
                                {/* <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            <Link href="/">首頁</Link>
                                        </li>
                                        <li class="breadcrumb-item" aria-current="page">
                                            <Link href="/product" >
                                                全部商品
                                            </Link>
                                        </li>
                                        <li class="breadcrumb-item" aria-current="page">
                                            {v.product_name}
                                        </li>
                                    </ol>
                                </nav> */}
                                <section className="product-itembox row justify-content-center" key={v.product_id} >
                                    <div className="product-pic col-lg-6" >
                                        <figure className="main-pic  ">
                                            <img src={mainPic} alt="..."></img>
                                        </figure>
                                        <div className="other-pic mt-2 ">
                                            <div className='row g-2 d-flex justify-content-start '>
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
                                                    <span className="font-big size-5">{v.specialoffer}</span>
                                                </div>
                                                <div className="font-delete size-6" >NT${v.price}</div>
                                            </div>
                                        </div>
                                        <div className="type d-flex flex-column">
                                            <div className="type-chinese">規格</div>
                                            <div className="type-btn d-flex mt-1 ">
                                                {v.type_names.split(',').map((typeName, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        className="btn-outline-brown me-4"
                                                        onClick={() => {
                                                            // 儲存選中的type_id
                                                            setSelectedTypeId(v.type_ids.split(',')[i].trim());
                                                        }}
                                                    >
                                                        {typeName.trim()}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        {/* 計算數量 */}
                                        <div className="quantity-counter">
                                            <div className="type-chinese">數量</div>
                                            <div className="quantity-counter d-flex mt-1">
                                                <button className="decrement  " onClick={handleDecrement}>
                                                    <FiMinus />
                                                </button>
                                                <div className="count d-flex justify-content-center align-items-center ">{count}</div>
                                                <button className="increment  " onClick={handleIncrement}>
                                                    <FiPlus />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="add-to-cart">
                                            <button
                                                className="btn btn-confirm  size-7  m-size-7"
                                                data-bs-toggle="offcanvas"
                                                data-bs-target="#offcanvasRight"
                                                aria-controls="offcanvasRight"
                                                onClick={() => {
                                                    addCart(v.product_id, selectedTypeId, count);
                                                    console.log(v.product_id, selectedTypeId, count)
                                                }
                                                }
                                            >
                                                加入購物車
                                            </button>
                                        </div>
                                        <div className="add-to-favorites">
                                            <button
                                                type="button"
                                                className=" btn-second"
                                                onClick={()=>{
                                                    addCollection(v.product_id, selectedTypeId)
                                                    console.log('收藏:',v.product_id, selectedTypeId)
                                                }}
                                               
                                                >
                                                加入收藏
                                            </button>
                                        </div>
                                        <div>
                                            <p>訂單金額滿新臺幣 4,500 元即享免費標準運送服務


                                                臺北市:
                                                標準運送的商品可於 2-5 個工作天內送達
                                                快遞運送的商品可於 2-3 個工作天內送達

                                                其它縣市:
                                                標準運送的商品可於 3-6 個工作天內送達
                                                快遞運送的商品可於 3-5 個工作天內送達


                                                訂單皆於星期一至星期五之間處理與寄送 (國定假日除外)</p>
                                        </div>
                                    </div>
                                    {/* 加到購物車 */}
                                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" >
                                        <div className="offcanvas-header">
                                            <p id="offcanvasRightLabel" className="size-6">我的購物車({cart.length})</p>
                                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className="offcanvas-body">
                                            {cart.map((v, i) => {
                                                return (
                                                    <>
                                                        <div key={i} className="d-flex mb-3 border-bottom mx-2">
                                                            <div className="">
                                                                <img src={v.images}></img>
                                                            </div>
                                                            <div className="">
                                                                <p className="size-7">{v.product_name}</p>
                                                                <p className="size-7 type">{v.type}</p>
                                                                <p className="size-7 price">NT${v.newprice}</p>
                                                                <p className="size-7">數量：{v.quantity}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                            <div className="d-flex justify-content-around mb-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-confirm"
                                                    data-bs-dismiss="offcanvas"
                                                    aria-label="Close"
                                                >
                                                    繼續購物
                                                </button>
                                                <button type="button" className="btn btn-confirm">
                                                    前往購物車
                                                </button>
                                            </div>

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
                                            <ProductDescription htmlContent={v.description} />

                                        </div>
                                        <div className="product-description-pic text-center ">
                                            <figure className="main-pic ">
                                                <img src={v.images_one} alt="..."></img>
                                            </figure>
                                            <figure className="main-pic ">
                                                <img src={v.images_two} alt="..."></img>
                                            </figure>
                                        </div>
                                    </section>
                                )}

                            </>
                        );
                    })}

                    {/* 顧客評價 */}
                    {activeSection === 'customer-message' && (
                        <section className="customer-message" >
                            <div className="star">
                                <div className="Overall-rating-detail">
                                    <div className="evaluation-bar">
                                        <div className="evaluation-bar-left d-flex flex-column justify-content-center">
                                            <p className="size-4 text-center">{averageRating} 顆星</p>
                                            <div className="ranking mb-2 mx-auto">
                                                {/* 渲染平均星級 */}
                                                {Array.from({ length: Math.floor(averageRating) }, (_, index) => (
                                                    <AiFillStar key={index} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="evaluation-bar-divider"></div>
                                        <div className="evaluation-bar-right d-flex flex-column justify-content-evenly">
                                            {starRatingLengths.map((rating, index) => (
                                                <div className="bar-group" key={index}>
                                                    <p className="number size-6">{rating}</p>
                                                    <div className="percentage">
                                                        <div className="have" style={{ width: `${percentageLengths[index]}%` }}></div>
                                                        <div className="no-have" style={{ width: `${100 - percentageLengths[index]}%` }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {reviewData.map((v, i) => {
                                return (

                                    <div className="customer" key={i}>
                                        <div className="customer-name">{v.name}</div>
                                        <div className="customer-star">
                                            {/* _佔位符，要再了解 */}
                                            {Array.from({ length: v.star_rating }, (_, index) => (
                                                <AiFillStar key={index} />
                                            ))}
                                        </div>
                                        <div className="customer-content">
                                            {v.review_content}
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    )}

                    <section className='recommend-product p-4'>
                        <div className="customer-message-title text-center mb-3 ">
                            <h4 className="name size-4">你可能會喜歡的商品</h4>
                        </div>
                        <div id="carouselExampleControls" className="carousel slide " data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="row d-lg-flex  justify-content-center ">
                                        <ProductCard3 />
                                    </div>
                                </div>
                                <div className="carousel-item active">
                                    <div className="row d-lg-flex  justify-content-center ">
                                        <ProductCard3 />
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