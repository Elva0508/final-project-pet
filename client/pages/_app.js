import { useEffect, useContext } from "react";
import Layout from "@/components/layout";
import "@/styles/globals.scss";
import { AuthProvider } from "@/context/fakeAuthContext";
import { CartProvider } from "@/hooks/useCart";
import BreadCrumb from "@/components/breadCrumb";
import { ActivePageProvider } from "@/hooks/useActivePage";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <ActivePageProvider>
            <BreadCrumb />
            <Component {...pageProps} />
          </ActivePageProvider>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}
