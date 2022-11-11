import "../css/register.css";
import React, { useState } from "react";
import APIservice from "../APIService/index";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const register = async (e) => {
    const user = {email: registerEmail, username: registerUsername, password: registerPassword} 
    const res = await APIservice.register(user)
    console.log(res)
  }
  const login = async(e) => {
    const user = {username: loginUsername, password: loginPassword}
    const res = await APIservice.login(user)
    if (res.error) {
        alert(`${res.message}`);
        setLoginUsername('')
        setLoginPassword('')
      } else {
        // REMOVE-END
        // This sets isAuthenticated = true and redirects to profile
        setIsAuthenticated(true);
        navigate('/profile')
        // REMOVE-START
      }
  };

  return (
    <div>
      <div>
        <h1>Register</h1>
        <input
          placeholder="email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>
    </div>
  );
}
