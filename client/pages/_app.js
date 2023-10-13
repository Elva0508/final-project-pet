import { useEffect, useContext } from "react";
import Layout from "@/components/layout";
import "@/styles/globals.scss";
import { AuthProvider } from "@/context/fakeAuthContext";
import { CartProvider } from "@/hooks/useCart";
import { HelperProvider } from "@/context/helperContext";
import BreadCrumb from "@/components/breadCrumb";
import { useRouter } from "next/router";
import { ActivePageProvider } from "@/hooks/useActivePage";

export default function App({ Component, pageProps }) {
  const { pathname, query } = useRouter();
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <AuthProvider>
      <CartProvider>
        <HelperProvider>
          <ActivePageProvider>
            <Layout>
              {pathname === "/work/find-helper" ? "" : <BreadCrumb />}
              <Component {...pageProps} />
            </Layout>
          </ActivePageProvider>
        </HelperProvider>
      </CartProvider>
    </AuthProvider>
  );
}
