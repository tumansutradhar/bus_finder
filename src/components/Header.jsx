import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/account");
    setMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-[#FFF6E9] fixed top-0 left-0 w-full z-50 shadow-md flex justify-between items-center py-5 px-6">
      <Link to="/" className="text-xl font-medium z-50">Bus Find</Link>
      <div className={`fixed inset-0 bg-[#FFF6E9] flex flex-col items-center justify-center transition-all ${menuOpen ? "flex" : "hidden md:flex md:relative md:bg-transparent md:p-0 md:inset-auto"}`}>
        <nav className="flex flex-col items-center gap-4 sm:flex-row md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 text-black">
          <Link to="/" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <button className="hover:text-gray-600" onClick={() => scrollToSection("about")}>About</button>
          <button className="hover:text-gray-600" onClick={() => scrollToSection("contact")}>Contact</button>
          <Link to="/account" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Login</Link>
          {loggedInUser && (
            <button className="bg-red-700 px-4 py-2 rounded mt-2 sm:mt-0" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
      <button className="md:hidden z-50 text-black" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "Close" : "Menu"}
      </button>
    </header>
  );
};

export default Header;
