import React from "react";
import BlockOne from "@/components/home/block-one";
import BlockTwo from "@/components/home/block-two";
import BlockThree from "@/components/home/block-three";
import BlockFive from "@/components/home/block-five";
import BlockSix from "@/components/home/block-six";

export function HomeVedio() {
  return (
    <>
      <div className="home">
        <div className="block-one mb-5">
          <div className="vedio">
            <BlockOne />
          </div>
          <div className="waves">
            <svg
              width="100%"
              height="200px"
              fill="none"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="wave-desktop"
            >
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00B4DB" />
                <stop offset="50%" stopColor="#224488" />
                <stop offset="100%" stopColor="#0083B0" />
              </linearGradient>
              <path
                fill="#fbf5ef"
                d="
              M0 67
              C 273,183
                822,-40
                1920.00,106 
              
              V 359 
              H 0 
              V 67
              Z"
              >
                <animate
                  repeatCount="indefinite"
                  fill="#ffffff"
                  attributeName="d"
                  dur="8s"
                  attributeType="XML"
                  values="
                M0 77 
                C 473,283
                  822,-40
                  1920,116 
                
                V 359 
                H 0 
                V 67 
                Z; 
    
                M0 77 
                C 473,-40
                  1222,283
                  1920,136 
                
                V 359 
                H 0 
                V 67 
                Z; 
    
                M0 77 
                C 973,260
                  1722,-53
                  1920,120 
                
                V 359 
                H 0 
                V 67 
                Z; 
    
                M0 77 
                C 473,283
                  822,-40
                  1920,116 
                
                V 359 
                H 0 
                V 67 
                Z
                "
                ></animate>
              </path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
export default function Index() {
  return (
    <>
      <div className="home">
        <div className="container my-5">
          <div className="block-two my-5">
            <div className="size-1 home-tilte d-flex justify-content-center mb-5">
              新品推薦
            </div>
            <div className="my-5">
              <BlockTwo />
            </div>
            <div className="my-5">
              <BlockTwo />
            </div>
          </div>
          <div className="block-three my-5">
            <BlockThree />
          </div>

          <div className="block-four my-5">
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

          <div className="block-five my-5">
            <BlockFive />
          </div>

          <div className="block-six my-5">
            <div className="photo mb-3">
              <img
                src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                className="img-fluid"
                alt="..."
              ></img>
              <div className="size-1 mt-3 home-tilte d-flex justify-content-center">
                小貓兩三知
              </div>
            </div>
            <div className="px-5">
              <BlockSix />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
