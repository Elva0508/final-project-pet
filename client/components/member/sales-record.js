import React from "react";
import { MdHomeRepairService } from "react-icons/md";
import { RecordTemplete } from "./record-template";
const SalesRecord = () => {
  return (
    <div className="sales-and-request p-3">
      <RecordTemplete
        icon={<MdHomeRepairService className="icon me-1" />}
        title={"銷售紀錄"}
        item1={"待處理"}
      />
    </div>
  );
};

export default SalesRecord;
