import React from 'react';


export default function ProductDetail() {
    return (
        <>
            <div className="container">
                <section className="product-itembox d-flex" >
                    <div className="product-pic">
                        <div className="main-pic">
                            <img src="/product/product-test.jpg" alt="..."></img>
                        </div>
                        <div className="other-pic mt-2 ">
                            <img src="/product-test.jpg" alt="..."></img>
                            <img src="/product-test.jpg" alt="..."></img>
                            <img src="/product-test.jpg" alt="..."></img>
                            <img src="/product-test.jpg" alt="..."></img>
                        </div>
                    </div>
                    <div className="product-detail">
                        <h4 className="name size-4">貓用｜1種肉低敏無膠主食罐 82G</h4>
                        <div className="brand-star d-flex ">
                            <div className="brand size-6">汪喵星球</div>
                            <div className="star size-6">5顆星</div>
                        </div>
                        <div className="price-wrapper">
                            <div className="pricebox_detail  d-flex">
                                <div className="priceBlock" >
                                    <span className="PriceName1 size-3 ">NT$</span>
                                    <span className="font-big size-3">2,490</span>
                                </div>
                                <div className="font-delete size-3" >NT$2,770</div>
                            </div>
                        </div>
                        <div className="description size-7">
                            單一肉源，低敏主1首選
                            <br />
                            簡化成分、嚴選優質1材，給貓咪真實營養！
                            <br />
                            特別適合 ✔幼貓  ✔腸胃敏感貓
                        </div>
                        <div className="type d-flex flex-column">
                            <div className="">
                                <p>規格</p>
                            </div>
                            <div className=" d-flex ">
                                <button type="button" className="btn-outline-brown mx-1">
                                    口味1
                                </button>
                                <button type="button" className="btn-outline-brown mx-1">
                                    口味2
                                </button>
                                <button type="button" className="btn-outline-brown mx-1">
                                    口味3
                                </button>

                            </div>
                        </div>
                        <div className="add-to-cart">
                            <button type="submit" className=" btn-confirm mx-1">
                                加入購物車
                            </button>
                        </div>
                        <div className="add-to-favorites">
                            <button type="button" className=" btn-second mx-1">
                                加入收藏
                            </button>
                        </div>
                    </div>
                </section>
                <section className='product-detail-tabs d-flex justify-content-center'>
                    <ul className="nav nav-underline">
                        <li className="nav-item">
                            <a className="nav-link size-5 " aria-current="page" href="#">商品介紹</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link size-5" aria-current="page" href="#">顧客留言</a>
                        </li>                    
                    </ul>
                </section>

            </div>
        </>
    )
}

