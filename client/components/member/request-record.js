import React from "react";
import SalesRecord from "./sales-record";
import { BsCalendarDateFill } from "react-icons/bs";
import { RecordTemplate } from "./Record-template";

const RequestRecord = () => {
  return (
    <div className="sales-and-request my-3">
      <RecordTemplate
        icon={<BsCalendarDateFill className="icon me-1" />}
        title={"預約紀錄"}
        item1={"待回覆"}
      />
    </div>
  );
};

export default RequestRecord;
