import React, { useState, useEffect } from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { FaList } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import {useCart} from "@/hooks/useCart"
import axios from "axios";
import Pagination from '@/components/pagination'

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [wishlisttype, setWishlistType] = useState([]);
  const {cart, setCart} = useCart();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = wishlist.slice(startIndex, endIndex);



  const handleSelectChange = (pid, v) => {
    const newList = wishlist.map((w) => {
      if (w.product_id === pid) {
        return {
          ...w, // 复制原始对象的属性
          product_type: v, // 更新type_id
        };
      }
      return w; // 其他项目不受影响，保持原样
    });
    setWishlist(newList);
    console.log(wishlist);
  };


  const addCart = async (id, type) => {

    const have =cart.find((v) => v.product_id == id && v.product_type_id == type);
    

    console.log(have);
    if (have === undefined) {
    console.log(cart)

      try {
        const response = await axios.put(
          `http://localhost:3005/api/member-wishlist/cart`,
          { id, type }
        );
      } catch (error) {
        console.error("Error:", error);
      }
      getCart();
    } else {
      try {
        const newQuantity = have.quantity + 1;
        console.log(newQuantity);
        console.log(id);
        const response = await axios.put(
          `http://localhost:3005/api/member-wishlist/cartplus`,
          { id, newQuantity, type }
        );
      } catch (error) {
        console.error("Error:", error);
      }
      getCart();
    }
  };

  const deleteWishlist = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/member-wishlist/${id}`
      );
      const newWishlist = wishlist.filter((v) => v.collection_id !== id);
      setWishlist(newWishlist);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getWishlist = async () => {
    await axios
      .get("http://localhost:3005/api/member-wishlist")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setWishlist(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getWishlistType = async () => {
    await axios
      .get("http://localhost:3005/api/member-wishlist/type")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setWishlistType(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getCart =  () => {
    axios.get("http://localhost:3005/api/product/cart")
        .then((response) => {
        const data = response.data.result;
        const newData=data.map((v)=>{
            return  { ...v, buy: true }
        })
            setCart(newData)     
        })
        .catch((error) => {
        console.error("Error:", error);
    });
}

  useEffect(() => {
    getWishlistType();
    getWishlist();
  }, []);



  return (
    <>
      <div className="my-3">
        <div className="d-flex justify-content-end me-3">
          <ListM />
        </div>
        <ListUserM />
        <div className="d-flex justify-content-around pt-2">
          <ListD />
          <div className="d-flex flex-column col-md-8 col-12 wishlist">

              <div className="d-flex justify-content-between">
                <h5 className="size-5 mt-3 ms-md-5 ms-3">
                  <FaList />
                  追蹤清單
                </h5>
                <p className="size-7 mt-3 me-md-5 pe-md-5 pe-2">已追蹤{wishlist.length}樣商品</p>
              </div>

              {currentData.map((v, i) => {
                return (
                  <>
                    <div
                      className="col-12 d-flex justify-content-between border-bottom pt-4 pb-2 ps-md-5 ps-3"
                      key={v.collection_id}
                    >
                      <div className="d-flex col-7 col-md-8">
                        <img src={v.images} alt={v.product_name} />
                        <div className="ms-3">
                          <p className="size-6 m-size-7">{v.product_name}</p>
                          <p className="size-6 m-size-7 price">NT${v.price}</p>
                          <div className="">
                            <select
                              className="form-select"
                              style={{ width: "150px" }}
                              onChange={(e) =>
                                handleSelectChange(v.product_id, e.target.value)
                              }
                            >
                              {wishlisttype
                                .filter((t) => t.product_id === v.product_id)
                                .map((t, i) => (
                                  <option key={i} value={t.type_id} >
                                    {t.type_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-5 col-md-4  d-md-flex align-items-center d-none  flex-column justify-content-center">
                        <button
                          className="btn btn-confirm size-6 m-size-7 my-2" 
                          data-bs-toggle="offcanvas" 
                          data-bs-target="#offcanvasRight" 
                          aria-controls="offcanvasRight"
                          onClick={() => addCart(v.product_id, v.product_type)}
                        >
                          立即購買
                        </button>
                        <button
                          className="btn btn-outline-confirm size-6 m-size-7 my-2"
                          onClick={() => {
                            // 這裡作刪除的動作
                            deleteWishlist(v.collection_id);
                          }}
                        >
                          取消追蹤
                        </button>
                      </div>

                      <div className="col-4 d-md-none d-flex flex-column justify-content-between align-items-end">
                        <div className="d-flex justify-content-center">
                          <button
                            className="delete btn btn-outline-confirm size-6 m-size-7 m-2"
                            onClick={() => {
                              // 這裡作刪除的動作
                              deleteWishlist(v.collection_id);
                            }}
                          >
                            取消追蹤
                          </button>
                        </div>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-confirm m-2 size-7  m-size-7"
                            data-bs-toggle="offcanvas" 
                          data-bs-target="#offcanvasRight" 
                          aria-controls="offcanvasRight"
                            onClick={() =>
                              addCart(v.product_id, v.product_type)
                            }
                          >
                            立即購買
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}


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
                    <div className="d-flex justify-content-center my-3">
                      <button
                        type="button"
                        className="btn btn-confirm"
                        data-bs-dismiss="offcanvas" 
                        aria-label="Close"
                      >
                        繼續購物
                      </button>
                      <button type="button" className="btn btn-confirm  ms-5">
                        前往結帳
                      </button>
                    </div>

                </div>
              </div>
              <div className="mt-4">
                <Pagination  itemsPerPage={itemsPerPage} total={wishlist} activePage={activePage} setActivePage={setActivePage}/>
              </div>
              
            </div>
          </div>
        </div>
    </>
  );
}
