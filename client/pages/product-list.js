import React from 'react';
import Footer from '@/components/footer';
import Search from '@/components/job/search';
import ProductCard from '@/components/product/product-card';


export default function ProductList() {
    return (
        <>
            <div className='container'>
                <p>我是麵包蟹</p>
                <section className='search-selective d-flex justify-content-center '>
                    <Search />
                </section>
                <section className='sidebar-product d-flex '>
                    <div className='sidebar col-md-3 me-5'>
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
                        <div className='filter mt-3'>
                            <div className="card filter-card">
                                <div className="card-header">
                                    快速篩選
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="col-12">
                                            <label for="inputprice" className="form-label">價錢篩選</label>
                                            <div className="row col-md">
                                                <div className="col-md-5">
                                                    <input type="number" className="form-control" id="price" placeholder="">
                                                    </input>
                                                </div>
                                                <div class="col-md dash">
                                                    ~
                                                </div>
                                                <div className="col-md-5">
                                                    <input type="number" className="form-control" id="price" placeholder="">
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
                                            一鍵篩選
                                        </button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='product col-md-8   '>
                        <div className="row justify-content-between mb-4">
                            <div className="col-md-4">
                                <ProductCard />
                            </div>
                            <div className="col-md-4">
                                <ProductCard />
                            </div>
                            <div className="col-md-4">
                                <ProductCard />
                            </div>
                            <div className="col-md-4 mt-3">
                                <ProductCard />
                            </div>
                            <div className="col-md-4 mt-3">
                                <ProductCard />
                            </div>
                            <div className="col-md-4 mt-3">
                                <ProductCard />
                            </div>
                            <div className="col-md-4 mt-3">
                                <ProductCard />
                            </div>
                            <div className="col-md-4 mt-3">
                                <ProductCard />
                            </div>
                            <div className="col-md-4 mt-3">
                                <ProductCard />
                            </div>
                        </div>

                    </div>
                </section>

            </div>
            <footer>
                <Footer />
            </footer>


        </>
    )
}
