import React, { useState, useEffect } from "react";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { MdHomeRepairService } from "react-icons/md";
import { RecordTemplate } from "@/components/member/Record-template";
import Link from "next/link";
import memberService from "@/services/member-service";
import { useAuth } from "@/context/fakeAuthContext";
import { useRouter } from "next/router";

const MemberSelling = () => {
  const [selling, setSelling] = useState([]);
  const [status, setStatus] = useState(2);
  const { isAuthenticated, userId } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/member/login");
    }
  }, [isAuthenticated]);
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
      {isAuthenticated && (
        <>
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
      )}
    </>
  );
};

export default MemberSelling;
