import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animation from "@/data/catRun.json";
import { useHelper } from "@/context/helperContext";
import { useRouter } from "next/router";
const CatRun = () => {
  const router = useRouter();
  const { isLoading } = useHelper();
  const catWrapperRef = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("cat-run-lottie"), // the dom element
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation, // the animation data
    });

    return () => {
      lottie.destroy();
    };
  }, [router]);
  const handleScroll = () => {};
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="cat-run-wrapper" ref={catWrapperRef}>
      <div
        id="cat-run-lottie"
        className="animate__animated animate__fadeInDownBig"
      ></div>
    </div>
  );
};

export default CatRun;
