import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiUpload } from "react-icons/bi";
import { Switch, message } from "antd";
import memberService from "@/services/member-service";
import { useForm } from "react-hook-form";
const countyOption = [
  "台北市",
  "新北市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "苗栗縣",
  "台中市",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義市",
  "嘉義縣",
  "台南市",
  "高雄市",
  "屏東縣",
  "台東縣",
  "花蓮縣",
  "宜蘭縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
];

const SwitchInput = ({
  label,
  status,
  price,
  type,
  setStatus,
  info,
  setInfo,
}) => {
  const [switchStatus, setSwitchStatus] = useState(false);
  useEffect(() => {
    if (status === 0) {
      setStatus(false);
    }
    if (status === 1) {
      setStatus(true);
    }
  }, [status]);
  const handleSwitch = (e) => {
    setStatus({ ...status, service: e });
  };
  const handleInput = (e) => {
    setStatus({ ...status, price: parseInt(e.target.value) });
  };
  return (
    <div className={`switch-info ${status && "mb-5"}`}>
      <label className="size-6 m-size-7 ">{label}：</label>
      <div className="switch-info-price col-auto">
        <Switch onChange={handleSwitch} checked={status.service} />

        <input
          type="number"
          placeholder="服務價格"
          value={status?.price}
          className={`form-input m-form-input ${!status && "d-none"}`}
          name={type + "price"}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

const Close = ({ open, setOpen }) => {
  const handleOpen = () => {
    console.log(open);
    if (!open) {
      memberService
        .handleHelperValid(open)
        .then((response) => {
          console.log(response.data);
          if (response?.data?.status === 200) {
            setOpen(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
  const [feedStatus, setFeedStatus] = useState({
    service: info?.feed_service,
    price: info?.feed_price,
  });
  const [houseStatus, setHouseStatus] = useState({
    service: info?.house_service,
    price: info?.house_price,
  });
  const [beautyStatus, setBeautyStatus] = useState({
    service: info?.beauty_service,
    price: info?.beauty_price,
  });
  const [messageApi, contextHolder] = message.useMessage();

  // const { register, handleSubmit, watch } = useForm({
  //   values: {
  //     name: info?.name,
  //   },
  // });

  const editSuccess = () => {
    messageApi.open({
      type: "success",
      content: "小幫手資料修改成功。",
    });
  };
  const editError = () => {
    messageApi.open({
      type: "error",
      content: "資料修改失敗，請稍後重試一次。",
    });
  };
  const editWarning = () => {
    messageApi.open({
      type: "warning",
      content: "網路連線錯誤，修改失敗。",
    });
  };

  const handleOpen = () => {
    if (open) {
      memberService
        .handleHelperValid(open)
        .then((response) => {
          console.log(response?.data);
          if (response?.data?.status === 200) {
            setOpen(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const handleEdit = (e) => {
    e.preventDefault();
    // console.log(feedStatus, houseStatus, beautyStatus);
    const formData = new FormData();
    const result = {
      ...info,
      feed_service: feedStatus.service,
      house_service: houseStatus.service,
      beauty_service: beautyStatus.service,
      feed_price: feedStatus.price,
      house_price: houseStatus.price,
      beauty_price: beautyStatus.price,
    };
    for (const [key, value] of Object.entries(result)) {
      formData.append(key, value);
    }
    setInfo(result);

    memberService
      .handleHelperEdit(formData)
      .then((response) => {
        // console.log(response);
        if (response?.data?.status === 200) {
          setInfo(response?.data?.info);
          editSuccess();
        } else {
          editError();
        }
      })
      .catch((e) => {
        console.log(e);
        editWarning();
      });
  };
  const handleCancel = () => {
    console.log("有cancel");
    memberService
      .getHelperInfo()
      .then((response) => {
        if (response?.data?.status === 200) {
          const result = response?.data?.data[0];
          console.log(response.data);
          setInfo(result);
          setFeedStatus({
            service: result.feed_service,
            price: result.feed_price,
          });
          setHouseStatus({
            service: result.house_service,
            price: result.house_price,
          });
          setBeautyStatus({
            service: result.beauty_service,
            price: result.beauty_price,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <form
        className=""
        id="helper-form"
        name="helper-form"
        onSubmit={handleEdit}
      >
        <div className="form-item">
          <label className="size-6 m-size-7">姓名：</label>
          <input
            className="form-input m-form-input"
            type="text"
            placeholder="請輸入名稱"
            value={info?.name}
            onChange={(e) => {
              const value = e.target.value;
              setInfo({ ...info, name: value });
            }}
          />
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">個人簡述：</label>
          <textarea
            className="form-input m-form-input"
            type="text"
            placeholder="請簡單輸入自我介紹"
            value={info?.Introduction}
            onChange={(e) => {
              const value = e.target.value;
              setInfo({ ...info, Introduction: value });
            }}
          />
        </div>

        <div className="form-item">
          <label className="size-6 m-size-7">Email：</label>
          <input
            className="form-input m-form-input"
            type="text"
            placeholder="請輸入Email"
            value={info?.email}
            onChange={(e) => {
              const value = e.target.value;
              setInfo({ ...info, email: value });
            }}
          />
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">聯絡電話：</label>
          <input
            className="form-input m-form-input"
            type="text"
            placeholder="請輸入聯絡電話"
            value={info?.phone}
            onChange={(e) => {
              const value = e.target.value;
              setInfo({ ...info, phone: value });
            }}
          />
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">上傳相片/影片：</label>
          <div className="upload">
            <button className="" type="button">
              <input
                className="d-none"
                type="file"
                id="upload-input"
                name="helper-image"
              />
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
            value={info?.job_description}
            onChange={(e) => {
              const value = e.target.value;
              setInfo({ ...info, job_description: value });
            }}
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
              status={feedStatus}
              price={info?.feed_price}
              type="feed"
              setStatus={setFeedStatus}
              info={info}
              setInfo={setInfo}
            />
            <SwitchInput
              label="安親寄宿"
              status={houseStatus}
              price={info?.house_price}
              type="house"
              setStatus={setHouseStatus}
              info={info}
              setInfo={setInfo}
            />
            <SwitchInput
              label="到府美容"
              status={beautyStatus}
              price={info?.beauty_price}
              type="beauty"
              setStatus={setBeautyStatus}
              info={info}
              setInfo={setInfo}
            />
          </div>
        </div>
        <div className="form-item">
          <label className="size-6 m-size-7">可服務地區：</label>
          <div>
            <select
              className="form-select"
              name="service_county"
              onChange={(e) => {
                const value = e.target.value;
                setInfo({ ...info, service_county: value });
              }}
            >
              {countyOption.map((county) => {
                if (info.service_county === county) {
                  return (
                    <option selected value={county}>
                      {county}
                    </option>
                  );
                }
                return <option value={county}>{county}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="d-flex mb-2">
          <div className="btn-groups d-flex justify-content-start ">
            <button
              className="btn-outline-confirm"
              type="button"
              onClick={handleCancel}
            >
              取消
            </button>
            {contextHolder}
            <button type="submit" className="btn-confirm">
              送出
            </button>
          </div>
          <button
            type="button"
            className="close-helper btn-brown ms-auto"
            onClick={handleOpen}
          >
            關閉小幫手功能
          </button>
        </div>
      </form>
    </>
  );
};
const HelperInfo = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  let defaultInfo;
  useEffect(() => {
    memberService
      .getHelperInfo()
      .then((response) => {
        const result = response?.data?.data[0];
        console.log(response?.data?.data);

        setInfo(result);
        defaultInfo = result;
        if (result.cat_helper) {
          setOpen(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  if (process.client) {
    console.log("運行在客戶端");
  }
  return (
    <>
      <div className="col-12 col-sm-8 helper-info ">
        <div className="title">
          <p className="size-4 m-size-5">
            <img src="/member-icon/helper-info.svg" />
            小幫手資料
            {open && (
              <Link
                href={`/work/find-helper/1`}
                // 修改為user_id
                className="to-detail size-7 m-size-7"
              >
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
