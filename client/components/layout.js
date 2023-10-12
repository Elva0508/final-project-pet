import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import { MissionDetailSticky } from "@/pages/work/find-mission/[mission_id]";
import { HelperDetailSticky } from "@/pages/work/find-helper/[uid]";
import { HomeVedio } from "@/pages/index";
import BreadCrumb from "./breadCrumb";

export default function Layout({ children }) {
  const { pathname, query } = useRouter();
  return (
    <>
      {pathname === "/work/find-mission/[mission_id]" && query.mission_id ? (
        <>
          <ResponsiveAppBar />
          {/* <BreadCrumb /> */}
          <main style={{ margin: "auto" }}>{children}</main>
        </>
      ) : (
        <> <ResponsiveAppBar />
          {pathname === "/work/find-helper" ? "" : <BreadCrumb />}
          {pathname && pathname == "/" ? <HomeVedio /> : null}
          <main style={{ maxWidth: "1320px", margin: "auto" }}>{children}</main>
          <Footer />

          {pathname && pathname == "/work/find-helper/[uid]" ? (
            <HelperDetailSticky />
          ) : null}</>
      )}
    </>
  );
}
