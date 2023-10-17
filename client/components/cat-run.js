import React, { useEffect } from "react";
import lottie from "lottie-web";
import animation from "@/data/catRun.json";

const CatRun = () => {
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
  }, []);
  return (
    <div className="cat-run-wrapper">
      <div
        id="cat-run-lottie"
        className="animate__animated animate__fadeInDownBig"
      ></div>
    </div>
  );
};

export default CatRun;
