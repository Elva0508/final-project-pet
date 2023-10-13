import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import { MissionDetailSticky } from "@/pages/work/find-mission/[mission_id]";
import { HomeVedio } from "@/pages/index";
import BreadCrumb from "./breadCrumb";
import { useEffect, useRef, useState } from "react";
import CatLoading from "./cat-loading";
import { useAuth } from "@/context/fakeAuthContext";
export default function Layout({ children }) {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { pathname, query } = useRouter();
  const loadingRef = useRef();
  // useEffect(() => {
  //   // 讓頁面可以滾動，原本禁止有overflow-y軸
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, [4500]);
  //   setTimeout(() => {
  //     const loading = document.querySelector(".cat-loading-wrapper");
  //     console.log(loading);
  //     loading.classList.add("cat-loading-opacity");
  //   }, [4000]);
  // }, []);
  // useEffect(() => {
  //   if (isLoading) {
  //     document.body.classList.add("disableFlow");
  //   } else {
  //     document.body.classList.remove("disableFlow");
  //   }
  // }, [isLoading]);
  return (
    <>
      <>
        {" "}
        <ResponsiveAppBar />
        {pathname && pathname == "/" ? <HomeVedio /> : null}
        <main style={{ maxWidth: "1320px", margin: "auto" }}>{children}</main>
        <Footer />
        {pathname && pathname == "/work/find-helper/[uid]" ? (
          <HelperDetailSticky />
        ) : null}
      </>
    </>
  );
}
