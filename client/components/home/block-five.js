import React from "react";
import ProductCard from "@/components/home/home-product-card";

export default function BlockFive() {
  return (
    <>
      <div className="block-five mb-5">
        <div className="text-center">
          <div className="row">
            <div className="col-5 col-md-5 d-flex align-items-end">
              <div className="row">
                <div className="col-4"></div>
                <div className="col-8 py-5">
                  <img
                    src="https://i.pinimg.com/564x/2d/5b/28/2d5b28e26a315f3d57ae1e4a4f1a34c7.jpg"
                    className="img-fluid rounded"
                    alt="..."
                  ></img>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="mt-5 ms-5">
                <div className="d-flex justify-content-start title size-1 m-size-3">
                  小貓上工囉！ <br></br>貓咪互助平台
                </div>
                <div className="d-flex justify-content-start">
                  你的貓貓需要幫助嗎？讓其他人來幫助你吧！
                </div>
              </div>
              <div className="m-5">
                <button type="reset" className="btn-brown mx-1">
                  立即前往
                </button>
              </div>
              <div className="m-3 bg-light">
                <div className="container text-center">
                  <div className="row align-items-start mt-5 pt-5 pb-5">
                    <div className="col price size-6">
                      100+
                      <div className="size-7 content">百位小幫手</div>
                    </div>
                    <div className="col price size-6">
                      890+
                      <div className="size-7 content">刊登需求</div>
                    </div>
                    <div className="col price size-6">
                      300+
                      <div className="size-7 content">真實用戶回饋</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
