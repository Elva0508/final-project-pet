import { React, useState } from 'react';
import Search from '@/components/job/search';
import ProductCard2 from '@/components/product/product-card2';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Pagination from '@/components/pagination';
import { HiOutlineFilter } from 'react-icons/hi';
import LoadingOverlay from '@/components/product/loadingoverlay'; //加載畫面尚未成功
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



export default function ProductList() {

    // 讀取資料庫資料
    const [productData, setProductData] = useState([]); // 初始化為一個帶有 result 屬性的物件
    //圖片抽換
    const [mainPic, setMainPic] = useState(''); // 初始化為 v.images_one
    // 讀取all product 資料庫資料
    useEffect(() => {
        axios.get("http://localhost:3005/api/product").then((response) => {
            const data = response.data.result;
            setProductData(data); // 將伺服器端的 result 放入物件中
            setMainPic(data[0].images_one)
            console.log(response.data.result[0].images_one)
        });
    }, []);

    //分頁
    const itemsPerPage = 18
    const [activePage, setActivePage] = useState(1);
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = productData.slice(startIndex, endIndex);

    const total = productData
    // console.log(total)

    const [isUpIconVisible, setIsUpIconVisible] = useState(false);
    const [isPriceIconVisible, setIsPriceIconVisible] = useState(false);

    //排序按鈕切換
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

    //讀出大類小類
    const [subcategoryData, setSubcategoryData] = useState({ result: [] });
    useEffect(() => {
        axios.get("http://localhost:3005/api/product/category").then((response) => {
            setSubcategoryData({ result: response.data.result });
        });
    }, [])

    //篩選＋排序
    // 狀態變數，用於存儲商品數據、加載狀態和其他篩選選項
    //category會導致card的category不見！！！！！！！！！！！！！！！！！！
    const [category, setCategory] = useState(null);
    const [subcategory, setSubcategory] = useState(null);
    const [vendor, setVendor] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    // 手風琴剛開始只有第一格打開
    const [activeKey, setActiveKey] = useState(0); // 初始值为0，表示第一个格子展开
    const [isLoading, setIsLoading] = useState(false); // 加載畫面
    
    // 根據篩選條件發送請求到後端 API
    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:3005/api/product/filter_sort', {
            params: {
                category,
                subcategory,
                vendor,
                minPrice,
                maxPrice,
                sortBy,
            },
        })
            .then(response => {
                // 请求完成后隐藏加载蒙层
                setIsLoading(false);
                setProductData(response.data.result);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, [category, subcategory, vendor, minPrice, maxPrice, sortBy]);

    // 當選擇不同的篩選條件時，更新相應的狀態
    // 透過 event.target.value 來找到用戶輸入的值
    const handleCategoryChange = (categoryName) => {
        setCategory(categoryName);
        console.log(categoryName)
        setSubcategory(null);
    };
    <LoadingOverlay isLoading={isLoading} />

    const handlesubCategoryChange = (subcategoryName) => {
        setCategory(null);
        const trimmedSubcategory = subcategoryName.trim();
        setSubcategory(trimmedSubcategory);
        console.log(trimmedSubcategory)
    };


    const handleVendorChange = (event) => {
        setVendor(event.target.value)
    }

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    //篩選重複的廠商
    const [vendorData, setVendorData] = useState({ result: [] });
    useEffect(() => {
        axios.get("http://localhost:3005/api/product/vendor").then((response) => {
            console.log(response.data.result); 
            setVendorData({ result: response.data.result });
        });
    }, []);




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
                        {/* created_at和specialoffer排序 */}
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
                    {/* 手機版篩選 */}
                    <div className="product-offcanvas-m d-block d-lg-none ">
                        <button className="product-sidebar-btn btn-confirm size-5" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><HiOutlineFilter /></button>

                        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasRightLabel">篩選</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>

                            <div className="offcanvas-body ">
                                {/* category及subcategory篩選 */}
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
                                                    onClick={() => {
                                                        handleCategoryChange(category.category_name);
                                                        console.log(`Button for category ${category.category_name} clicked.`);
                                                    }}
                                                >
                                                    {category.category_name}
                                                </button>
                                            </h2>
                                            <div id={`panelsStayOpen-collapseCategory-${index}`} className="accordion-collapse collapse show" aria-labelledby={`panelsStayOpen-headingCategory-${index}`}>
                                                <div className="accordion-body row">
                                                    {category.subcategories && category.subcategories.split(',').map((subcategory, subIndex) => (
                                                        <button
                                                            className="button-subcategory"
                                                            type="button"
                                                            key={subIndex}
                                                            onClick={() => {
                                                                handlesubCategoryChange(subcategory.trim());
                                                                console.log(`Button for subcategory ${subcategory.trim()} clicked.`);
                                                            }}
                                                        >
                                                            {subcategory.trim()}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <LoadingOverlay isLoading={isLoading} />

                                <div className='filter mt-3 '>
                                    <div className="card filter-card">
                                        {/* <div className="card-header">
                                            其他選項
                                        </div> */}
                                        <div className="card-body">
                                            {/* specialoffer篩選 */}
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
                                            {/* vendor篩選 */}
                                            <div className="col-12 mt-2">
                                                <label for="brand" className="form-label">品牌</label>
                                                <input type="text" className="form-control" id="brand" placeholder="請輸入品牌關鍵字">
                                                </input>
                                            </div>
                                            <button type="submit" className="btn btn-brown col-12 mt-3">
                                                確定
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 電腦版篩選 */}
                    <section className='sidebar-product d-flex  flex-column flex-lg-row mt-3' >
                        <div className='sidebar col-md-3 ms-3 me-1 d-none d-lg-block pe-4'>
                            {/* category及subcategory篩選 */}
                            <div className="accordion" id={`accordionPanelsStayOpenExample`}>
                                {subcategoryData.result.map((category, index) => (
                                    <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header" id={`panelsStayOpen-headingCategory-${index}`}>
                                            <button
                                                className="accordion-button size-6"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#panelsStayOpen-collapseCategory-${index}`}
                                                aria-expanded={activeKey === index}
                                                aria-controls={`panelsStayOpen-collapseCategory-${index}`}
                                                data-bs-parent="#accordionPanelsStayOpenExample" // 將這行添加到這個button元素中
                                                onClick={() => {
                                                    setActiveKey(index); // 当按钮被点击时，更新activeKey状态
                                                    handleCategoryChange(category.category_name);
                                                    console.log(`Button for category ${category.category_name} clicked.`);
                                                }}
                                            >
                                                {category.category_name}
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapseCategory-${index}`} className={`accordion-collapse collapse ${activeKey === index ? 'show' : ''}`}>
                                            <div className="accordion-body row">
                                                {category.subcategories && category.subcategories.split(',').map((subcategory, subIndex) => (
                                                    <button
                                                        className="button-subcategory size-7"
                                                        type="button"
                                                        key={subIndex}
                                                        onClick={() => {
                                                            handlesubCategoryChange(subcategory.trim());
                                                            console.log(`Button for subcategory ${subcategory.trim()} clicked.`);
                                                        }}
                                                    >
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
                                    {/* <div className="card-header">
                                        其他選項
                                    </div> */}
                                    <div className="card-body">
                                        {/* specialoffer篩選 */}
                                        <div className="col-12">
                                            <label for="inputprice size-6" className="form-label">價格區間</label>
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
                                        {/* vendor篩選 */}
                                        <div className="col-12 mt-2">
                                            <label for="brand size-6" className="form-label">品牌</label>
                                            {/* <input type="text" className="form-control" id="brand" placeholder="請輸入品牌關鍵字">
                                            </input> */}
                                            <select id="inputsubCategory" className="form-select" name="subcategory_name">
                                                <option selected>請選擇</option>
                                                {vendorData.result.map((vendor, index) => (
                                                    <option key={index} value={vendor.vendor}>{vendor.vendor}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-brown col-12 mt-3">
                                            確定
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 商品顯示區 */}
                        <div className='product d-lg-flex flex-column justify-content-center '>
                            <div className=" row d-flex mb-3 g-3 g-md-4 ">
                                <ProductCard2 productData={currentData} mainPic={mainPic} setMainPic={setMainPic} />
                                {/* 原本錯的 */}
                                {/* <div className="col-lg-4 col-md-4 col-sm-6">
                                    <ProductCard />
                                </div> */}
                            </div>
                            <Pagination itemsPerPage={itemsPerPage} total={total} activePage={activePage} setActivePage={setActivePage} />
                        </div>
                    </section>

                </div>
            </div>

        </>
    )
}