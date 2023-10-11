import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import { MissionDetailSticky } from "@/pages/work/find-mission/[mission_id]";
import { HelperDetailSticky } from "@/pages/work/find-helper/[uid]";
import { HomeVedio } from "@/pages/index";
import BreadCrumb from "./breadCrumb";
import { useEffect, useState } from "react";
import CatLoading from "./cat-loading";

export default function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { pathname, query } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, [3000]);
  }, []);
  return (
    <>
      {isLoading ? (
        <CatLoading />
      ) : (
        <>
          <ResponsiveAppBar />
          {pathname && pathname == "/" ? <HomeVedio /> : null}
          <main style={{ maxWidth: "1320px", margin: "auto" }}>{children}</main>
          <Footer />
          {pathname === "/work/find-mission/[mission_id]" &&
          query.mission_id ? (
            <MissionDetailSticky />
          ) : (
            ""
          )}
          {pathname && pathname == "/work/find-helper/[uid]" ? (
            <HelperDetailSticky />
          ) : null}
        </>
      )}
    </>
  );
}
