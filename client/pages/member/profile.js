import React, { useState, useEffect } from "react";
import Link from "next/link";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import useRWD from "@/hooks/useRWD";
import Image from "next/image";
import myProfile from "@/assets/myProfile.svg";
import data from "@/data/taiwan.json";
import axios from "axios";
import { Padding } from "@mui/icons-material";


const ProfilePage = () => {
  //RWD
  const device = useRWD();
  const userRfs = device == "mobile" ? "m-size-6" : "size-6";

  //地址
  const [city, setCity] = useState(-1);
  const [area, setArea] = useState([]);
  const handleCityChange = (event) => {
    const cityValue = event.target.value;
    setCity(cityValue);
    const cityNumber = parseInt(cityValue);
    for (let i = 0; i < data.length + 1; i++) {
      if (cityNumber == i) {
        const newArea = data[i - 1].districts.map((district) => district.name);
        return setArea(newArea);
      }
    }
    if (cityNumber == -1) {
      setArea([]);
    }
  };
  //生日
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  //取得資料
  //const [userData, setUserData] = useState(null);

  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressTown, setAddressTown] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [petCount, setPetCount] = useState(1);



  useEffect(() => {
    axios
      .get("http://localhost:3005/api/user/user-info")
      .then((res) => {
        const userData = res.data.results[0];
        setUserData(userData);
        setEmail(userData.email);
        setName(userData.name);
        setGender(userData.gender);
        setBirthday(userData.birthday);
        setPhone(userData.phone);
        setAddressCity(userData.city);
        setAddressTown(userData.area);
        setDetailAddress(userData.address);
        setPetCount(userData.pet_number);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    setErrors({});
    
    
    const updatedUserData = {
      email,
      name,
      gender,
      birthday,
      phone,
      city: addressCity,
      area: addressTown,
      address: detailAddress,
      pet_number: petCount,
    };
    axios
      .put("http://localhost:3005/api/user/update-user-data", updatedUserData)
      .then((res) => {
        setUserData(res.data.results[0]);
        setEmail(res.data.results[0].email);
        setName(res.data.results[0].name);
        setGender(res.data.results[0].gender);
        setBirthday(res.data.results[0].birthday);
        setPhone(res.data.results[0].phone);
        setAddressCity(res.data.results[0].city);
        setAddressTown(res.data.results[0].area);
        setDetailAddress(res.data.results[0].address);
        setPetCount(res.data.results[0].pet_number);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setUserData(userData);
    setEmail(userData.email);
    setName(userData.name);
    setGender(userData.gender);
    setBirthday(userData.birthday);
    setPhone(userData.phone);
    setAddressCity(userData.city);
    setAddressTown(userData.area);
    setDetailAddress(userData.address);
    setPetCount(userData.pet_number);
  };
  return (
    <div className=" my-3">
      <div className="d-flex justify-content-around pt-2">
        {/* mobile版的左側tab */}
        <ListUserM />
        <ListD />
        {/* <UserForm /> */}
        <div className="user-profile row col-lg-8 col-md-8 col-12 ">
          <div className="title">
            <p className=" size-4">
              <Image src={myProfile} alt="myProfile-logo" />
              我的資料
            </p>
          </div>
          <div className="user-form">
            <div></div>
            <div className="user-form-item">
              <div className="ws20 mb-5 d-flex justify-content-center">
                <label className={`fs3 ${userRfs}`}>Email</label>
                <input
                  className="form-input fs11"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="ws20 mb-5 d-flex justify-content-center">
              <label className={`fs3 ${userRfs}`}>姓名</label>
              <input
                className="form-input fs11"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="ws20  mb-5 d-flex justify-content-center">
              <label className={`fs3 ${userRfs}`}>密碼</label>
              <div className="fs11 ">
                <Link href="http://localhost:3000/member/reset-password">
                  <button className="btn-confirm fs-btn">設定新密碼</button>
                </Link>
              </div>
            </div>

            <div className="ws20 gender mb-5 d-flex justify-content-center">
              <label className={`fs3 ${userRfs}`}>性別</label>
              <div className="fs11">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  className={userRfs}
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  aria-label="..."
                />
                男
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  className={userRfs}
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  aria-label="..."
                />
                女
              </div>
            </div>

            <div className="ws20  mb-5 d-flex justify-content-center">
              <label className={`fs3 ${userRfs}`}>生日</label>
              <input
                className="form-input fs11"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            <div className="ws20  mb-5 d-flex justify-content-center">
              <label className={`fs3 ${userRfs}`}>手機</label>
              <input
                className="form-input fs11"
                type="text"
                value={`0${phone}`}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="ws20   d-flex justify-content-center">
              <label className={`fs3 py-2 ${userRfs}`}>地址</label>
              <div className="fs11 ">
                <select
                  className="form-select fs5"
                  value={addressCity}
                  onChange={(e) => setAddressCity(e.target.value)}
                >
                  <option value={-1}></option>
                  {data.map((v) => {
                    return (
                      <option key={v.name} value={v.number}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>

                <select
                  className="form-select fs5"
                  value={addressTown}
                  onChange={(e) => setAddressTown(e.target.value)}
                >
                  <option value={-1}></option>
                  {area.map((u, i) => {
                    return (
                      <option key={i} value={u}>
                        {u}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="address-w20 ">
                {/* <label className={` ${userRfs}`}></label> */}
                <input
                  type="text"
                  className="form-control address-11"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="ws20   d-flex justify-content-center">
              <label className={`fs3 ${userRfs}`}>毛孩數量</label>
              <div className="fs11 ">
                <input
                  className="form-input fs5"
                  type="number"
                  value={petCount}
                  onChange={(e) => setPetCount(e.target.value)}
                />
              </div>
            </div>

            <div className="user-btn-group d-flex justify-content-center gap-5">
              <button id="save" className="btn-confirm" onClick={handleSave}>
                儲存
              </button>
              <button className="btn-outline-confirm" onClick={handleCancel}>
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
