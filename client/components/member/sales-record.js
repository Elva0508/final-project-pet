import React from "react";
import { MdHomeRepairService } from "react-icons/md";
import { RecordTemplate } from "./Record-template";
const SalesRecord = () => {
  return (
    <div className="sales-and-request my-3">
      <RecordTemplate
        icon={<MdHomeRepairService className="icon me-1" />}
        title={"銷售紀錄"}
        item1={"待處理"}
      />
    </div>
  );
};

export default SalesRecord;
