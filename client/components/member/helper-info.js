import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiUpload } from "react-icons/bi";
import { Switch } from "antd";
import memberService from "@/services/member-service";
const SwitchInput = ({ label, status, price }) => {
  const [switchStatus, setSwitchStatus] = useState(false);
  useEffect(() => {
    if (status === 0) {
      setSwitchStatus(false);
    }
    if (status === 1) {
      setSwitchStatus(true);
    }
  }, [status]);
  const handleSwitch = (e) => {
    setSwitchStatus(e);
  };
  return (
    <div className={`switch-info ${switchStatus && "mb-5"}`}>
      <label className="size-6 m-size-7 ">{label}：</label>
      <div className="switch-info-price col-auto">
        <Switch onChange={handleSwitch} checked={switchStatus} />
        <input
          type="number"
          name=""
          id=""
          placeholder="服務價格"
          defaultValue={price && price}
          className={`form-input m-form-input ${!switchStatus && "d-none"}`}
        />
      </div>
    </div>
  );
};

const Close = ({ open, setOpen }) => {
  const handleOpen = () => {
    if (!open) {
      setOpen(true);
    }
  };
  return (
    <>
      <button className="open-helper btn-brown" onClick={handleOpen}>
        開啟小幫手功能
      </button>
    </>
  );
};

const Open = ({ open, setOpen, info, setInfo }) => {
  const handleOpen = () => {
    if (open) {
      setOpen(false);
    }
  };
  return (
    <>
      <form className="">
        <div className="form-item">
          <label className="size-6 m-size-7">姓名：</label>
          <input
            className="form-input m-form-input"
            type="text"
            placeholder="請輸入名稱"
            defaultValue={info?.name}
          />
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">個人簡述：</label>
          <textarea
            className="form-input m-form-input"
            type="text"
            placeholder="請簡單輸入自我介紹"
            defaultValue={info?.Introduction}
          />
        </div>

        <div className="form-item">
          <label className="size-6 m-size-7">Email：</label>
          <input
            className="form-input m-form-input"
            type="text"
            placeholder="請輸入Email"
            defaultValue={info?.email}
          />
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">聯絡電話：</label>
          <input
            className="form-input m-form-input"
            type="text"
            placeholder="請輸入聯絡電話"
            defaultValue={info?.phone}
          />
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">上傳相片/影片：</label>
          <div className="upload">
            <button className="" type="button">
              <input className="d-none" type="file" id="upload-input" />
              {/* 使用label關聯被隱藏的file input */}
              <BiUpload className="icon" />
              <label className="" htmlFor="upload-input">
                上傳檔案
              </label>
            </button>
          </div>
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">服務介紹：</label>
          <textarea
            className="form-input m-form-input"
            type="text"
            placeholder="請輸入服務介紹"
            defaultValue={info?.job_description}
          />
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">可服務時間：</label>
          <input
            className="form-input m-form-input"
            type="text"
            placeholder="請輸入可服務時間"
            value="日、一、二、三、四、五、六"
          />
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7 service-type">可服務類型：</label>
          <div className="service-switch">
            <SwitchInput
              label="到府照顧"
              status={info?.feed_service}
              price={info?.feed_price}
            />
            <SwitchInput
              label="安親寄宿"
              status={info?.house_service}
              price={info?.house_price}
            />
            <SwitchInput
              label="到府美容"
              status={info?.beauty_service}
              price={info?.beauty_price}
            />
          </div>
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">可服務地區：</label>
          <div>
            <select className="form-select">
              <option value="基隆市">基隆市</option>
              <option value="台北市">台北市</option>
              <option value="新北市">新北市</option>
              <option value="桃園市">桃園市</option>
              <option value="新竹市">新竹市</option>
              <option value="新竹縣">新竹縣</option>
              <option value="苗栗縣">苗栗縣</option>
              <option value="台中市">台中市</option>
              <option value="彰化縣">彰化縣</option>
              <option value="南投縣">南投縣</option>
              <option value="雲林縣">雲林縣</option>
              <option value="嘉義市">嘉義市</option>
              <option value="嘉義縣">嘉義縣</option>
              <option value="台南市">台南市</option>
              <option value="高雄市">高雄市</option>
              <option value="屏東縣">屏東縣</option>
              <option value="台東縣">台東縣</option>
              <option value="花蓮縣">花蓮縣</option>
              <option value="宜蘭縣">宜蘭縣</option>
              <option value="澎湖縣">澎湖縣</option>
              <option value="金門縣">金門縣</option>
              <option value="連江縣">連江縣</option>
            </select>
          </div>
        </div>
      </form>
      <div className="d-flex mb-2">
        <div className="btn-groups d-flex justify-content-start ">
          <button className="btn-outline-confirm ">取消</button>
          <button className="btn-confirm ">送出</button>
        </div>
        <button className="close-helper btn-brown ms-auto" onClick={handleOpen}>
          關閉小幫手功能
        </button>
      </div>
    </>
  );
};
const HelperInfo = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  useEffect(() => {
    memberService
      .getHelperInfo()
      .then((response) => {
        if (response?.data?.data?.length > 0) {
          console.log(response);
          setOpen(true);
          setInfo(response?.data?.data[0]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <div className="helper-info ">
        <div className="title">
          <p className="size-4 m-size-5">
            <img src="/member-icon/helper-info.svg" />
            小幫手資料
            {open && (
              <Link href="" className="to-detail size-7 m-size-7">
                點我查看細節頁
              </Link>
            )}
          </p>
        </div>
        {open ? (
          <Open open={open} setOpen={setOpen} info={info} setInfo={setInfo} />
        ) : (
          <Close open={open} setOpen={setOpen} />
        )}
      </div>
    </>
  );
};

export default HelperInfo;
