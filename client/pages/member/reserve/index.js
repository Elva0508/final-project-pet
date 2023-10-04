import React, { useEffect, useState } from "react";
import ListD from "@/components/member/list-d";
import ListM from "@/components/member/list-m";
import ListUserM from "@/components/member/list-user-m";
import { BsCalendarDateFill } from "react-icons/bs";
import { RecordTemplate } from "@/components/member/Record-template";
import memberService from "@/services/member-service";

const MemberReserve = () => {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState(1);
  useEffect(() => {
    memberService
      .getReserve()
      .then((response) => {
        console.log(response);
        setRequests(response?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="d-flex container-fluid flex-column flex-md-row my-3">
      <div className="d-flex justify-content-end">
        {/* mobile版的左側tab */}
        <ListM />
      </div>

      {/* <ListUserM /> */}
      <ListD />
      <div className="sales-and-request my-3">
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
  );
};

export default MemberReserve;
