import React from "react";
import { Link } from "react-router-dom";
import "./componet.css";
import logo from "../Assets/logo/logoType.jpg";
import menu from "../Assets/icons/menu.svg";
const Navbar = () => {
  function closeNav() {
    const navList = document.querySelector(".nav__list--touch-screen");
    navList.classList.add("moveTop");
  }
  function openNav() {
    const navList = document.querySelector(".nav__list--touch-screen");
    navList.classList.remove("moveTop");
  }
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-container__link">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <nav className="nav--computer">
        <ul className="nav__list">
          <li className="nav__item">
            <Link className="nav__link" to="/">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="login/teacher">
              Teacher
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/login/student">
              Student
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <nav className=" nav--touch-screen">
        <button onClick={openNav} className="nav__menu--oepn-button">
          <img src={menu} alt="menu icon" />
        </button>
        <ul className="moveTop nav__list--touch-screen">
          <li className="nav__item">
            <Link className="nav__link" to="/" onClick={closeNav}>
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/login/teacher" onClick={closeNav}>
              Teacher
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/login/student" onClick={closeNav}>
              Student
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/about" onClick={closeNav}>
              About
            </Link>
          </li>
          <button onClick={closeNav} className="button--close-nav">
            X
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
