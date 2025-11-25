import React, { useState } from "react";
import axios from "axios";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("https://YOUR_API_URL.onrender.com/api/auth/login", form);
      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      window.location = "/profile";
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}
