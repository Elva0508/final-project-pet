import React, { useState, useEffect } from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { FaList } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const [cart, setCart] = useState([]);

  const addCart = async(id) => {
    const have = cart.find((v) => v.product_id === id);
    console.log(have);
    if(have===undefined){     
      try {
        const response =  axios.put(
          `http://localhost:3005/api/member-wishlist/cart/${id}`
        );
      } catch (error) {
        console.error("Error:", error);
      }
      getCart()
    }else{
      try {
        const newQuantity=have.quantity+1
        console.log(newQuantity);
        console.log(id);
        const response = await axios.put(
          `http://localhost:3005/api/member-wishlist/cartplus`,{id ,newQuantity }
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

  const getCart =  () => {
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

              {wishlist.map((v, i) => {
                return (
                  <>
                    <div className="col-12 d-flex justify-content-between border-bottom py-2">
                      <div className="d-flex col-7 col-sm-8" key={v.collection_id}>
                        <img src={v.image} ></img>
                       <div className="ms-3">
                        <p className="size-6 m-size-7">{v.product_name}</p>
                        <p className="size-6 m-size-7 type">{v.type}</p>
                        <p className="size-6 m-size-7 price">NT${v.price}</p>
                      </div>
                    </div>
                      <div className="col-5 col-sm-3  d-md-flex align-items-center d-none ">
                        <button
                          className="btn btn-confirm size-6 m-size-7 me-4"
                          onClick={() => addCart(v.product_id)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
