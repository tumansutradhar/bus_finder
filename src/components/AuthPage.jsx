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
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (isRegister) {
      if (users[email]) return alert("User already exists!");
      users[email] = { name, email, password, detailsCompleted: false };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered successfully! Please log in.");
      setIsRegister(false);
    } else {
      if (!users[email] || users[email].password !== password) {
        return alert("Invalid credentials!");
      }
      localStorage.setItem("loggedInUser", email);
      navigate(users[email].detailsCompleted ? "/dashboard" : "/user-details");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFEBCC] px-4">
      <div className="bg-[#FFF6E9] p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border rounded-lg focus:ring-2 bg-white focus:ring-blue-400" />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border rounded-lg focus:ring-2 bg-white focus:ring-blue-400" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border rounded-lg focus:ring-2 bg-white focus:ring-blue-400" />
          <button type="submit" className="w-full cursor-pointer bg-blue-500 text-white p-3 rounded-lg font-semibold transition hover:bg-blue-600 active:bg-blue-700" >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <button className="mt-4 cursor-pointer w-full text-center text-blue-500 hover:underline" onClick={() => setIsRegister(!isRegister)} >
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
