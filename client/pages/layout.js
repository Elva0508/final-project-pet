import ResponsiveAppBar from "@/components/navbar/ResponsiveAppBar";
import Footer from "@/components/footer";

export default function Layout({ children }) {
  return (
    <>
      <ResponsiveAppBar />
      <main style={{ maxWidth: "1400px", margin: "auto" }}>{children}</main>
      <Footer />
    </>
  );
}
