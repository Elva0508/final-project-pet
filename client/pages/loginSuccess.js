import React from 'react'
import { AuthContext } from '@/context/authContext'

export default function loginSuccess() {

  const {user, setUser}=useContext(AuthContext)
  let handleUserLogout=()=>{
    setUser(undefined)
  }
  return (
    <>
    <div>loginSuccess</div>
    <h1>username</h1>
    <h2>userID</h2>
    <button onClick={handleUserLogout}>logout</button>
    </>

  )
}
