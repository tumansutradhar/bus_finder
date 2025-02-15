import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/account"); // Redirect to login page
  };

  return (
    <header className="bg-red-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Bus Management</h1>
      <nav>
        <Link className="mr-4" to="/">Home</Link>
        <Link className="mr-4" to="/account">Login</Link>
        <Link className="mr-4" to="/about">About</Link>
        <Link className="mr-4" to="/contact">Contact</Link>

        {/* Show Logout Button Only if User is Logged In */}
        {loggedInUser && (
          <button className="bg-red-700 px-4 py-2 rounded" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
