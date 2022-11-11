import "../css/register.css";
import React, { useState } from "react";
import APIservice from "../APIService/index";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated} = useOutletContext()

  const register = async (e) => {
    const user = {email: registerEmail, username: registerUsername, password: registerPassword} 
    const res = await APIservice.register(user)
    if(res.error) {
      alert('user already exists')
    } else {
      setRegisterEmail('')
      setRegisterPassword('')
      setRegisterEmail('')
      setIsAuthenticated(true)
      navigate('/profile')
    }
    

  }
  const login = async(e) => {
    const user = {username: loginUsername, password: loginPassword}
    const res = await APIservice.login(user)
    if (res.error) {
        alert(`${res.message}`);
        setLoginUsername('')
        setLoginPassword('')
      } else {
        setIsAuthenticated(true);
        navigate('/profile')
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
        <button onClick={register}>Register</button>
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
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
