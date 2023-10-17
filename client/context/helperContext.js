import React, { createContext, useContext, useState, useEffect } from "react";

export const HelperContext = createContext(undefined);

export const HelperProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 初次渲染時載入儲存在localStorage的收藏
    if (localStorage.getItem("helperFav"))
      setCollection(JSON.parse(localStorage.getItem("helperFav")));
  }, []);

  return (
    <HelperContext.Provider
      value={{ collection, setCollection, isLoading, setIsLoading }}
    >
      {children}
    </HelperContext.Provider>
  );
};

export function useHelper() {
  const context = useContext(HelperContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}
