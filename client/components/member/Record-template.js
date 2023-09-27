import React from "react";
import { MdHomeRepairService } from "react-icons/md";

export const RecordTemplete = ({ icon, title, item1 }) => {
  return (
    <>
      <h5 className="size-5 d-flex align-items-start fw-bold">
        {icon || <MdHomeRepairService className="icon me-1" />}
        {title || "銷售紀錄"}
      </h5>
      <nav className="tab-nav mt-4">
        <button className="mx-3 size-7">{item1 || "待處理"}</button>
        <button className="mx-3 size-7">進行中</button>
        <button className="mx-3 size-7">已完成</button>
        <button className="mx-3 size-7">已取消</button>
      </nav>
      <div className="info-title d-flex align-items-center justify-content-around">
        <p>成立日期</p>
        <p>預約編號</p>
        <p>預約日期</p>
        <p>服務總價</p>
      </div>
      <div className="info-content d-flex align-items-center justify-content-around">
        <p>2023-08-26</p>
        <p>１５３４８６８</p>
        <p>2023-09-10 ~ 2023-09-12</p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="mb-1 size-6">NT$ 705</p>
          <button className="btn-outline-confirm">查看明細</button>
        </div>
      </div>
      <div className="info-content d-flex align-items-center justify-content-around">
        <p>2023-08-26</p>
        <p>１５３４８６８</p>
        <p>2023-09-10 ~ 2023-09-12</p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="mb-1 size-6">NT$ 705</p>
          <button className="btn-outline-confirm">查看明細</button>
        </div>
      </div>
      <div className="info-content d-flex align-items-center justify-content-around">
        <p>2023-08-26</p>
        <p>１５３４８６８</p>
        <p>2023-09-10 ~ 2023-09-12</p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="mb-1 size-6">NT$ 705</p>
          <button className="btn-outline-confirm">查看明細</button>
        </div>
      </div>
      <div className="info-content d-flex align-items-center justify-content-around">
        <p>2023-08-26</p>
        <p>１５３４８６８</p>
        <p>2023-09-10 ~ 2023-09-12</p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="mb-1 size-6">NT$ 705</p>
          <button className="btn-outline-confirm">查看明細</button>
        </div>
      </div>
      <div className="info-content d-flex align-items-center justify-content-around">
        <p>2023-08-26</p>
        <p>１５３４８６８</p>
        <p>2023-09-10 ~ 2023-09-12</p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="mb-1 size-6">NT$ 705</p>
          <button className="btn-outline-confirm">查看明細</button>
        </div>
      </div>
      <div className="info-content d-flex align-items-center justify-content-around">
        <p>2023-08-26</p>
        <p>１５３４８６８</p>
        <p>2023-09-10 ~ 2023-09-12</p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="mb-1 size-6">NT$ 705</p>
          <button className="btn-outline-confirm">查看明細</button>
        </div>
      </div>
    </>
  );
};
// icon={reactIccon} 要在使用的icon上加入classname <BsCalendarDateFill className="icon me-1" />
// title={大標題名稱}
// item1={第一個button}

export const RecordDetailTemplete = ({ icon, title }) => {
  return (
    <>
      <h5 className="size-5 d-flex align-items-start fw-bold">
        {icon || <MdHomeRepairService className="icon me-1" />}

        {title || "銷售服務"}
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
    </>

    //   {/* <div className="">
    //           <h5 className="size-6 mt-3">商品評論</h5>
    //           <textarea className="col-12 textareasize"></textarea>
    //         </div> */}
  );
};
// icon={reactIccon} 要在使用的icon上加入classname <BsCalendarDateFill className="icon me-1" />
// title={大標題名稱}
