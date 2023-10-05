import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import { MissionDetailSticky } from "@/pages/work/find-mission/[pid]";
import { HelperDetailSticky } from "@/pages/work/find-helper/[uid]";
import { HomeVedio } from "@/pages/index";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  return (
    <>
      <ResponsiveAppBar />
      {pathname && pathname == "/" ? <HomeVedio /> : null}
      <main style={{ maxWidth: "1400px", margin: "auto" }}>{children}</main>
      <Footer />
      {pathname && pathname == "/work/find-mission/[pid]" ? (
        <MissionDetailSticky />
      ) : (
        ""
      )}
      {pathname && pathname == "/work/find-helper/[uid]" ? (
        <HelperDetailSticky />
      ) : null}
    </>
  );
}