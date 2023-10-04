import React, { useState ,useEffect} from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { BiSolidShoppingBag } from "react-icons/bi";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import {useCart} from "@/hooks/useCart"
import axios from "axios";

export default function Purchast() {
  const [product, setProduct] = useState([]);
  const {cart, setCart} = useCart();



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
      (v) => v.product_id === id && v.product_type_id === type
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
  


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getProduct();
  },[]);

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
              
                {currentData.map((v,i) => {
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
                        onClick={() => addCart(v.product_id, v.type_id)}
                        >
                          再次購買
                        </button>
                        <button className="btn btn-outline-confirm m-2 size-6 m-size-7">
                          加入收藏
                        </button>
                      </div>
                      </div>
                    </>
                  );
                })}
              
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
                    className={`btn me-1 ${
                      activePage === index + 1 ? "active" : ""
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
