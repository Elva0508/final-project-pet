import React, { useEffect, useState } from "react";
import ListD from "@/components/member/list-d";
import ListM from "@/components/member/list-m";
import ListUserM from "@/components/member/list-user-m";
import SalesRecordDetail from "@/components/member/sales-record-detail";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsCalendarDateFill } from "react-icons/bs";
import memberService from "@/services/member-service";
import { MdHomeRepairService } from "react-icons/md";
import { RecordDetailTemplate } from "@/components/member/Record-template";
const SellingDetailPage = () => {
  const router = useRouter();
  const [detail, setDetail] = useState({});
  const { pid } = router.query;
  useEffect(() => {
    memberService
      .getReserveDetail(pid)
      .then((response) => {
        const info = response.data.data;
        if (response?.data?.status === 200) {
          switch (info.status) {
            case 1:
              setDetail({ ...info, status: "待處理" });
              break;
            case 2:
              setDetail({ ...info, status: "進行中" });
              break;
            case 3:
              setDetail({ ...info, status: "已完成" });
              break;
            case 4:
              setDetail({ ...info, status: "已取消" });
              break;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pid]);
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
          <li className="breadcrumb-item" aria-current="page">
            <Link href="/member/selling">銷售紀錄</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {pid}
          </li>
        </ol>
      </nav>
      <div className="d-flex justify-content-end">
        {/* mobile版的左側tab */}
        <ListM />
      </div>
      <div className="d-flex container-fluid flex-column justify-content-around flex-md-row my-3">
        {/* <ListUserM /> */}
        <ListD />
        <div className="col-12 col-sm-8 sales-record-detail">
          <RecordDetailTemplate
            icon={<MdHomeRepairService className="icon me-1" />}
            title={"銷售紀錄"}
            detail={detail}
            setDetail={setDetail}
          />
          <div className="d-flex justify-content-end mb-5">
            <button className="btn-outline-confirm m-2">婉拒預約</button>
            <button className="btn-confirm m-2">接受預約</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellingDetailPage;
