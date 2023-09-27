import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import { MissionDetailSticky } from "@/pages/work/find-mission/[pid]";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <>
      <ResponsiveAppBar />
      <main style={{ maxWidth: "1400px", margin: "auto" }}>{children}</main>
      <Footer />
      {pathname && pathname == "/work/find-mission/[pid]" ? (
        <MissionDetailSticky />
      ) : ''}
    </>
  );
}