import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      const users = JSON.parse(localStorage.getItem("users")) || {};
      if (users[email]) return alert("User already exists!");

      users[email] = { name, email, password, detailsCompleted: false };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered successfully! Please log in.");
      setIsRegister(false);
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || {};
      if (!users[email] || users[email].password !== password) {
        return alert("Invalid credentials!");
      }
      localStorage.setItem("loggedInUser", email);
      navigate(users[email].detailsCompleted ? "/dashboard" : "/user-details");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input className="w-full p-2 mb-2 border" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <input className="w-full p-2 mb-2 border" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full p-2 mb-2 border" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <button className="w-full bg-blue-500 text-white p-2 rounded">{isRegister ? "Register" : "Login"}</button>
        </form>

        <button className="mt-4 text-blue-500" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
