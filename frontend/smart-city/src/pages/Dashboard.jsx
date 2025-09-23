// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name} ({user.role})</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}
