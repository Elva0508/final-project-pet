import React from "react";
import { DatePicker, Cascader } from "antd";
import cityData from "@/json/CityCountyData.json";

const options = cityData.map((city) => {
  return {
    value: city.CityName,
    label: city.CityName,
    children: city.AreaList.map((area) => {
      return { value: area.ZipCode, label: area.AreaName };
    }),
  };
});

const CreateMission = () => {
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <div className="create-mission">
      <div className="block">
        <div className="block-title size-5">編輯任務</div>
        <div className="block-body">
          <div className="body-item">
            <label className="size-6">任務名稱(必填)</label>
            <br />
            <input
              className="form-input"
              type="text"
              placeholder="請輸入任務名稱"
            />
          </div>
          <div className="body-item">
            <label className="size-6">任務日期</label>
            <br />
            <div className="d-flex justify-content-between ">
              <DatePicker
                className="mission-time"
                placeholder="請輸入開始日期"
                style={{ textIndent: "50px" }}
              />
              <DatePicker
                className="mission-time"
                placeholder="請輸入結束日期"
              />
            </div>
          </div>
          <div className="body-item">
            <label className="size-6">任務地點</label>
            <br />
            <Cascader
              options={options}
              onChange={onChange}
              placeholder="選擇縣市"
              className="location-select"
              popupClassName="location-cascader"
            />

            <input
              placeholder="請輸入街道地址"
              className="form-input m-size-7"
            />
          </div>
          <div className="body-item">
            <label className="size-6">任務類型</label>
            <br />
            <div></div>
            <select className="form-select">
              <option selected>到府照顧</option>
              <option>安親寄宿</option>
              <option>到府美容</option>
            </select>
          </div>
          <div className="body-item">
            <label className="size-6">任務說明</label>
            <br />
            <textarea className="form-input" placeholder="請輸入任務說明" />
          </div>
        </div>
      </div>
      <div className="block">
        <div className="block-title size-5">任務預算</div>
        <div className="block-body">
          <div className="body-item">
            <label className="size-6">預算金額</label>
            <br />
            <input
              className="form-input"
              type="text"
              placeholder="請輸入任務名稱"
            />
          </div>
          <div className="body-item">
            <label className="size-6">支付方式</label>
            <br />
            <select className="form-select">
              <option selected>現金</option>
              <option>轉帳匯款</option>
            </select>
          </div>
        </div>
      </div>
      <div className="block"></div>
      <div className="btn-groups d-flex justify-content-center ">
        <button className="btn-outline-brown m-2">取消</button>
        <button className="btn-brown m-2">預覽</button>
      </div>
    </div>
  );
};

export default CreateMission;
