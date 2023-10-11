import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import SingleCoupon from "@/components/user/SingleCoupon";
import SingleCouponFree from "@/components/user/singleCouponFree";
import Image from "next/image";
import myProfile from "@/assets/myProfile.svg";

import Cat2 from "@/assets/cat-02.png";

const UserCouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const searchInput = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const apiUrl = "http://localhost:3005/api/user/user-coupon";

  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      setCoupons(response.data.results);
      setFilteredCoupons(response.data.results);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);
  //console.log(setCoupons);

  const handleFilter = (filter) => {
    //const filter = event.target.value;
    if (filter === "all") {
      setFilteredCoupons(coupons);
      setShowAll(true);
    } else if (filter === "expiring") {
      const expiringCoupons = coupons.filter(coupon => {
        const endDate = new Date(coupon.end_date);
        const today = new Date();
        const timeDiff = endDate.getTime() - today.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff <= 30 && daysDiff >= 0;
      });
      setFilteredCoupons(expiringCoupons);
      setShowAll(false);
      setActiveFilter('expiring');
    }
  };

  const handleSearch = () => {
    const searchValue = searchInput.current.value;
    if (searchValue === "") {
      setFilteredCoupons(coupons);
      setShowAll(true);
    } else {
      const searchedCoupons = coupons.filter((coupon) => {
        return coupon.coupon_code.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredCoupons(searchedCoupons);
      setShowAll(false);
    }
  };

  return (
    <div className=" my-3">
    <div className="d-flex justify-content-around pt-2">
      <div className="d-flex justify-content-end">
        {/* mobile版的左側tab */}
      </div>
      <ListUserM />
      <ListD />

      <div className="user-coupon row col-lg-8 col-md-8 col-12 ">
        <div className="title">
          <p className=" size-4">
          <Image src={myProfile} alt="myProfile-logo" />
            我的優惠券
          </p>
        </div>

        <div className='couponSearch d-flex gap-3 '>
          <input className='form-input flex-grow-1' type='text' placeholder='輸入優惠序號' ref={searchInput} />
          <button className='btn-confirm' onClick={handleSearch}>搜尋</button>
        </div>

        <div className='border-bottom my-3 py-1'>
          <a className={`px-2 ${activeFilter === 'all' ? 'active' : ''}`} value='all' onClick={()=>handleFilter("all")}>全部({coupons.length})</a>
          {/* <a className='px-2' value='valid' onClick={handleFilter}>有效期內</a> */}
          <a className={`px-2 ${activeFilter === 'expiring' ? 'active' : ''}`}value='expiring' onClick={()=>handleFilter("expiring")}>即將到期({filteredCoupons.length})</a>
        </div>

        {/* <table className='userTable'>
          <thead>
            <tr>
              <th>名稱</th>
              <th>面額</th>
              <th>生效日</th>
              <th>到期日</th>
              <th>說明</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.map(v => (
              <tr key={v.coupon_id}>
                <td data-label="名稱:">{v.title}</td>
                <td data-label="面額:">${v.discount_amount}</td>
                <td data-label="生效日:">{v.start_date}</td>
                <td data-label="到期日:">{v.end_date}</td>
                <td data-label="說明:" className='pl-3'>
                  最低消費金額：{v.usage_min}<br />
                  序號：{v.coupon_code}<br />
                  適用商品：<a href='#'>查看</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <div className="coupon-wrapper">
        {filteredCoupons.map(v=>(
        <div id="container-coupon">
        <div id="success-box">
          <div className="cat-box">
            <Image src={Cat2} width={80} height={80} className="cat2" />
          </div>
          <div className="shadow scale" />
          <div className="message-coupon">
            <h1 className="priceCode">${v.discount_amount}</h1>
            <p>
              序號：{v.coupon_code}
              <br />
              最低消費：{v.usage_min}
              <br />
              使用期限：{v.end_date}
              <br />
              <a  href='#'> -前往購物-</a>
            </p>
          </div>
        </div>
      </div>
      ))}
        {/* <SingleCoupon />
        <SingleCoupon /> */}
        </div>
        

      </div>
    </div>
    </div>
  );
};

export default UserCouponPage;
