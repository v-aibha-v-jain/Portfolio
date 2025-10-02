import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId) => {
    // Check if we're on the correct page (home page)
    if (window.location.hash === '#/work' || window.location.pathname.includes('/work')) {
      // If on work page, navigate to home first
      window.location.hash = '#/';
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
    setIsDropdownOpen(false); // Close dropdown after clicking
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop event bubbling
    scrollToSection(sectionId);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>Vaibhav<span>Jain</span></h1>
        </div>
        <nav>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="/#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
            <li><a href="/#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
            <li><a href="/#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a></li>
            <li><a href="/#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a></li>
            <li><a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
            <li className={`portfolio-dropdown ${isDropdownOpen ? 'active' : ''}`}>
              <button type="button" onClick={(e) => { e.preventDefault(); toggleDropdown(); }} className="nav-button">
                More Portfolios <i className="fas fa-chevron-down"></i>
              </button>
              <div className="dropdown-content">
                <button type="button" onClick={(e) => { e.preventDefault(); toggleTheme(); setIsDropdownOpen(false); }} className="nav-button">
                  {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
                </button>
              </div>
            </li>
          </ul>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;