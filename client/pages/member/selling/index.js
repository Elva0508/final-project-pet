import React, { useState, useEffect } from "react";
import ListD from "@/components/member/list-d";
import { MdHomeRepairService } from "react-icons/md";
import { RecordTemplate } from "@/components/member/Record-template";
import Link from "next/link";
import memberService from "@/services/member-service";
import { useAuth } from "@/context/fakeAuthContext";
import { useRouter } from "next/router";
import ListUserM from "@/components/member/list-user-m";
const MemberSelling = () => {
  const [selling, setSelling] = useState([]);
  const [status, setStatus] = useState(2);
  const { isAuthenticated, userId: user_id } = useAuth();
  const router = useRouter();
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
    if (user_id) {
      memberService
        .getSelling(user_id, status)
        .then((response) => {
          let result = response?.data?.data;
          console.log(result);
          result.reverse();
          setSelling(result);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [status]);
  return (
    <>
      {isAuthenticated && (
        <>
          <ListUserM />
          <div className="d-flex container-fluid flex-column justify-content-around flex-md-row my-3">
            <ListD />
            <div className="col-12 col-sm-8 sales-and-request">
              <RecordTemplate
                // icon={<MdHomeRepairService className="icon me-1" />}
                title={"幫手訂單"}
                item1={"待處理"}
                info={selling}
                setInfo={setSelling}
                status={status}
                setStatus={setStatus}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MemberSelling;
