import React from "react";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import HelperInfo from "@/components/member/helper-info";
import Link from "next/link";

const HelperInfoPage = () => {
  return (
    <>
      <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">首頁</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link href="/member/profile">會員中心</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            小幫手資料
          </li>
        </ol>
      </nav>
      <div className="d-flex container-fluid flex-column justify-content-around flex-md-row my-3">
        <ListD />
        <HelperInfo />
      </div>
      {/* <ListUserM /> */}
    </>
  );
};

export default HelperInfoPage;
