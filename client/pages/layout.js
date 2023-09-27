import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";
import { HelperDetailSticky } from "@/pages/work/find-helper/[pid]";
import { HomeVedio } from "@/pages/index";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <>
      <ResponsiveAppBar />
      {pathname && pathname == "/" ? (<HomeVedio />) : null}
      <main style={{ maxWidth: "1400px", margin: "auto" }}>{children}</main>
      <Footer />
      {pathname && pathname == "/work/find-helper/[pid]" ? (
        <HelperDetailSticky />
      ) : null}
    </>
  );
}
