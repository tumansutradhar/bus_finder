import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("loggedInUser");

  if (!email) {
    navigate("/");
    return null;
  }

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[email] = { ...users[email], dob, phone, address, detailsCompleted: true };
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFEBCC] px-4">
      <div className="bg-[#FFF6E9] p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Complete Your Profile
        </h2>
        <div className="space-y-4">
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required min="1900-01-01" max={new Date().toISOString().split("T")[0]} className="w-full p-3 border rounded-lg bg-white shadow-sm" />
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full p-3 border rounded-lg  bg-white shadow-sm" />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full p-3 border rounded-lg bg-white shadow-sm" />
          <button onClick={handleSave} className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold transition hover:bg-green-600 active:bg-green-700 shadow-md cursor-pointer" >
            Save & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
