import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import TeamLogo from "../../Assets/teamLogo.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiMenu, FiX } from 'react-icons/fi';

import "./Navbar.css";

function NavBar({userid, password}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="NavigationBar_Nav-navbar">
        <img
          src={TeamLogo}
          alt="teamlogo"
          style={{ height: "2.5rem", width: "6rem" }}
        />
      <ul
        className={
          open
            ? "NavigationBar_Nav-nav-links active"
            : "NavigationBar_Nav-nav-links"
        }
      >
        <li className="NavigationBar_Nav-nav-item">
          <Link
            to="/"
            className="NavigationBar_Nav-nav-link"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
        </li>
        <li className="NavigationBar_Nav-nav-item">
          <Link
            to={'/jobSection?username='+ userid +'&password=' + password}
            className="NavigationBar_Nav-nav-link"
            onClick={() => setOpen(false)}
          >
            Job section
          </Link>
        </li>
        <li className="NavigationBar_Nav-nav-item">
          <Link
            to={'/profile?username='+ userid +'&password=' + password}
            className="NavigationBar_Nav-nav-link"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
        </li>
        <li className="NavigationBar_Nav-nav-link"
        style={{cursor:'pointer'}}
            onClick={(e) => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              localStorage.removeItem("password");
              window.location.href = "/";
            }}
          >
            Logout 
             {/* <IoPersonCircleOutline/> */}
        </li>
      </ul>
      <div onClick={() => setOpen(!open)} className="NavigationBar_Nav-nav-icon">
                {open ? <FiX /> : <FiMenu />}
            </div>
    </nav>
  );
}

export default NavBar;
