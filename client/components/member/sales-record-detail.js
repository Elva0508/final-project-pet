import React from "react";
import { MdHomeRepairService } from "react-icons/md";
import { RecordDetailTemplate } from "./Record-template";
const Tag = () => {
  return <div>{}</div>;
};
const SalesRecordDetail = () => {
  return (
    <div className="col-12 col-sm-8 sales-record-detail my-3">
      <RecordDetailTemplate
        icon={<MdHomeRepairService className="icon me-1" />}
        title={"銷售紀錄"}
      />
      <div className="d-flex justify-content-end mb-5">
        <button className="btn-outline-confirm m-2">婉拒預約</button>
        <button className="btn-confirm m-2">接受預約</button>
      </div>
    </div>
  );
};

export default SalesRecordDetail;
