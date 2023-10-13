import React from 'react'
import {useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";


export default function Testm() {

  //設置id狀態
const [userId, setUserId] =useState(null)



  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      try{
        const decodeToken = jwt_decode(token);
        const currentUserId =decodeToken.id;

        //更新userId狀態
        setUserId(currentUserId)
      }catch(error){
        console.error("token解析錯誤",error)
      }
    }
    

    //路由
    const apiURL = `http://localhost:3005/api/user/user-profile/${userId}`;
    console.log(userId)
    fetch(apiURL)
    .then((res)=>res.json())
    .then((data)=>{console.log(data.results[0])})
    .catch((error)=>console.error("api請求錯誤",error))
  },[userId])

 
  return (

<div className="user-profile ">
123 
</div>

  )
}
