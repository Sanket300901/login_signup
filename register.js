import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { username, email, phonenumber, password } = user;

    if (!username || !email || !phonenumber || !password) {
      alert("Invalid input");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        email,
        phonenumber,
        password,
      });

      navigate("/login"); // Display the success message

      // Clear the form fields after successful registration
      setUser({
        username: "",
        email: "",
        phonenumber: "",
        password: "",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        name="username"
        value={user.username}
        placeholder="Your Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="phonenumber"
        value={user.phonenumber}
        placeholder="Mobile Number"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Email Address"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Password"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={register}>
        Register
      </div>
    </div>
  );
};

export default Register;
