import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer d-flex flex-column justify-content-around align-items-center">
      <div className="footer-links size-6 d-flex w-50 justify-content-around">
        <Link href="">關於我們</Link>
        <Link href="">會員制度</Link>
        <Link href="">常見問題</Link>
        <Link href="">聯絡我們</Link>
      </div>
      <div className="copyright m-size-7">
        © 2023 小貓兩三隻 All Right Reserved
      </div>
    </div>
  );
};

export default Footer;
