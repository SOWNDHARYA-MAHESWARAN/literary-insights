import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/Logo.jpeg";
import { MdOutlineMenu } from "react-icons/md";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setAuthUser(user ? user : null);
    });

    return () => {
      listen();
    };
  }, []);

  const handleNavbar = () => setToggleMenu(!toggleMenu);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-content flex">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/" className="navbar-brand flex">
            <img src={logo} alt="site logo" />
            <span className="text-uppercase fw-7 fs-24 ls-1">BookDash</span>
          </Link>
          <button
            type="button"
            className="navbar-toggler-btn"
            onClick={handleNavbar}
          >
            <MdOutlineMenu
              size={35}
              style={{
                color: `${toggleMenu ? "#fff" : "#010101"}`,
              }}
            />
          </button>
        </div>

        <div
          className={
            toggleMenu
              ? "navbar-collapse show-navbar-collapse"
              : "navbar-collapse"
          }
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              {authUser ? (
                <button
                  onClick={userSignOut}
                  className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
                >
                  Login/Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
