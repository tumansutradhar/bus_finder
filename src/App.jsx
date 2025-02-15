import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import AuthPage from "./components/AuthPage";
import UserDetails from "./components/UserDetails";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/account" element={<AuthPage />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
