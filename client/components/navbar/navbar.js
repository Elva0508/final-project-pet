import React from 'react'
import Image from 'next/image'

//icon
import shoppingCart from '@/assets/cart.svg'
import User from '@/assets/user.svg'
import catLogo from '@/assets/catLogo.svg'

export default function Navbar() {
  return (
    <>
    <header className="header" id="header">
  <nav className="navbar container">
    <a href="#" className="brand">
       <Image src={catLogo} alt="logo" />
    </a>
    <div className="burger" id="burger">
      <span className="burger-line" />
      <span className="burger-line" />
      <span className="burger-line" />
    </div>
    <div className="menu" id="menu">
      <ul className="menu-inner">
        <li className="menu-item size-6">
          <a href="#" className="menu-link">
          品牌介紹
          </a>
        </li>
        <li className="menu-item size-6">
          <a href="#" className="menu-link">
           全部商品
          </a>
        </li>
        <li className="menu-item size-6">
          <a href="#" className="menu-link">
      小貓上工
          </a>
        </li>
        <li className="menu-item size-6">
          <a href="#" className="menu-link">
         小貓兩三知
          </a>
        </li>
        <li className="menu-item size-6">
          <a href="#" className="menu-link">
         常見問題
          </a>
        </li>
      </ul>
    </div>
    
    <div>
    <a href="#" className="menu-block">
    <Image src={User} alt="user" />
    </a>
    <a href="#" className="menu-block">
    <Image src={shoppingCart} alt="shoppingCart" />
    </a>

    </div>

  </nav>
</header>

{/* <nav class="navbar navbar-expand-lg bg-nav-header ">
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
<div >
<a class="navbar-brand" href="#">
    <Image src={catLogo} alt="logo" />
   </a>
  
</div>

  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link size-6 active" aria-current="page" href="#"> 品牌介紹</a>
        <a class="nav-link size-6 " href="#">全部商品</a>
        <a class="nav-link size-6" href="#"> 小貓上工</a>
        <a class="nav-link size-6" href="#"> 小貓兩三知</a>
        <a class="nav-link size-6" href="#">  常見問題</a>
      
      </div>
    </div>
    <div>
    <a href="#" className="menu-block">
    <Image src={User} alt="user" />
    </a>
    <a href="#" className="menu-block">
    <Image src={shoppingCart} alt="shoppingCart" />
    </a>
    </div>
  </div>
</nav>
<div>
<div class='container'>
    <a href="#" className="menu-block">
    <Image src={User} alt="user" />
    </a>
    <a href="#" className="menu-block">
    <Image src={shoppingCart} alt="shoppingCart" />
    </a>
    </div>
</div> */}


    </>
  )
}
