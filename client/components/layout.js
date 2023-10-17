import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import { MissionDetailSticky } from "@/pages/work/find-mission/[mission_id]";
import { HomeVedio } from "@/pages/index";
import BreadCrumb from "./breadCrumb";
import { useEffect, useRef, useState } from "react";
import CatLoading from "./cat-loading";
import { useAuth } from "@/context/fakeAuthContext";
import CatRun from "./cat-run";
import { useHelper } from "@/context/helperContext";
export default function Layout({ children }) {
  const router = useRouter();
  const { userId } = useAuth();
  const { pathname, query } = router;
  const { isLoading, setIsLoading } = useHelper();
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

  useEffect(() => {
    const handleChangeStart = (url, { shallow }) => {
      setIsLoading(true);
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };

    const handleChangeComplete = (url) => {
      setIsLoading(false);
    };
    router.events.on("routeChangeStart", handleChangeStart);
    router.events.on("routeChangeComplete", handleChangeComplete);
    router.events.on("routeChangeError", handleChangeComplete);

    return function cleanup() {
      router.events.off("routeChangeStart", handleChangeStart);
      router.events.off("routeChangeComplete", handleChangeComplete);
      router.events.off("routeChangeError", handleChangeComplete);
    };
  }, [router]);

  return (
    <>
      <>
        <ResponsiveAppBar />
        {pathname && pathname == "/" ? <HomeVedio /> : null}
        {isLoading && <CatRun />}
        <main
          style={{
            maxWidth: "1320px",
            margin: "auto",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
        <Footer />
        {/* {pathname && pathname == "/work/find-helper/[uid]" ? (
          <HelperDetailSticky />
        ) : null} */}
      </>
    </>
  );
}
