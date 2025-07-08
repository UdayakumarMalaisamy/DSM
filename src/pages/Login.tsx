import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userID === "Admin123" && password === "Admin@321") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin"); // optional, useful later
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Admin ID</label>
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter Admin ID"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter Password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
