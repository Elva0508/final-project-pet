import React from 'react'

const dataAll = [
  {name: "貓咪節快樂!", value: "$100", startDate: "2023-08-28", endDate: "2023-09-05", instruction:"最低消費金額: $500 序號:happy 適用商品 ",id:1},
  {name: "來吃罐罐!", value: "$100", startDate: "2023-08-28", endDate: "2023-09-05", instruction:"最低消費金額: $500 序號:happy 適用商品 ",id:2},
  {name: "清涼一下", value: "$100", startDate: "2023-08-28", endDate: "2023-09-05", instruction:"最低消費金額: $500 序號:happy 適用商品 ",id:3},
  {name: "想當貓!", value: "$100", startDate: "2023-08-28", endDate: "2023-09-05", instruction:"最低消費金額: $500 序號:happy 適用商品 ",id:4},
  {name: "學貓叫", value: "$100", startDate: "2023-08-28", endDate: "2023-09-05", instruction:"最低消費金額: $500 序號:happy 適用商品 ",id:5},
  {name: "會員禮", value: "$100", startDate: "2023-08-28", endDate: "2023-09-05", instruction:"最低消費金額: $500 序號:happy 適用商品 ",id:6},
]

export default function UserCoupon() {
 
  


  return (
    <>
           <div className="reset-password ">
        <div className="title">
          <p className=" size-4">
          {/* <Image src={myProfile} alt="myProfile-logo" /> */}
            我的優惠券
          </p>
        </div>
        <div>
          <input type='text' placeholder='輸入優惠序號'/>
          <button>新增</button>
        </div>
        <div>
          <a href='#'>全部(12)</a>
          <a href='#'>即將到期(3)</a>
        </div>   
        
        <thead>
        <tr>
            <th>名稱</th>
            <th>面額</th>
            <th>生效日</th>
            <th>到期日</th>
            <th>說明</th>
          </tr>
        </thead>
        <tbody>
        {dataAll.map((v)=>{
          return(
            <tr  key={v.id}>
            <td >{v.name}</td>
            <td>{v.value}</td>
            <td>{v.endDate}</td>
            <td>{v.instruction}</td>
          </tr>
          )
       
        })}
          
        </tbody>
        </div>
    </>
  )
}
