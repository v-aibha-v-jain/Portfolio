import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
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
    if (window.location.hash === '#/work' || window.location.pathname.includes('/work')) {
      window.location.hash = '#/';
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection(sectionId);
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>Vaibhav<span>Jain</span></h1>
        </div>
        <nav>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="/#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
            <li><a href="/#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a></li>
            <li><a href="/#work" onClick={(e) => handleNavClick(e, 'work')}>Work</a></li>
            <li><a href="/#achievements" onClick={(e) => handleNavClick(e, 'achievements')}>Achievements</a></li>
            <li><a href="/#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a></li>
            <li><a href="/#certificates" onClick={(e) => handleNavClick(e, 'certificates')}>Certificates</a></li>
            <li><a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
          </ul>
          <div className="nav-controls">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); toggleTheme(); }}
              className="theme-toggle-btn"
              title={isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkTheme ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;