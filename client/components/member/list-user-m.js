import React from "react";

export default function ListUserM() {
  return (
    <>
      <div className="listuserm d-md-none d-block">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <img
              src="https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_A1VK080502.jpg"
              className="m-3"
            ></img>
            <div className="d-flex flex-column justify-content-around mt-3">
              <div>
                <h6 className="m-size-6">Hi,使用者</h6>
              </div>
              <div>
                <button className="m-size-7 level">幼貓</button>
              </div>
            </div>
          </div>
          {/* <div className="d-flex justify-content-end align-items-center align-self-stretch">
            <button className="btn btn-confirm m-2 m-size-6">登出</button>
          </div> */}
        </div>
      </div>
    </>
  );
}
