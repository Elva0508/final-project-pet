import React, { useState, useEffect } from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { FaList } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import axios from "axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [wishlisttype, setWishlistType] = useState([]);
  const [cart, setCart] = useState([]);

  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = wishlist.slice(startIndex, endIndex);

  const [activePage, setActivePage] = useState(1)

  const handleSelectChange=(pid,v)=>{
    const newList=wishlist.map((w)=>{
      if(w.product_id===pid){
        return {
          ...w, // 复制原始对象的属性
          product_type: v, // 更新type_id
        };
      }
      return w; // 其他项目不受影响，保持原样
    })
    setWishlist(newList)
    console.log(wishlist);
  }


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const addCart = async (id,type) => {
    const have = cart.find((v) => v.product_id === id && v.product_type_id===type);
    console.log(have);
    if (have === undefined) {
      try {
        const response = axios.put(
          `http://localhost:3005/api/member-wishlist/cart`, { id,type}
        );
      } catch (error) {
        console.error("Error:", error);
      }
      getCart()
    } else {
      try {
        const newQuantity = have.quantity + 1
        console.log(newQuantity);
        console.log(id);
        const response = await axios.put(
          `http://localhost:3005/api/member-wishlist/cartplus`, { id, newQuantity ,type}
        );
      } catch (error) {
        console.error("Error:", error);
      }
      getCart()
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

  const getCart = () => {
    axios
      .get("http://localhost:3005/api/member-wishlist/cart")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setCart(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getWishlistType();
    getWishlist();
    getCart();
  }, []);



  return (
    <>
      <div className="my-3">
        <div className="d-flex justify-content-end me-3">
          <ListM />
        </div>
        <ListUserM />
        <div className="d-flex justify-content-around py-2">
          <ListD />
          <div className="row col-lg-8 col-md-8 col-12 wishlist p-sm-3">
            <div>
              <div className="d-flex justify-content-between">
                <h5 className="size-5">
                  <FaList />
                  追蹤清單
                </h5>
                <p>已追蹤{wishlist.length}樣商品</p>
              </div>


              {currentData.map((v, i) => {

                return (
                  <>
                    <div className="col-12 d-flex justify-content-between border-bottom py-2" key={v.collection_id}>
                      <div className="d-flex col-7 col-sm-8">
                        <img src={v.images} alt={v.product_name} />
                        <div className="ms-3">
                          <p className="size-6 m-size-7">{v.product_name}</p>
                          <p className="size-6 m-size-7 price">NT${v.price}</p>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              handleSelectChange(v.product_id, e.target.value)
                            }
                          >
                            {wishlisttype
                              .filter((t) => t.product_id === v.product_id)
                              .map((t, i) => (
                                <option key={i} value={t.type_id}>
                                  {t.type_name}
                                </option>
                              ))}
                          </select>

                        </div>
                      </div>
                      <div className="col-5 col-sm-3  d-md-flex align-items-center d-none ">
                        <button
                          className="btn btn-confirm size-6 m-size-7 me-4"
                          onClick={() => addCart(v.product_id,v.product_type)}
                        >
                          加入購物車
                        </button>
                        <button
                          className="delete"
                          onClick={() => {
                            // 這裡作刪除的動作
                            deleteWishlist(v.collection_id);
                          }}
                        >
                          <RiDeleteBin5Line />
                        </button>
                      </div>

                      <div className="col-4 d-md-none d-flex flex-column justify-content-between align-items-end">
                        <div className="d-flex justify-content-center">
                          <button className="delete">
                            <RiDeleteBin5Line />
                          </button>
                        </div>
                        <div className="d-flex justify-content-center">
                          <button className="btn btn-confirm m-2 size-7  m-size-7">
                            加入購物車
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              <div className="pagination size-7 d-flex justify-content-center">
                <button className='btn prev border-0'><GrFormPrevious /></button>
                {Array.from({ length: Math.ceil(wishlist.length / itemsPerPage) }).map((_, index) => (
                  <button key={index} onClick={() => {
                    handlePageChange(index + 1)
                    setActivePage(index + 1)
                  }} className={`btn me-1 ${activePage === index + 1 ? 'active' : ''}`}>
                    {index + 1}
                  </button>
                ))}
                <button className='btn next border-0'><GrFormNext /></button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
