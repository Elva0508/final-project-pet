import { createContext, useState, useContext} from 'react'
import { useRouter } from 'next/router';


const ProductActivePageContext = createContext();


export function ProductActivePageProvider ({ children }) {
  const { pathname } = useRouter()
  console.log(pathname);
  let page
  page = 24;
  if (pathname =="/product"){
    page=1
  } else if (pathname =="/product/1"){
    page=2
  } else if (pathname =="/product/1/1"){
    page=3
  } else if (pathname =="/product/1/2"){
    page=4
  } else if (pathname =="/product/1/3"){
    page=5
  } else if (pathname =="/product/2"){
    page=6
  } else if (pathname =="/product/2/4"){
    page=7
  } else if (pathname =="/product/2/5"){
    page=8
  } else if (pathname =="/product/2/6"){
    page=9
  } else if (pathname == "/product2/7") {
    page = 10
  } else if (pathname == "/product/3") {
    page = 11
  } else if (pathname == "/product/3/8") {
    page = 12
  } else if (pathname == "/product/3/9") {
    page = 13
  } else if (pathname == "/product/3/10") {
    page = 14
  } else if (pathname == "/product/4") {
    page = 15
  } else if (pathname == "/product/4/11") {
    page = 16
  } else if (pathname == "/product/4/12") {
    page = 17
  } else if (pathname == "/product/4/13") {
    page = 18
  } else if (pathname == "/product/4/14") {
    page = 19
  } else if (pathname == "/product/5") {
    page = 20
  } else if (pathname == "/product/5/15") {
    page = 21
  } else if (pathname == "/product/5/16") {
    page = 22
  } else if (pathname == "/product/5/17") {
    page = 23
  } else if (pathname == "/product/5/18") {
    page = 24
  }else {
      page = 0
  }

  const [activeButton, setActiveButton] = useState(page)


  return (
    <ProductActivePageContext.Provider value={{activeButton, setActiveButton }}>
      { children }
    </ProductActivePageContext.Provider>
  )
}

export const useProductActivePage = () => useContext(ProductActivePageContext);
