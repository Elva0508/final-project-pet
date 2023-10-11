import React, { useState, useEffect } from "react";
import { HiClipboardList } from "react-icons/hi";
import { LiaListAltSolid } from "react-icons/lia";
import { FaPencilAlt } from "react-icons/fa";
import { BiSolidShoppingBag } from "react-icons/bi";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import { MdDiscount } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { FaIdBadge } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
export default function ListD() {
  //無法從localStorage取得資料 所以使用特定使用者api
  // const userData = localStorage.getItem("data");
  // const parseData = JSON.parse(userData);

  const [memberData, setMemberData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    fetch("http://localhost:3005/api/user/user-info")
      .then((response) => response.json())
      .then((data) => {
        setMemberData(data.results[0]);
      })
      .catch((error) => {
        console.error("API請求失敗", error);
      });
  }, []);

  return (
    <>
      <div className="list-d col-3 d-md-block d-none">
        <div className="user">
          <div className="useravatar">
            <div className="d-flex justify-content-center">
              <div>
                <div className="text-center">
                  <img
                    //src="https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_A1VK080502.jpg"
                    src={memberData ? memberData.cover_photo : "loading..."}
                    className="mt-5"
                  ></img>
                </div>
                <p className="size-5 my-3 text-center">
                  Hi,{memberData ? memberData.name : "loading..."}
                </p>
                <Link className="size-7" href="">
                  <span className="me-2">管理個人資料</span>
                  <FaPencilAlt />
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-center bg border mx-4 mt-3">
              <div className="my-3 lv">
                <p className="size-7 level text-center px-2">Level.1 幼貓</p>
              </div>
              <Link className="size-7 mt-3 ms-3" href="">
                查看會員等級優惠
              </Link>
            </div>
          </div>
          <ul className="mt-2 ms-5">
            <li>
              <div className="py-2">
                <p className="size-5 title">小貓商城</p>
              </div>
            </li>
            <li>
              <button
                className="size-6"
                onClick={() => {
                  window.location.href = "http://localhost:3000/member/order";
                }}
              >
                <div className="ms-5 my-3">
                  <RiFileList3Fill />
                  <span className="ms-2">我的訂單</span>
                </div>
              </button>
            </li>
            <li>
              <button
                className="size-6"
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/member/purchast";
                }}
              >
                <div className="ms-5 my-3">
                  <BiSolidShoppingBag />
                  <span className="ms-2">購買紀錄</span>
                </div>
              </button>
            </li>
            <li>
              <button
                className="size-6"
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/member/wishlist";
                }}
              >
                <div className="ms-5 my-3">
                  <FaList />
                  <span className="ms-2">追蹤清單</span>
                </div>
              </button>
            </li>
            <li>
              <button
                className="size-6"
                onClick={() => {
                  window.location.href = "";
                }}
              >
                <div className="ms-5 my-3">
                  <MdDiscount />
                  <span className="ms-2">我的優惠券</span>
                </div>
              </button>
            </li>
            <li>
              <div className="p-2">
                <p className="size-5 title">小貓上工</p>
              </div>
            </li>
            <li>
              <button
                className="size-6"
                onClick={() => {
                  router.push("/member/helper");
                }}
              >
                <div className="ms-5 my-3">
                  <FaIdBadge />
                  <span className="ms-2">小幫手資料</span>
                </div>
              </button>
            </li>
            <li>
              <button
                className="size-6"
                onClick={() => {
                  window.location.href = "http://localhost:3000/member/joblist";
                }}
              >
                <div className="ms-5 my-3">
                  <LiaListAltSolid />
                  <span className="ms-2">任務清單</span>
                </div>
              </button>
            </li>
            <li>
              <button
                className="size-6"
                onClick={() => {
                  window.location.href = "http://localhost:3000/member/history";
                }}
              >
                <div className="ms-5 my-3">
                  <HiClipboardList />
                  <span className="ms-2">刊登紀錄</span>
                </div>
              </button>
            </li>
            <li>
              <button
                className="size-6"
                onClick={() => {
                  router.push("/member/selling");
                }}
              >
                <div className="ms-5 my-3">
                  <FaChartLine />
                  <span className="ms-2">銷售紀錄</span>
                </div>
              </button>
            </li>
            <li>
              <button
                className="size-6"
                onClick={() => {
                  router.push("/member/reserve");
                }}
              >
                <div className="ms-5 mt-3 pb-3">
                  <FaRegCalendarCheck />
                  <span className="ms-2">預約紀錄</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
