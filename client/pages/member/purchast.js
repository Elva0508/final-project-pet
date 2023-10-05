import React, { useState, useEffect } from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { BiSolidShoppingBag } from "react-icons/bi";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useCart } from "@/hooks/useCart"
import axios from "axios";

export default function Purchast() {
  const [product, setProduct] = useState([]);
  const { cart, setCart } = useCart();
  const [wishlist, setWishlist] = useState([])


  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = product.slice(startIndex, endIndex);

  const [activePage, setActivePage] = useState(1);



  const getProduct = () => {
    axios
      .get("http://localhost:3005/api/member-purchast")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const addCart = async (id, type) => {
    const have = cart.find(
      (v) => v.product_id == id && v.product_type_id == type
    );
    console.log(have);
    if (have === undefined) {
      try {
        const response = await axios.put(
          `http://localhost:3005/api/member-purchast/cart`,
          { id, type }
        );
      } catch (error) {
        console.error("Error:", error);
      }
      getCart()
    } else {
      try {
        const newQuantity = have.quantity + 1;
        console.log(newQuantity);
        console.log(id);
        const response = await axios.put(
          `http://localhost:3005/api/member-purchast/cartplus`,
          { id, newQuantity, type }
        );
      } catch (error) {
        console.error("Error:", error);
      }
      getCart()
    }
  };


  const getWishlist = async () => {
    await axios
      .get("http://localhost:3005/api/member-purchast/wishlist")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setWishlist(data);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const addWishlist = async (id) => {
    const have = wishlist.find(
      (v) => v.product_id === id
    );
    console.log(have);
    if (have === undefined) {
      try {
        const response = await axios.put(
          `http://localhost:3005/api/member-purchast/addwishlist`,
          { id }
        );
      } catch (error) {
        console.error("Error:", error);
      }
      getWishlist()
    }
  };



  const getCart = () => {
    axios.get("http://localhost:3005/api/product/cart")
      .then((response) => {
        const data = response.data.result;
        const newData = data.map((v) => {
          return { ...v, buy: true }
        })
        setCart(newData)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }



  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getProduct();
    getWishlist()
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
          <div className="row col-lg-8 col-md-8 col-12 purchast-bg  p-3">
            <div>
              <h5 className="size-5">
                <BiSolidShoppingBag />
                購買紀錄
              </h5>

              {currentData.map((v, i) => {
                return (
                  <>
                    <div className="d-flex border-bottom py-2 justify-content-between">
                      <div className="d-flex  col-9" key={i}>
                        <img
                          className="picture me-4"
                          src={v.image}
                        ></img>

                        <div className="">
                          <p className="size-6">{v.product_name}</p>
                          <p className="size-6 type">{v.type}</p>
                          <p className="size-6 price">NT${v.price}</p>
                        </div>
                      </div>

                      <div className="col-3  d-flex flex-column align-items-center justify-content-center">
                        <button className="btn btn-confirm m-2 size-6 m-size-7"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                          onClick={() => addCart(v.product_id, v.type_id)}
                        >
                          再次購買
                        </button>

                        {wishlist.find((w) => w.product_id === v.product_id) === undefined ? (
                          <button className="btn btn-outline-confirm m-2 size-6 m-size-7"
                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onClick={() => addWishlist(v.product_id)}
                          >
                            加入收藏
                          </button>
                        ) : (
                          <button className="btn btn-outline-confirm m-2 size-6 m-size-7"
                          >
                            已加入收藏
                          </button>
                        )}



                      </div>
                    </div>
                  </>
                );
              })}


              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">通知</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      已成功將商品加入收藏
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-confirm" data-bs-dismiss="modal">關閉</button>
                    </div>
                  </div>
                </div>
              </div>


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
                            <img className="picture" src={v.images}></img>
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
                  <div className="d-flex justify-content-around mb-3">
                    <button
                      type="button"
                      className="btn btn-confirm"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      繼續購物
                    </button>
                    <button type="button" className="btn btn-confirm">
                      前往購物車
                    </button>
                  </div>

                </div>
              </div>


              <div className="pagination size-7 d-flex justify-content-center mt-4">
                <button className="btn prev border-0">
                  <GrFormPrevious />
                </button>
                {Array.from({
                  length: Math.ceil(product.length / itemsPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handlePageChange(index + 1);
                      setActivePage(index + 1);
                    }}
                    className={`btn me-1 ${activePage === index + 1 ? "active" : ""
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button className="btn next border-0">
                  <GrFormNext />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
