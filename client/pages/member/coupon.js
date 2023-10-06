import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ListD from "@/components/member/list-d";
import ListM from "@/components/member/list-m";

const UserCouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const searchInput = useRef(null);

  const apiUrl = "http://localhost:3005/api/user/user-coupon";

  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      setCoupons(response.data.results);
      setFilteredCoupons(response.data.results);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const handleFilter = (event) => {
    const filter = event.target.value;
    if (filter === "all") {
      setFilteredCoupons(coupons);
      setShowAll(true);
    } else if (filter === "expiring") {
      const expiringCoupons = coupons.filter(coupon => {
        const endDate = new Date(coupon.end_date);
        const today = new Date();
        const timeDiff = endDate.getTime() - today.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff <= 7 && daysDiff >= 0;
      });
      setFilteredCoupons(expiringCoupons);
      setShowAll(false);
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
    <div className="d-flex container-fluid flex-column flex-md-row my-3">
      <div className="d-flex justify-content-end">
        {/* mobile版的左側tab */}
        <ListM />
      </div>

      <ListD />

      <div className="user-coupon">
        <div className="title">
          <p className=" size-4">
            我的優惠券
          </p>
        </div>

        <div className='couponSearch d-flex gap-3 '>
          <input className='form-input flex-grow-1' type='text' placeholder='輸入優惠序號' ref={searchInput} />
          <button className='btn-confirm' onClick={handleSearch}>搜尋</button>
        </div>

        <div className='border-bottom my-3 py-1'>
          <a className={`px-2 ${showAll ? 'active' : ''}`} value='all' onClick={handleFilter}>全部({coupons.length})</a>
          <a className='px-2' value='valid' onClick={handleFilter}>有效期內</a>
          <a className={`px-2 ${!showAll ? 'active' : ''}`} value='expiring' onClick={handleFilter}>即將到期({filteredCoupons.length})</a>
        </div>

        <table className='userTable'>
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
        </table>
      </div>
    </div>
  );
};

export default UserCouponPage;
