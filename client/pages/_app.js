import { useEffect } from "react";
import Layout from "./layout";
import "@/styles/globals.scss";
import {CartProvider} from '@/hooks/useCart' 

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
