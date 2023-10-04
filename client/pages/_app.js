import { useEffect,useContext } from "react";
import Layout from "./layout";
import "@/styles/globals.scss";
import { AuthProvider } from '@/context/fakeAuthContext'


export default function App({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <AuthProvider> 
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthProvider>
  );
}
