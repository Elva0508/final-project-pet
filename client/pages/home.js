import React from "react";
import BlockOne from "@/components/home/block-one";
import BlockTwo from "@/components/home/block-two";

export default function Home() {
  return (
    <>
      <h1>首頁</h1>
      <div className="container">
        <div className="block-one">
          <BlockOne />
        </div>

        <div className="block-one">
          <BlockTwo />
        </div>
      </div>
    </>
  );
}
