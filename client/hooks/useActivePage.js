import { createContext, useState, useContext} from 'react'

const ActivePageContext = createContext();


export function ActivePageProvider ({ children }) {
const [activePage, setActivePage] = useState(1)


  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      { children }
    </ActivePageContext.Provider>
  )
}

export const useActivePage=()=>useContext(ActivePageContext)
