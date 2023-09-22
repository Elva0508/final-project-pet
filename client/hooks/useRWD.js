import { useState, useEffect } from "react";

const useRWD = () => {
  const [device, setDevice] = useState("PC");
  useEffect(() => {
    // 定义一个函数来初始化设备类型
    function initializeDevice() {
      const width = window.innerWidth;
      width <= 375
        ? setDevice("mobile")
        : width > 375 && width <= 768
        ? setDevice("tablet")
        : setDevice("PC");
    }

    // 添加窗口大小变化的事件监听器，并在组件卸载时移除它
    window.addEventListener("resize", initializeDevice);

    // 初始设备类型
    initializeDevice();

    return () => {
      window.removeEventListener("resize", initializeDevice);
    };
  }, []);

  return device;
};

export default useRWD;
