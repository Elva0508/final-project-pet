import React from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { HiClipboardList } from 'react-icons/hi'
import { LiaListAltSolid } from 'react-icons/lia'
import { FaAddressCard } from 'react-icons/fa'
import { FaPencilAlt } from 'react-icons/fa'
import { FaAward } from 'react-icons/fa6'
import { BiSolidShoppingBag } from 'react-icons/bi'
import { MdDiscount } from 'react-icons/md'
import { FaList } from 'react-icons/fa'
import { RiFileList3Fill } from 'react-icons/ri'


export default function ListM() {
  return (
    <>
        
        <div className="btn-group dropstart list-m d-sm-none d-block">
        <button type="button" className="btncolor" data-bs-toggle="dropdown" aria-expanded="false">
        <BsFillCaretDownFill/>
        </button>
        <ul className="dropdown-menu text-center m-size-6">
          <li><h6 className="dropdown-header m-size-6">基本資料</h6></li>
          <li><a className="dropdown-item " href="#"><FaAddressCard/>我的資料</a></li>
          <li><a className="dropdown-item " href="#"><FaAward/>會員等級</a></li>
          <li><h6 className="dropdown-header m-size-6">小貓商城</h6></li>
          <li><a className="dropdown-item " href="#"><RiFileList3Fill/>我的訂單</a></li>
          <li><a className="dropdown-item " href="#"><BiSolidShoppingBag/>購買紀錄</a></li>
          <li><a className="dropdown-item " href="#"><FaList/>追蹤清單</a></li>
          <li><a className="dropdown-item " href="#"><MdDiscount/>我的優惠券</a></li>
          <li><h6 className="dropdown-header m-size-6">小貓上工</h6></li>
          <li><a className="dropdown-item " href="#"><FaPencilAlt/>小幫手資料</a></li>
          <li><a className="dropdown-item " href="#"><LiaListAltSolid/>任務清單</a></li>
          <li><a className="dropdown-item " href="#"><HiClipboardList/>刊登紀錄</a></li>
        </ul>
      </div>
    </>
  )
}
