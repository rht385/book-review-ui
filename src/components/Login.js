import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Register from "./Register";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  console.log(token, "token");
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:7000/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
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

  useEffect(() => {
    const interval = setInterval(() => {
      keepUserLoggedIn(email, password);
    }, 15 * 60 * 1000); // 15 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [email, password]);
    
    const handlePaths = () => {
        setIsLogin(!isLogin)
        navigate("/register")
    }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div className="auth-container">
      {isLogin ? (
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
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
            <button type="submit">Login</button>
          </form>
          <div className="flip-form">
            <span>If you don't have an account</span>
            <span
              onClick={() => handlePaths()}
              style={{ color: "#007BFF", cursor: "pointer" }}
            >
              Create
            </span>
          </div>
        </div>
      ) : (
        <Register isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default Login;
