import React, { useEffect, useState } from "react";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsCalendarDateFill } from "react-icons/bs";
import memberService from "@/services/member-service";
import { MdHomeRepairService } from "react-icons/md";
import { RecordDetailTemplate } from "@/components/member/Record-template";
import { useAuth } from "@/context/fakeAuthContext";
import { useRouter } from "next/router";
const SellingDetailPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState(1);
  const [detail, setDetail] = useState({});
  const { pid } = router.query;
  const { isAuthenticated, userId } = useAuth();

  useEffect(() => {
    // 初始狀態時isAuthenticated為null，等到isAuthenticated有值時(true or false)才做驗證判斷
    if (isAuthenticated === null) {
      return;
    } else {
      if (isAuthenticated === false) {
        router.push("/member/login");
      }
    }
  }, [isAuthenticated]);
  useEffect(() => {
    memberService
      .getRequestDetail(pid)
      .then((response) => {
        const info = response.data.data;
        if (response?.data?.status === 200) {
          setStatus(info.status);
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

  const handleReject = () => {
    memberService
      .setRequestStatus(pid, 4)
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        if (result.status === 200 && result.affectedRows === 1) {
          router.push("/member/selling");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleResolve = () => {
    memberService
      .setRequestStatus(pid, status + 1)
      .then((response) => {
        const result = response.data;
        // console.log(response.data);
        if (result.status === 200 && result.affectedRows === 1) {
          router.push("/member/selling");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {isAuthenticated && (
        <>
          <div className="d-flex justify-content-end">
            {/* mobile版的左側tab */}
          </div>
          <ListUserM />
          <div className="d-flex container-fluid flex-column justify-content-around flex-md-row my-3">
            <ListD />
            <div className="col-12 col-sm-8 sales-record-detail">
              <RecordDetailTemplate
                icon={<MdHomeRepairService className="icon me-1" />}
                title={"銷售紀錄"}
                detail={detail}
                setDetail={setDetail}
              />
              {status && status !== 3 && status !== 4 && (
                <div className="d-flex justify-content-end mb-5">
                  <button
                    className="btn-outline-confirm m-2"
                    onClick={handleReject}
                  >
                    {status === 1 ? "婉拒預約" : "取消服務"}
                  </button>
                  <button className="btn-confirm m-2" onClick={handleResolve}>
                    {status === 1 ? "接受預約" : "完成服務"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SellingDetailPage;