import { createContext, useContext, useReducer } from "react";
import jwt from "jwt-decode";
const appKey = "secretkey";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      return { ...state, 
        user: action.payload,
        token: action.payload.token, isAuthenticated: true };
    case "logout":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { ...state, 
        user: null, 
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
  const [{ user, isAuthenticated,token }, dispatch] = useReducer(
    reducer,
    initialState
  );
async function login(email, password) {
    try {
        const response = await fetch('http://localhost:3005/api/auth-jwt/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
          const u = jwt(data.token);
          dispatch({ type: 'login', payload: { user: u, token: data.token } }); // 传递用户信息和 token
          localStorage.setItem(appKey, data.token);
            //console.log(user)
            dispatch({ type: 'login', payload: user });

        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error(error);
    }
}


  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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