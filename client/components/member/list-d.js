import React from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { HiClipboardList } from "react-icons/hi";
import { LiaListAltSolid } from "react-icons/lia";
import { FaAddressCard } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import { BiSolidShoppingBag } from "react-icons/bi";
import { MdDiscount } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import Link from "next/link";

export default function ListD() {
  return (
    <>
      <div className="list-d col-3 d-md-block d-none">
        <div className="user">
          <div className="d-flex justify-content-center">
            <img
              src="https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_A1VK080502.jpg"
              className="m-3"
            ></img>
            <div className="d-flex flex-column justify-content-around mt-3">
              <div>
                <h6 className="size-6">Hi,</h6>
                <h6 className="size-6">使用者</h6>
              </div>
              <button className="size-7 level">幼貓</button>
            </div>
          </div>

        </div>

        <ul className="text-center mt-5">
          <li>
            <h6 className="size-6">基本資料</h6>
          </li>
          <li>
            <Link className="size-6" href="">
              <FaAddressCard />
              我的資料
            </Link>
          </li>
          <li>
            <Link className="size-6" href="">
              <FaAward />
              會員等級
            </Link>
          </li>
          <li>
            <h6 className="size-6">小貓商城</h6>
          </li>
          <li>
            <Link className="size-6" href="http://localhost:3000/member/order">
              <RiFileList3Fill />
              我的訂單
            </Link>
          </li>
          <li>
            <Link className="size-6" href="http://localhost:3000/member/purchast">
              <BiSolidShoppingBag />
              購買紀錄
            </Link>
          </li>
          <li>
            <Link className="size-6" href="http://localhost:3000/member/wishlist">
              <FaList />
              追蹤清單
            </Link>
          </li>
          <li>
            <Link className="size-6" href="">
              <MdDiscount />
              我的優惠券
            </Link>
          </li>
          <li>
            <h6 className="size-6">小貓上工</h6>
          </li>
          <li>
            <Link className="size-6" href="">
              <FaPencilAlt />
              小幫手資料
            </Link>
          </li>
          <li>
            <Link className="size-6" href="">
              <LiaListAltSolid />
              任務清單
            </Link>
          </li>
          <li>
            <Link className="size-6" href="">
              <HiClipboardList />
              刊登紀錄
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
