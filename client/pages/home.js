import React from "react";
import BlockOne from "@/components/home/block-one";
import BlockTwo from "@/components/home/block-two";
import BlockThree from "@/components/home/block-three";
import BlockFive from "@/components/home/block-five";
import BlockSix from "@/components/home/block-six";

export default function Home() {
  return (
    <>
      <h1>首頁</h1>
      <div className="container">
        <div className="size-1">影片區</div>
        <div className="block-one mb-5">
          <BlockOne />
        </div>

        <div className="block-two mb-5">
          <div className="size-1 home-tilte d-flex justify-content-center mb-5">
            新品推薦
          </div>
          <div className="mb-3">
            <BlockTwo />
          </div>
          <div className="mb-3">
            <BlockTwo />
          </div>
        </div>
        {/* <h1>BlockThree</h1> */}
        <div className="block-three">
          <BlockThree />
        </div>

        <div className="block-four mb-5">
          <div className="size-1 home-tilte d-flex justify-content-center mb-5">
            本週排行榜
          </div>
          <div className="mb-3">
            <BlockTwo />
          </div>
          <div className="mb-3">
            <BlockTwo />
          </div>
        </div>

        <div className="block-five">
          <BlockFive />
        </div>

        <div className="block-six">
          <div className="photo mb-3">
            <img
              src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              class="img-fluid"
              alt="..."
            ></img>
            <div className="size-1 home-tilte d-flex justify-content-center mb-5">
              小貓兩三知
            </div>
          </div>
          <BlockSix />
        </div>
      </div>
    </>
  );
}
