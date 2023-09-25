import { useEffect } from "react";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <Component {...pageProps} />;
}
