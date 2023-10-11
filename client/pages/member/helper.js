import React, { useEffect } from "react";
import ListD from "@/components/member/list-d";
import ListM from "@/components/member/list-m";
import ListUserM from "@/components/member/list-user-m";
import HelperInfo from "@/components/member/helper-info";
import Link from "next/link";
import { useAuth } from "@/context/fakeAuthContext";
import { useRouter } from "next/router";
const HelperInfoPage = () => {
  const { isAuthenticated, userId } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/member/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && (
        <>
          <div className="d-flex justify-content-end">
            {/* mobile版的左側tab */}
            <ListM />
          </div>
          <div className="d-flex container-fluid flex-column justify-content-around flex-md-row my-3">
            <ListD />
            <HelperInfo user_id={userId} />
          </div>
          {/* <ListUserM /> */}
        </>
      )}
    </>
  );
};

export default HelperInfoPage;
