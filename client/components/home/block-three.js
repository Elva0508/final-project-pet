import React from "react";

export default function BlockThree() {
  return (
    <>
      <div className="block-three mb-5">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-7">
              <div className="mt-5 ms-5">
                <div className="d-flex">
                  <span className="title">開幕慶</span>
                </div>
                <div className="d-flex justify-content-start">
                  <span>
                    限時特賣活動喔喔喔喔限時特賣活動喔喔喔喔,限時特賣活動喔喔喔喔
                  </span>
                </div>
              </div>
              <div className="m-3 bg-light">
                <div className="container text-center">
                  <div className="row align-items-start mt-5 pt-5 pb-5">
                    <div className="col price size-6">
                      $99
                      <div className="size-7 content">全館滿額免運</div>
                    </div>
                    <div className="col price size-6">
                      9折券
                      <div className="size-7 content">會員免費領取</div>
                    </div>
                    <div className="col price size-6">
                      買一送一
                      <div className="size-7 content">VIP會員生日禮金</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-5">
                <button type="reset" className="btn-brown mx-1">
                  立即註冊
                </button>
              </div>
            </div>
            <div className="col-5 col-md-5 d-flex align-items-end">
              <div className="row">
                <div className="col-8 ">
                  <img
                    src="https://hips.hearstapps.com/hmg-prod/images/cat-quotes-ginger-cat-on-bed-64e3990220b36.jpeg?crop=0.668xw:1.00xh;0.125xw,0&resize=1200:*"
                    className="img-fluid"
                    alt="..."
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
