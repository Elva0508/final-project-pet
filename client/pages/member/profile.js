import React from "react";
import ListD from "@/components/member/list-d";
import ListM from "@/components/member/list-m";

import UserForm from "@/components/user/userForm";
const ProfilePage = () => {
  return (
    <div className="d-flex container-fluid flex-column flex-md-row my-3">
      <div className="d-flex justify-content-end">
        {/* mobile版的左側tab */}
        <ListM />
      </div>

      {/* <ListUserM /> */}
      <ListD />
      <UserForm />
    </div>

    //
  );
};

export default ProfilePage;
