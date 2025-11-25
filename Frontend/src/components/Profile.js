import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Profile() {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    axios.get("https://YOUR_API_URL.onrender.com/api/auth/profile", {
      headers: { Authorization: `Bearer ${jwt}` },
    }).then(res => setProfile(res.data))
      .catch(() => window.location="/login");
  }, []);
  return (
    <div>
      <h2>Profile</h2>
      <div>Name: {profile.name}</div>
      <div>Email: {profile.email}</div>
      <button onClick={() => {
        localStorage.removeItem("jwt"); localStorage.removeItem("user");
        window.location="/login";
      }}>Logout</button>
    </div>
  );
}
