import React from "react";
import { AuthProvider, useAuth } from "../hooks/user-auth";

function LoginTest() {
  return (
    <AuthProvider>
      <div>
        <UserInfo />
        <UserActions />
      </div>
    </AuthProvider>
  );
}

function UserInfo() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      {user ? (
        <div>
          <div>用戶名：{user.username}</div>
        </div>
      ) : (
        <div>未登錄</div>
      )}
    </div>
  );
}

function UserActions() {
    const { login, logout } = useAuth();
  
    return (
      <div>
        <button onClick={() => login('exampleUser', 'password')}>Login</button>
        <button onClick={logout}>Logout</button>
    
      </div>
    );
  }
  
  export default LoginTest;
