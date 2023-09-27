
import React from "react";


import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import LoginForm from "@/components/user/loginForm";

// 沛涵
import CreateMission from "@/pages/work/create-mission";
import HelperDetail from "@/pages/work/find-helper/[pid]";
import HelperInfo from "@/components/member/helper-info";
import MissionHelperList from "@/pages/work/find-helper";
import SalesRecordDetail from "@/components/member/sales-record-detail";
import SalesRecord from "@/components/member/sales-record";
import RequestRecord from "@/components/member/request-record";
import RequestRecordDetail from "@/components/member/request-record-detail";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import LoginForm from "@/components/user/loginForm";
const Test = () => {
  return (
    <>
      <SalesRecord />
      <SalesRecordDetail />
      <RequestRecord />
      <RequestRecordDetail />
    </>
  );
};

export default Test;
