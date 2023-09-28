import React, { useState ,useEffect } from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { RiFileList3Fill } from "react-icons/ri";
import Star from '@/components/member/star'
import axios from "axios";

export default function Orderdetail() {
  const [comment, setComment] = useState("");
  const [isText, setIsText] = useState("");
  const [value1, setValue1] = useState(0)
  const [detail,setDetail]=useState([{}])


  const handleComment = (n) => {
    setComment(n);
  };

    const handleText = (text) => {
    setIsText(text.target.value);
  };


  // const addMessage = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:3005/member/wishlist/${id}`
  //     );
  //     const newWishlist = wishlist.filter((v) => v.collection_id !== id);
  //     setWishlist(newWishlist);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const getDetail =  () => {
    axios
     .get("http://localhost:3005/order-detail")
     .then((response) => {
       const data = response.data.result;
       console.log(data);
       setDetail(data);
       console.log(detail);
     })
     .catch((error) => {
       console.error("Error:", error);
     });
 };

 useEffect(() => {
   getDetail();
 }, []);


  return (
    <>
      <div className="my-3">
        <div className="d-flex justify-content-end me-3">
          <ListM />
        </div>
        <ListUserM />
        <div className="d-flex py-2 justify-content-around">
          <ListD />

          <div className="row col-lg-8 col-md-8 col-12 order-detail p-3">
            <div>
              <h5 className="size-5">
                <RiFileList3Fill />
                我的訂單
              </h5>

              <p className="date my-3 size-7">{detail[0].created_at}</p>
              <p className="size-7">狀態 : 已完成</p>
              <p className="size-7">訂單編號 :1534868</p>
              <p className="size-7">收件資訊 :</p>
              <p className="textcolor size-7">收件人 王大明</p>
              <p className="textcolor size-7">地址 125646台北市信義區福德街</p>
              <p className="textcolor size-7">電話 0988436641</p>
              <p className="size-7">付款資訊 : 貨到付款</p>
              <p className="size-7">寄送方式 : 宅配</p>
              <p className="size-7">購買項目 :</p>

              <div className="d-flex border-bottom pb-3 d-md-flex d-none">
                <div className="d-flex col-9">
                  <img src="https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_1(12).jpg"></img>
                  <p className="ms-3 size-7">巨型開放式貓砂盆 (多色)</p>
                </div>
                <div className="col-1">
                  <p className="ms-2 size-7">x1</p>
                </div>
                <div className="col-2 size-7">
                  <p>NT$690</p>
                </div>
              </div>

              <div className="border-bottom pb-3 d-md-none">
                <div className="d-flex">
                  <img src="https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_1(12).jpg"></img>
                  <div className="ms-3 d-flex flex-column justify-content-around">
                    <div>
                        <p className="size-7">巨型開放式貓砂盆 (多色)</p>
                    </div>
                        <div>
                            <p className="size-7">x1</p>
                        </div>

                        <div >
                            <p className="size-7">NT$690</p>
                        </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  className={`btn btn-confirm m-2 size-6 m-size-6 ${
                    comment === "1" ? "pressed" : ""
                  }`}
                  onClick={() => {
                    handleComment("1");
                  }}
                >
                  我要評論
                </button>
              </div>
              {comment === "1" && (
                <form>
                  <h5 className="size-6 mt-3">商品評論</h5>
                  <Star startRating={value1} onRatingChange={setValue1} />                 
                  <textarea
                    className="form-control col-12 textareasize "
                    value={isText}
                    onChange={() => {
                      addMessage();
                    }}
                  ></textarea>
                  <div className="d-flex  justify-content-end">
                    <button
                      className="btn btn-outline-confirm m-2 size-6 m-size-6"
                      onClick={() => {
                        handleComment("");
                      }}
                    >
                      取消
                    </button>
                    <button className="btn btn-confirm m-2 size-6 m-size-6" type="submit">
                      儲存
                    </button>
                  </div>
                </form>
              )}

              <div className="d-flex justify-content-end">
                <table className="col-12 col-sm-6">
                  <thead>
                    <tr>
                      <td className="size-7">商品總金額</td>
                      <td className="size-7">NT$880</td>
                    </tr>
                    <tr>
                      <td className="size-7">商品小計</td>
                      <td className="size-7">NT$880</td>
                    </tr>
                    <tr>
                      <td className="size-7">優惠折扣</td>
                      <td className="size-7">NT$-80</td>
                    </tr>
                    <tr className="border-bottom">
                      <td className="size-7">運費</td>
                      <td className="size-7">NT$80</td>
                    </tr>
                    <tr>
                      <th className="size-7">訂單金額</th>
                      <td className="size-7">NT$880</td>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
