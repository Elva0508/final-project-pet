import React,{useContext} from 'react'
import {AuthContext} from '@/context/authContext'

export default function Logout() {
const {user,setUser} = useContext(AuthContext);
let handleLogout = () => {
  
  setUser(undefined);

};

  return (
    <>
    <div>logout</div>
  
    <h1>{user.name}</h1>
    <h1>{user.mail}</h1>
    <div className='btn btn-primary' onClick={ handleLogout}>logout</div>
    </>

  )
}
