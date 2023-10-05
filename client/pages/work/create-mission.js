import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Cascader } from "antd";
import cityData from "@/data/CityCountyData.json";
import { DatePicker } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { register } from "swiper/element";
import workService from "@/services/work-service";
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
  const router = useRouter();
  const imgRef = useRef();
  const today = new Date();
  const [startDay, setStartDay] = useState(undefined);
  const [endDay, setEndDay] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [area, setArea] = useState(undefined);
  const onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions);
    setCity(selectedOptions[0].label);
    setArea(selectedOptions[1].label);
  };
  const handleDateChange = (date, dateString) => {
    console.log("date changed", date, dateString);
    setStartDay(dateString[0]);
    setEndDay(dateString[1]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.querySelector("#form");
    const formData = new FormData(form);
    const img = document.getElementById("missionImage");
    formData.append("missionImage", img.files);
    formData.append("startDay", startDay);
    formData.append("endDay", endDay);
    formData.append("city", city);
    formData.append("area", area);
    workService
      .createMission(formData)
      .then((response) => {
        if (response?.data?.status === 200) {
          console.log(response);
          router.push(`/work/find-mission/${response.data.detail[0].pid}`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <form
      id="form"
      name="form"
      onSubmit={handleSubmit}
      className="create-mission"
    >
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
              name="title"
            />
          </div>
          <div className="body-item">
            <label className="size-6">任務日期</label>
            <br />
            <DatePicker
              // disabledDate={startDead}
              placeholder={["開始日期", "結束日期"]}
              autoSwitchDate={false}
              type={"dateRange"}
              dropdownClassName="dateRangeTest"
              // renderFullDate={renderFullDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="body-item">
            <label className="size-6">任務相片</label>
            <br />
            <input
              id="missionImage"
              name="missionImage"
              multiple
              ref={imgRef}
              type="file"
            />
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
              name="location_detail"
            />
          </div>
          <div className="body-item">
            <label className="size-6">任務類型</label>
            <br />
            <div></div>
            <select className="form-select" name="mission_type">
              <option selected>到府照顧</option>
              <option>安親寄宿</option>
              <option>到府美容</option>
            </select>
          </div>
          <div className="body-item">
            <label className="size-6">任務說明</label>
            <br />
            <textarea
              className="form-input"
              placeholder="請輸入任務說明"
              name="description"
            />
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
              type="number"
              placeholder="請輸入任務預算"
              name="price"
            />
          </div>
          <div className="body-item">
            <label className="size-6">支付方式</label>
            <br />
            <select className="form-select" name="payment">
              <option selected>現金</option>
              <option>轉帳匯款</option>
            </select>
          </div>
        </div>
      </div>
      <div className="block"></div>
      <div className="btn-groups d-flex justify-content-center ">
        <button className="btn-outline-brown m-2">取消</button>
        <button type="submit" className="btn-brown m-2">
          送出
        </button>
      </div>
    </form>
  );
};

export default CreateMission;
