import React from "react";
import { MdHomeRepairService } from "react-icons/md";
const Tag = () => {
  return <div>{}</div>;
};
const SalesRecordDetail = () => {
  return (
    <div className="container">
      <div className="col-12 col-sm-8 sales-record-detail p-3">
        <h5 className="size-5 d-flex align-items-start fw-bold">
          <MdHomeRepairService className="icon me-1" />
          銷售服務
        </h5>
        <p className="date my-4 size-7 p-1">2023-08-26</p>
        <span className="status size-6">狀態 :</span>
        <span className="ms-2 size-6">已完成</span>
        <p className="size-7">
          服務編號 :<span className="ms-2">1534868</span>
        </p>
        <p className="info-title size-6">預約資訊 :</p>
        <div className=" d-flex">
          <div className="title me-3">
            <p>開始日期</p>
            <p>結束日期</p>
            <p>服務時間</p>
            <p>每天次數</p>
            <p>地點</p>
            <p>備註</p>
          </div>
          <div className="content ">
            <p>2023-10-05</p>
            <p>2023-10-05</p>
            <p>30分鐘/次</p>
            <p>2次</p>
            <p>桃園市中壢區</p>
            <p>我需要早晚各一次，幫我清貓砂和餵飼料</p>
          </div>
        </div>

        <p className="info-title size-6">寵物資訊 :</p>
        <div className="pet d-flex">
          <img
            className="pet-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMlBOyArfydO4vCXBl_C5pREJO6Ty9a6tjPg&usqp=CAU"
          ></img>
          <div className="pet-info ms-3">
            <p>
              <span>小毛</span>
              <span>6歲</span>
              <span>公</span>
              <span>4.5公斤</span>
            </p>
            <p></p>
            <p>已結紮,有定期施打疫苗</p>
            <p>這裡是個性、健康狀況描述欄位的詳細內容</p>
          </div>
        </div>
        <div className="divider my-2"></div>
        <div className="col-md-6 col-8 offset-md-6 offset-4 settlement-amount ">
          <div className="d-flex justify-content-between">
            <p className="">小計</p>
            <p>
              NT$<span>400</span>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>天數</p>
            <p>x1</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>服務時間(每30分鐘)</p>
            <p>x1</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>每天次數</p>
            <p>x2</p>
          </div>
          <div className="divider"></div>
          <div className="d-flex justify-content-between">
            <p>總金額</p>
            <p>
              NT$<span>800</span>
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-5">
          <button className="btn-outline-confirm m-2">婉拒預約</button>
          <button className="btn-confirm m-2">接受預約</button>
        </div>
        {/* <div className="">
            <h5 className="size-6 mt-3">商品評論</h5>
            <textarea className="col-12 textareasize"></textarea>
          </div> */}
      </div>
    </div>
  );
};

export default SalesRecordDetail;
