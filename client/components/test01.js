import React, { useState } from "react";
import useRWD from "@/hooks/useRWD";

const test01 = () => {
  const device = useRWD();
  // RWDn0
  return (
    <div className={device == "mobile" ? "size-7" : "size-2"}>測試裝置大小</div>
  );
};

export default test01;
