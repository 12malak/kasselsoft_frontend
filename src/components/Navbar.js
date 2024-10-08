import React, { useRef, useEffect, useState } from "react";
import "../Css/navbar.css";
import { Link, useLocation, useHistory, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  const navbarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const lang = location.pathname.split("/")[1] || "en"; // Get the language from the path, default to 'en'

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState(lang); // Default to English

  const handleSelection = (event) => {
    const newLang = event.target.value;
    setSelectedOption(newLang);
    setDropdownVisible(false);
    // Update the URL using React Router
    navigate(`/${newLang}`);
  };

  const getIconClass = () => {
    switch (selectedOption) {
      case "en":
        return "bi bi-globe2"; // Icon for English
      case "ar":
        return "bi bi-globe"; // Icon for French
      default:
        return "bi bi-globe2";
    }
  };

  const handleLinkClick = () => {
    if (navbarRef.current.classList.contains("show")) {
      navbarRef.current.classList.remove("show");
    }
     const navbarToggle = document.querySelector(".navbar-toggler");
  if (navbarToggle) {
    navbarToggle.click(); 
  }
  };

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbarRef.current.classList.add("navbar-shadow");
      } else {
        navbarRef.current.classList.remove("navbar-shadow");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top navbar-ltr"
      ref={navbarRef}
    >
      <div className="container-fluid ms-5 mt-4">
        {/* Logo on the left */}
        <div className="toggle_sm ">
          <Link to={`/${lang}`} className="navbar-brand">
            <img
              src={require("../assets/kassel_logo3.webp")}
              alt="logo ba9ma"
              className="logo_size img_icon_navbar"
            />
          </Link>

          {/* Toggle button for small screens */}
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Navigation items */}
        <div
          className={`collapse navbar-collapse justify-content-center ${
            lang === "ar" ? "rtl" : "ltr"
          }`}
          id="navbarSupportedContent"
          ref={navbarRef}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to={`/${lang}`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`${lang}/about`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "حول" : "About"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/${lang}/services`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "الخدمات" : "Services"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`${lang}/blogs`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "المدونة" : "Blog"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`${lang}/careers`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "الوظائف" : "Career"}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to={`${lang}/contact`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "اتصل بنا" : "Contact"}
              </Link>
            </li>
          </ul>
          <i className={getIconClass()} onClick={toggleDropdown}></i>
          <div
            className="dropdown-container border-none"
            onClick={toggleDropdown}
          >
            <div className="dropdown-wrapper">
              <select
                className="form-select small-select"
                value={selectedOption}
                onChange={handleSelection}
              >
                <option value="en">en</option>
                <option value="ar">ar</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
