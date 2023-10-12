import React, { useEffect, useState } from "react";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { BsCalendarDateFill } from "react-icons/bs";
import { RecordTemplate } from "@/components/member/Record-template";
import memberService from "@/services/member-service";
import Link from "next/link";
import { useAuth } from "@/context/fakeAuthContext";
import { useRouter } from "next/router";
const MemberReserve = () => {
  const [requests, setRequests] = useState([]);
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
      .getReserve(status)
      .then((response) => {
        console.log(response);
        setRequests(response?.data?.data);
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
                icon={<BsCalendarDateFill className="icon me-1" />}
                title={"預約紀錄"}
                item1={"待回覆"}
                info={requests}
                setInfo={setRequests}
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

export default MemberReserve;
