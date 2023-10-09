import React, { useState, useEffect } from "react";
import ListD from "@/components/member/list-d";
import ListM from "@/components/member/list-m";
import ListUserM from "@/components/member/list-user-m";
import SalesRecord from "@/components/member/sales-record";
import { MdHomeRepairService } from "react-icons/md";
import { RecordTemplate } from "@/components/member/Record-template";
import Link from "next/link";
import memberService from "@/services/member-service";

const MemberSelling = () => {
  const [selling, setSelling] = useState([]);
  const [status, setStatus] = useState(2);
  useEffect(() => {
    memberService
      .getSelling(status)
      .then((response) => {
        console.log(response);
        setSelling(response?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [status]);
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
            銷售紀錄
          </li>
        </ol>
      </nav>
      <div className="d-flex justify-content-end">
        {/* mobile版的左側tab */}
        <ListM />
      </div>
      <ListUserM />
      <div className="d-flex container-fluid flex-column justify-content-around flex-md-row my-3">
        {/* <ListUserM /> */}
        <ListD />
        <div className="col-12 col-sm-8 sales-and-request">
          <RecordTemplate
            icon={<MdHomeRepairService className="icon me-1" />}
            title={"銷售紀錄"}
            item1={"待處理"}
            info={selling}
            setInfo={setSelling}
            status={status}
            setStatus={setStatus}
          />
        </div>
      </div>
    </>
  );
};

export default MemberSelling;
