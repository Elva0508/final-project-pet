import React from "react";
import ListD from "@/components/member/list-d";
import ListM from "@/components/member/list-m";
import ListUserM from "@/components/member/list-user-m";
import HelperInfo from "@/components/member/helper-info";

const HelperInfoPage = () => {
  return (
    <div className="d-flex container-fluid flex-column flex-md-row">
      <div className="d-flex justify-content-end">
        {/* mobile版的左側tab */}
        <ListM />
      </div>

      {/* <ListUserM /> */}
      <ListD />
      <HelperInfo />
    </div>

    //
  );
};

export default HelperInfoPage;
