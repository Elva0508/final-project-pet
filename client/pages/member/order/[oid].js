import React, { useState, useEffect } from "react";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { RiFileList3Fill } from "react-icons/ri";
import Star from "@/components/member/star";
import { useRouter } from "next/router";
import axios from "axios";
// import moment from "moment"

export default function Orderdetail() {

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [comments, setComments] = useState({});
  const [value, setValue] = useState(0);
  const [detail, setDetail] = useState([{}]);
  const router = useRouter();

  const handleSaveComment = async(productId,orderId) => {
        try {
        const response = await axios.post(
          `http://localhost:3005/api/member-order-detail/comment`,
          { 
            comment: comments,
            star:value,
            productid:productId,
            orderid:orderId
          }
        );
        const updatedComment = response.data.updatedComment;
        setComments(updatedComment);
      } catch (error) {
        console.error("Error:", error);
      }
    setShowCommentForm(false);
    getDetail(orderId)
    setValue(0)
  };

  const handleCancelComment = () => {
    // 取消评论，隐藏评论表单
    setShowCommentForm(false);
  };


  const getDetail = async (oid) => {
    try {
      const res = await fetch(
        "http://localhost:3005/api/member-order-detail/" + oid
      );

      const data = await res.json();

      console.log(data.result);
      // 設定到狀態中 -> 會觸發重新渲染(re-render)
      setDetail(data.result);
      console.log(detail);
    } catch (e) {
      // 這裡可以作錯誤處理

      // setTimeout(() => {
      //   setIsLoading(false)
      // }, 2000)
      alert("伺服器連線失敗");
      console.error(e);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      // 確保能得到router.query有值
      const { oid } = router.query;
      console.log(oid);
      // 有pid後，向伺服器要求資料，設定到狀態中
      getDetail(oid);
    }
    // eslint-disable-next-line
  }, [router.query]);


const back =(id)=>{
  router.push('http://localhost:3000/member/order')
}

  return (
    <>
      <div className="my-3">
        <ListUserM />
        <div className="d-flex py-2 justify-content-around">
          <ListD />

          <div className="d-flex flex-column col-md-8 col-12 order-detail">

              <h5 className="size-5 mt-3 ms-md-5 ms-3 title">
                我的訂單
              </h5>
              <div className="px-md-5 px-3">
              <p className="size-6  mt-2"><span>訂單編號：</span>{detail[0].oid}</p>
              <p className="size-7"><span>訂單時間：</span>{detail[0].created_at}</p>
              <p className="size-7"><span>訂單狀態：</span>{detail[0].status_name}</p>
              <p className="size-7"><span>付款資訊：</span>{detail[0].payment}</p>
              <p className="size-7"><span>寄送方式：</span>{detail[0].shipment}</p>
              <p className="size-7"><span>收件資訊：</span></p>
              <p className="size-7 back"><span>收件姓名：</span>{detail[0].buyer_name}</p>
              <p className="size-7 back"><span>收件地址：</span>{detail[0].buyer_address}</p>
              <p className="size-7 back"><span>聯絡電話：</span>{detail[0].buyer_phone}</p>
              <p className="size-7"><span>購買項目：</span></p>
              {detail.map((v, i) => {
                return (
                  <div key={v.product_id}>
                    <div className="d-flex border-bottom pb-3 d-md-flex d-none align-items-center">
                      <div className="d-flex col-7 align-items-center">
                        <img src={v.image}></img>
                        <div>
                          <p className="ms-3 size-7">
                          <span>商品名稱：</span>{v.product_name}
                          </p>
                          <p className="ms-3 size-7"><span>商品規格：</span>{v.type}</p>
                          <p className="ms-3 size-7"><span>商品單價：</span>NT${v.price}</p>
                        </div>
                      </div>
                      <div className="col-2">
                        <p className="ms-3 size-7"><span>數量：</span>{v.quantity}</p>
                      </div>
                      <div className="ms-auto size-7 me-3">
                        <p className="ms-3 size-7">
                        <span>小計：</span>NT${v.quantity * v.price}
                        </p>
                      </div>
                    </div>

                    <div className="border-bottom pb-3 d-md-none">
                      <div className="d-flex">
                        <img src={v.image}></img>
                        <div className="ms-3 d-flex flex-column justify-content-around">
                          <div>
                            <p className="size-7"><span>商品名稱：</span>{v.product_name}</p>
                          </div>
                          <div>
                            <p className="size-7"><span>數量：</span>{v.quantity}</p>
                          </div>

                          <div>
                            <p className="size-7">
                            <span>小計：NT${v.quantity * v.price}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {v.review_content!==null ? (
                      <div>                   

                        {showCommentForm && currentProductId === v.product_id && v.status_id=== 3?(
                          <div className="mt-3  d-flex justify-content-end">
                            <div>
                              <Star startRating={v.star_rating} valid={v.star_rating} />
                              <p><span>我的評論：</span>{v.review_content}</p>
                            </div>  
                          </div>
                        ):("")}

                        <div className="d-flex justify-content-end">
                          <button
                                className="btn btn-confirm m-2 size-6 m-size-6"
                                onClick={() => {
                                  if(!showCommentForm){
                                  setShowCommentForm(true)
                                  setCurrentProductId(v.product_id);
                                  }else if(showCommentForm && currentProductId !== v.product_id){
                                    setCurrentProductId(v.product_id);
                                  }else{
                                    setShowCommentForm(false)
                                  }
                                }}
                              >
                                {showCommentForm && currentProductId === v.product_id && v.status_id=== 3 ?("關閉評論"):("查看評論")}
                            </button>
                        </div>

                      </div>  
                        
                      ): showCommentForm && currentProductId === v.product_id && v.status_id=== 3 ?
                      (
                       <div>
                            <h5 className="size-6 mt-3">商品評論：</h5>
                            <Star startRating={value} onRatingChange={setValue} valid={v.star_rating}/>
                            <textarea
                              className="form-control col-12 textareasize "
                              type="text"
                              onChange={(e) =>{
                                setComments(e.target.value) 
                             
                              }
                            }
                            ></textarea>
                            <div className="d-flex  justify-content-end">
                              <button
                                className="btn btn-outline-confirm m-2 size-6 m-size-6"
                                onClick={handleCancelComment}
                              >
                                取消
                              </button>
                              <button
                                className="btn btn-confirm m-2 size-6 m-size-6"
                                onClick={() => handleSaveComment(v.product_id,v.order_id)}
                              >
                                儲存
                              </button>
                            </div>
                          </div>
                        ):v.status_id=== 3?(
                            <div className="d-flex justify-content-end">
                                <button
                                  className="btn btn-confirm m-2 size-6 m-size-6"
                                  onClick={() => {
                                    setShowCommentForm(true);
                                    setCurrentProductId(v.product_id);
                                  }}
                                >
                                  我要評論
                                </button>
                            </div>
                        ):("")

                      }
                </div>

              )})}

              
              <div className="d-flex justify-content-end my-5 pe-3">
                <table className="col-12 col-lg-4 col-md-6">
                  <thead>
                    <tr>
                      <td className="size-7">商品總金額：</td>
                      <td className="size-7 text-end">NT${detail[0].order_price}</td>
                    </tr>
                    {/* <tr>
                                  <td className="size-7">商品小計</td>
                                  <td className="size-7">NT$880</td>
                                </tr> */}
                    <tr>
                      <td className="size-7">優惠折扣：</td>
                      <td className="size-7 text-end">NT$-{detail[0].sale}</td>
                    </tr>
                    <tr className="border-bottom">
                      <td className="size-7">運費：</td>
                      <td className="size-7 text-end">NT${detail[0].freight}</td>
                    </tr>
                    <tr>
                      <th className="size-7">訂單金額：</th>
                      <td className="size-7 text-end">NT${detail[0].total_amount}</td>
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
