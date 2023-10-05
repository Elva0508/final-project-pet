import { React, useState } from 'react';
import Footer from '@/components/footer';
import Search from '@/components/job/search';
import ProductCard2 from '@/components/product/product-card2';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import ProductListOffcanvas from '@/components/product/product-list-offcanvas';
import { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


export default function ProductList() {

    const [isUpIconVisible, setIsUpIconVisible] = useState(false);
    const [isPriceIconVisible, setIsPriceIconVisible] = useState(false);

    const toggleUpIcon = () => {
        setIsUpIconVisible(!isUpIconVisible);

        // 如果價格按鈕已經是 $text-main，則切換價格按鈕回 $text-mark
        if (isPriceIconVisible) {
            setIsPriceIconVisible(false);
        }
    };

    const togglePriceIcon = () => {
        setIsPriceIconVisible(!isPriceIconVisible);

        // 如果上架時間按鈕已經是 $text-main，則切換上架時間按鈕回 $text-mark
        if (isUpIconVisible) {
            setIsUpIconVisible(false);
        }
    };

    const [subcategoryData, setSubcategoryData] = useState({ result: [] });
    useEffect(() => {
        axios.get("http://localhost:3005/api/product/category").then((response) => {
            setSubcategoryData({ result: response.data.result });
        });
    }, [])



    return (
        <>
            <div className='product-list'>
                <div className='container'>
                    <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <Link href="/">首頁</Link>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">
                                <Link href="/product" >
                                    全部商品
                                </Link>
                            </li>
                        </ol>
                    </nav>
                    <div className="search-sort d-flex flex-md-row flex-column justify-content-between align-items-center ms-3 me-3">
                        <Search />
                        <div className='sort ' >
                            <div className='sort-btn d-flex   justify-content-center text-align-center'>
                                <button className={`size-7 m-1 p-1 ${isUpIconVisible ? 'active' : ''}`} onClick={toggleUpIcon}>
                                    上架時間 {isUpIconVisible ? <FaCaretUp /> : <FaCaretDown />}
                                </button>
                                <button className={`size-7 m-1 p-1 ${isPriceIconVisible ? 'active' : ''}`} onClick={togglePriceIcon}>
                                    價格 {isPriceIconVisible ? <FaCaretUp /> : <FaCaretDown />}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className='search-sort  d-flex  justify-content-center align-items-center '>
                                <div className='search '>
                                    <Search />
                                </div>
                                
                            </div> */}
                    <div className="product-offcanvas-m d-block d-lg-none ">
                        <ProductListOffcanvas />
                    </div>


                    <section className='sidebar-product d-flex  flex-column flex-lg-row mt-3' >
                        <div className='sidebar col-md-3 ms-3 me-1 d-none d-lg-block pe-4'>
                            <div className="accordion" id={`accordionPanelsStayOpenExample`}>
                                {subcategoryData.result.map((category, index) => (
                                    <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header" id={`panelsStayOpen-headingCategory-${index}`}>
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#panelsStayOpen-collapseCategory-${index}`}
                                                aria-expanded="true"
                                                aria-controls={`panelsStayOpen-collapseCategory-${index}`}
                                                data-bs-parent="#accordionPanelsStayOpenExample" // 將這行添加到這個button元素中
                                            >
                                                {category.category_name}
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapseCategory-${index}`} className="accordion-collapse collapse show" aria-labelledby={`panelsStayOpen-headingCategory-${index}`}>
                                            <div className="accordion-body row">
                                                {category.subcategories && category.subcategories.split(',').map((subcategory, subIndex) => (
                                                    <button className="button-subcategory" type="button" key={subIndex}>
                                                        {subcategory.trim()}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>



                            <div className='filter mt-3 '>
                                <div className="card filter-card">
                                    <div className="card-header">
                                        其他選項
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="col-12">
                                                <label for="inputprice" className="form-label">價格區間</label>
                                                <div className="row col-md">
                                                    <div className="col-md-5">
                                                        <input type="number" className="form-control" id="price" placeholder="$最低價">
                                                        </input>
                                                    </div>
                                                    <div class="col-md dash">
                                                        ~
                                                    </div>
                                                    <div className="col-md-5">
                                                        <input type="number" className="form-control" id="price" placeholder="$最高價">
                                                        </input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <label for="brand" className="form-label">品牌</label>
                                                <input type="text" className="form-control" id="brand" placeholder="請輸入品牌關鍵字">
                                                </input>
                                            </div>
                                            <button type="submit" className="btn btn-brown col-12 mt-3">
                                                確定
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className='product d-lg-flex flex-column justify-content-center '>
                            <div className=" row d-flex mb-3 g-3 g-md-4 ">
                                <ProductCard2 />
                                {/* 原本錯的 */}
                                {/* <div className="col-lg-4 col-md-4 col-sm-6">
                                    <ProductCard />
                                </div> */}
                            </div>
                        </div>

                    </section>



                </div>
            </div>
        </>
    )
}
