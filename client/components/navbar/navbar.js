import React, { useEffect, useState } from 'react'
import Image from 'next/image'

//icon
import shoppingCart from '@/assets/cart.svg'
import User from '@/assets/user.svg'
import catLogo from '@/assets/catLogo.svg'

export default function Navbar() {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isHeaderOnScroll, setIsHeaderOnScroll] = useState(false);

  useEffect(()=>{
    const burgerMenu = document.getElementById("burger")
    const navbarMenu = document.getElementById("menu");

    const handleBurgerClick = ()=>{
      setIsBurgerActive((preState)=> !preState)
    }
    if( burgerMenu && navbarMenu ){
      burgerMenu.addEventListener("click", handleBurgerClick )
    }

    const menuLinks =document.querySelectorAll(".menu-link")

    const handleMenuLinkClick = () => {
      setIsBurgerActive(false);
    };
    menuLinks.forEach((link) => {
      link.addEventListener("click", handleMenuLinkClick);
    });

      // Change Header Background on Scrolling
      const handleScroll = () => {
        if (window.scrollY >= 85) {
          setIsHeaderOnScroll(true);
        } else {
          setIsHeaderOnScroll(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);

     // Clean up event listeners on component unmount
     return () => {
      if (burgerMenu && navbarMenu) {
        burgerMenu.removeEventListener("click", handleBurgerClick);
      }

      menuLinks.forEach((link) => {
        link.removeEventListener("click", handleMenuLinkClick);
      });

      window.removeEventListener("scroll", handleScroll);
    };


  },[])

  return (
    <>
    <header className="header" id="header">
  <nav className="u-navbar container">
    <a href="#" className="brand">
       <Image src={catLogo} alt="logo" />
    </a>

    <div className={`burger ${isBurgerActive ? 'is-active' : ''}`} id="burger">
      <span className="burger-line" />
      <span className="burger-line" />
      <span className="burger-line" />
    </div>
  
    <div className={`menu ${isBurgerActive ? 'is-active' : ''}`} id="menu">
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
    
    <div className='d-flex'>
 
    <a href="#" className="btn btn-circle menu-block">
    <Image className='user' src={User} alt="user" />
    </a>


    <a href="#" className="btn btn-circle menu-block">
    <Image className='shoppingCart' src={shoppingCart} alt="shoppingCart" />
    </a>
    </div>


  </nav>
</header>



    </>
  )
}
