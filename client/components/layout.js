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
  const uniqueKey = Date.now();
  useEffect(() => {
    const handleChangeStart = (url, { shallow }) => {
      setIsLoading(true);
      // setTimeout(() => {
      //   // 等待1.5秒后执行路由跳转，這個會錯誤一值造成無限跳轉
      //   router.push(url);
      // }, 1500);
    };
    const handleChangeComplete = (url) => {
      console.log("路由跳轉成功啦!!!!!!!!!!!!!!!", "loading is " + isLoading);
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleChangeStart);
    router.events.on("routeChangeComplete", handleChangeComplete);
    router.events.on("routeChangeError", () => {
      "路由錯誤";
    });

    return function cleanup() {
      // router.events.off("beforeHistoryChange", handleBeforeHistoryChange);
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
        {isLoading && <CatRun key={uniqueKey} />}
        <main
          style={{
            maxWidth: "1320px",
            margin: "auto",
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
