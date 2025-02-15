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
    const users = JSON.parse(localStorage.getItem("users"));
    users[email] = { ...users[email], dob, phone, address, detailsCompleted: true };
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/dashboard");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Complete Your Profile</h2>
      <input className="w-full p-2 mb-2 border" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
      <input className="w-full p-2 mb-2 border" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input className="w-full p-2 mb-2 border" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <button className="w-full bg-green-500 text-white p-2 rounded" onClick={handleSave}>Save & Proceed</button>
    </div>
  );
};

export default UserDetails;
