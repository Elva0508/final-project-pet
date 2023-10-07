import { createContext, useContext,  useReducer } from "react";
// import jwt from "jwt-decode";
// const appKey = "secretkey";

const AuthContext = createContext();

const initialState = {
  Token: null,
  isAuthenticated: false,
  
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("token", JSON.stringify(action.payload.token));

      return { ...state, 
       
        Token: action.payload, 
        isAuthenticated: true };
    case "logout":
  
      return { ...state, 
        Token: null, 
        isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

function AuthProvider({ children }) {
  const [{ Token, isAuthenticated}, dispatch] = useReducer(
    reducer,
    initialState
  );


function login(token) {
  dispatch({ type: "login", payload: token });
  
}
function logout() {
  dispatch({ type: "logout" });
}

  return (
    <AuthContext.Provider value={{ Token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };