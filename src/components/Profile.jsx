// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!loggedInUser) {
//       navigate("/login"); // Redirect if not logged in
//     } else {
//       setUser(loggedInUser);
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.removeItem("loggedInUser");
//       navigate("/");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Welcome to Your Profile</h2>

//       {user ? (
//         <div>
//           <p className="text-gray-700">Hello, <strong>{user.name || "User"}</strong></p>
//           <p className="text-gray-500">{user.email || "No email provided"}</p>
//         </div>
//       ) : (
//         <p className="text-gray-500">Loading user data...</p>
//       )}

//       <button
//         className="mt-4 bg-red-500 text-white px-6 py-2 rounded shadow-lg hover:bg-red-600 transition"
//         onClick={handleLogout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Profile;
