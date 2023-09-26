import { React, useState } from 'react';
import Footer from '@/components/footer';
import Search from '@/components/job/search';
import ProductCard from '@/components/product/product-card';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import ProductListOffcanvas from '@/components/product/product-list-offcanvas';


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

    return (
        <>
            <div className='product-list'>
                <div className='container'>
                    <p>我是麵包蟹</p>
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
                    <section className='sidebar-product d-flex '>
                        <div className='sidebar col-md-3 ms-3 me-1 d-none d-sm-block '>
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="panelsStayOpen-headingCategory">
                                        <button
                                            className="accordion-button "
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseCategory"
                                            aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseCategory"
                                        >
                                            大類1
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseCategory" class="accordion-collapse collapse show">
                                        <div className="accordion-body row">
                                            <button className="button-subcategory" type="button" >
                                                小類
                                            </button>
                                            <button className="button-subcategory" type="button row">
                                                小類
                                            </button>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        {/* 要記得改id/data-bs-target/aria-controls/aria-labelledby數字 */}
                                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                            <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                                大類2
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                            <div className="accordion-body row">
                                                <button className="button-subcategory no-border-btn" type="button" >
                                                    小類
                                                </button>
                                                <button className="button-subcategory" type="button">
                                                    小類
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                        <div className='product col-md-8 mb-2 mx-5 '>
                            <div className="row  ">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <a href='http://localhost:3000/product-detail'>
                                        <ProductCard />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <a href='http://localhost:3000/product-detail'>
                                        <ProductCard />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <a href='http://localhost:3000/product-detail'>
                                        <ProductCard />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <a href='http://localhost:3000/product-detail'>
                                        <ProductCard />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <a href='http://localhost:3000/product-detail'>
                                        <ProductCard />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <a href='http://localhost:3000/product-detail'>
                                        <ProductCard />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </div>
        </>
    )
}
