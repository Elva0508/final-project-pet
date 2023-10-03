import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import { MissionDetailSticky } from "@/pages/work/find-mission/[mission_id]";
import { HelperDetailSticky } from "@/pages/work/find-helper/[pid]";

export default function Layout({ children }) {
  const { pathname,query } = useRouter();
  console.log(pathname);
  return (
    <>
      <ResponsiveAppBar />
      <main style={{ maxWidth: "1400px", margin: "auto" }}>{children}</main>
      <Footer />
      {pathname === "/work/find-mission/[mission_id]" && query.mission_id ? (
        <MissionDetailSticky />
      ) : ''}
      {pathname && pathname == "/work/find-helper/[pid]" ? (
        <HelperDetailSticky />
      ) : null}
    </>
  );
}