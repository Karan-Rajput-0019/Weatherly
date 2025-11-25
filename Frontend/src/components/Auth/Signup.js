import React, { useState } from "react";
import axios from "axios";
export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("https://YOUR_API_URL.onrender.com/api/auth/signup", form);
      alert("Signup successful!");
      window.location = "/login";
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}
