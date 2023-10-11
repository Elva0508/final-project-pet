import React from 'react'
import Image from "next/image";
import Cat1 from "@/assets/cat-01.png";

export default function SingleCouponFree() {
  return (
  <>
  <div id="container-coupon">
  <div id="error-box">
    
    <Image src={Cat1} width={80} height={80} className="cat1" />
    <div className="shadow move" />
    <div className="message-coupon">
      <h1 className="priceCode">免運!</h1>
      <p>不限金額免運費</p>
    </div>
  </div>
  </div>

  </>
  )
}
