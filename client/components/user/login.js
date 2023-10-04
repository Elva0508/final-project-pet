import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // 使用next/router取代react-router-dom的useNavigate

import { useAuth } from "@/context/fakeAuthContext";

export default function Login() {
  
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const router = useRouter(); // 使用next/router取代react-router-dom的useNavigate

  // function handleSubmit(e) {
  //   e.preventDefault();

  //  if (email && password) login(email, password);
   
  // }
async function handleSubmit(e) {
  e.preventDefault();

  if (email && password) {
    try {
      const response = await fetch('http://localhost:3005/api/auth-jwt/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        router.push('/home');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  }
}


  useEffect(
    function () {
      if (isAuthenticated) router.replace("/home"); // 使用router.replace取代navigate
    },
    [isAuthenticated, router]
  );

  return (
    <main className="login">
   

      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
        
        <button type="submit" className="btn-confirm">Login</button>
   
        </div>
      </form>
    </main>
  );
}
