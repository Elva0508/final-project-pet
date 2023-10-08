import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 

import jwtDecode from "jwt-decode";

import { useAuth } from "@/context/fakeAuthContext";

export default function Login() {
  
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const router = useRouter(); 

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
         localStorage.setItem('token000', token);

         const decodedToken = jwtDecode(token);
         const u = decodedToken.id;
         localStorage.setItem('data',  JSON.stringify(decodedToken));

        
        localStorage.setItem('id', u);
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
         localStorage.setItem('email', email);
       //console.log(token)
    
        login(token);
        //router.push('/member/profile');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
       //console.log(token)
    
        login(token);
        //router.push('/member/profile');
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
      if (isAuthenticated) router.replace("/member/profile"); 
    },
    [isAuthenticated, router]
  );

  return (
  
   
      <form className="email-signup" onSubmit={handleSubmit}>

        <div className="u-form-group mb-3">

          <label htmlFor="email">帳號</label>
          <input
          className="form-input " 
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="u-form-group mb-3">
          <label htmlFor="password">密碼</label>
          <input
          className="form-input " 
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="u-form-group">
        
        <button type="submit" className="btn-brown">登入</button>
   
        </div>
      </form>

  );
}