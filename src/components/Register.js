import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./Login";

function Register({ isLogin, setIsLogin = () => {} }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userRes = await axios.post("http://localhost:7000/users/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", userRes.data.token);
      localStorage.setItem("user", JSON.stringify(userRes?.data?.user));
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const keepUserLoggedIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:7000/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Error refreshing user session:", error);
    }
  };
    
    const handlePath = () => {
        setIsLogin(!isLogin)
        navigate("/login")
    }

  useEffect(() => {
    const interval = setInterval(() => {
      keepUserLoggedIn(email, password);
    }, 15 * 60 * 1000); // 15 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [email, password]);
    
    useEffect(() => {
        isAuthenticated()
    }, [])

  return (
    <div className="login">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="flip-form">
        <span>If you already have an account</span>
        <span
          onClick={() => handlePath()}
          style={{ color: "#007BFF", cursor: "pointer" }}
        >
          Login
        </span>
      </div>
    </div>
  );
}

export default Register;
