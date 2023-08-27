import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token",token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
      console.log("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="content">
        <h2>ECommerce Application</h2>
        <form>
          <div className="main_container">
            <div className="mail">
            <label>Email</label>
              <input 
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
              />
            </div>
            <div className="password">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
              />
            </div>
            <div className="login-options">
              <label htmlFor="rememberMe">
                <input type="checkbox" id="rememberMe" />
                Remember me
              </label>
            </div>
          </div>
          <div className="login-button" onClick={handleLogin}>
            Continue
          </div>
        </form>
        <br />
        <p>
          Don't have an account? <a href="#">Create an account</a>
        </p>
        <br />
      </div>
    </div>
  );
}

export default Login;

