import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import animation from "@/data/catRun.json";
import { useHelper } from "@/context/helperContext";
import { useRouter } from "next/router";
const CatRun = () => {
  const router = useRouter();
  const { isLoading } = useHelper();
  const [contentHeight, setContentHeight] = useState(0);
  const [offset, setOffset] = useState(0);
  const catWrapperRef = useRef(null);
  const lottieRef = useRef(false);
  const catRunRef = useRef(null);

  useEffect(() => {
    if (!lottieRef.current) {
      lottie.loadAnimation({
        container: document.getElementById("cat-run-lottie"), // the dom element
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animation, // the animation data
      });
    }
    lottieRef.current = true;
  }, [router]);
  const handleScroll = () => {
    // 讓背景遮罩與整個文本高度一樣高
    const newHeight = document.body.scrollHeight;
    setContentHeight(newHeight);

    const element = catRunRef.current;
    if (element) {
      console.log("ELEMENT存在");
      const viewportHeight = window.innerHeight; //整個瀏覽器窗口的高度
      const elementHeight = element.clientHeight;
      const elementOffsetTop = element.getBoundingClientRect().top;
      const centerOffset = (viewportHeight - elementHeight) / 2;
      const newOffset = centerOffset - elementOffsetTop;
      setOffset(newOffset);
    }
  };
  useEffect(() => {
    handleScroll(); // 初始化时调用一次以确保元素在适当位置
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router]);
  useLayoutEffect(() => {
    // 获取 DOM 元素的高度
    const newHeight = document.body.scrollHeight;
    setContentHeight(newHeight);
  }, [router]);
  return (
    <div
      className="cat-run-wrapper"
      ref={catWrapperRef}
      style={{ height: `calc(${contentHeight}px - 110px)` }}
    >
      <div
        id="cat-run-lottie"
        ref={catRunRef}
        className="animate__animated animate__fadeInDownBig"
        style={{ transform: `translateY(${offset}px)` }}
      ></div>
    </div>
  );
};

export default CatRun;
