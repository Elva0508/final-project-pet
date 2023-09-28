import React from "react";
import { RecordDetailTemplate } from "./Record-template";
import { BsCalendarDateFill } from "react-icons/bs";

const RequestRecordDetail = () => {
  return (
    <div className="col-12 col-sm-8 sales-record-detail">
      <RecordDetailTemplate
        icon={<BsCalendarDateFill className="icon me-1" />}
        title={"預約紀錄"}
      />
      <div className="d-flex justify-content-end mb-5">
        <button className="btn-outline-confirm mt-2">取消預約</button>
      </div>
    </div>
  );
};

export default RequestRecordDetail;
