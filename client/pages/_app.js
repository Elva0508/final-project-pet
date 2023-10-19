import { useEffect, useContext, useState } from "react";
import Layout from "@/components/layout";
import "@/styles/globals.scss";
import { AuthProvider } from "@/context/fakeAuthContext";
import { CartProvider } from "@/hooks/useCart";
import { HelperProvider } from "@/context/helperContext";
import BreadCrumb from "@/components/breadCrumb";
import { useRouter } from "next/router";
import { ActivePageProvider } from "@/hooks/useActivePage";
import { NameProvider } from "@/context/nameContext";
import { ProductActivePageProvider } from "@/hooks/useProductActivePage";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname, query } = router;
  // const [isLoading, setIsLoading] = useState(false);
  // const [] = useState(false);

  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import("bootstrap/dist/js/bootstrap");
  }, []);
  // useEffect(() => {
  //   const handleChangeStart = (url, { shallow }) => {
  //     setIsLoading(true);
  //     console.log(
  //       `路由 is 改變為 ${url} ${shallow ? "with" : "without"} shallow routing`
  //     );
  //   };

  //   const handleChangeComplete = (url) => {
  //     console.log("路由跳轉完成!!!!!!!!!!!");
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000);
  //   };
  //   router.events.on("routeChangeStart", handleChangeStart);
  //   router.events.on("routeChangeComplete", handleChangeComplete);
  //   router.events.on("routeChangeError", handleChangeComplete);

  //   return function cleanup() {
  //     router.events.off("routeChangeStart", handleChangeStart);
  //     router.events.off("routeChangeComplete", handleChangeComplete);
  //     router.events.off("routeChangeError", handleChangeComplete);
  //   };
  // }, [router]);
  return (
    <AuthProvider>
    <NameProvider>
      <CartProvider>
        <HelperProvider>
          <ActivePageProvider>
            <ProductActivePageProvider>
            <Layout>
              {pathname === "/work/find-helper" ? "" : <BreadCrumb />}
              <Component {...pageProps} />
            </Layout>
            </ProductActivePageProvider>
          </ActivePageProvider>
        </HelperProvider>
      </CartProvider>
      </NameProvider>
    </AuthProvider>
  );
}
