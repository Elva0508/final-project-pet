import React from "react";
import CreateMission from "@/components/create-mission";
import HelperDetail from "@/components/helper-detail";
import Search from "@/components/job/search";
import Filter from "@/components/job/filter";
import HelperInfo from "@/components/member/helper-info";
import MissionHelperList from "@/components/job/mission-helper-list";
import Order from "@/components/member/order";
import Orderdetail from "@/components/member/order-detail";
import SalesRecordDetail from "@/components/member/sales-record-detail";
const Test = () => {
  return (
    <>
      {/* <MissionHelperList /> */}
      <Order />
      {/* <Orderdetail /> */}
      <SalesRecordDetail />
    </>
  );
};

export default Test;
