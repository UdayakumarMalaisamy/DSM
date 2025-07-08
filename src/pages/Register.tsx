import React from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // Save registration logic here
    navigate("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
