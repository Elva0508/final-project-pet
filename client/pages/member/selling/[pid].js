import React from "react";
import ListD from "@/components/member/list-d";
import ListM from "@/components/member/list-m";
import ListUserM from "@/components/member/list-user-m";
import SalesRecordDetail from "@/components/member/sales-record-detail";
const SellingDetailPage = () => {
  return (
    <div className="d-flex container-fluid flex-column flex-md-row my-3">
      <div className="d-flex justify-content-end">
        {/* mobile版的左側tab */}
        <ListM />
      </div>

      {/* <ListUserM /> */}
      <ListD />
      <SalesRecordDetail />
    </div>
  );
};

export default SellingDetailPage;
