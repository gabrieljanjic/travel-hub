import { NavLink } from "react-router-dom";
import "../../index.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import { useState } from "react";
import Login from "./Login";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-div">
        <h2 className="logo">Travel Hub</h2>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i className={menuOpen ? "las la-times" : "las la-bars"}></i>
        </button>

        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/airports"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              Airports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/airlines"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              Airlines
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/routes"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              Routes
            </NavLink>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Login />
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
