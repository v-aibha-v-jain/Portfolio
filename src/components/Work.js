import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DayNightTheme from './themes/DayNightTheme';
import NewsletterTheme from './themes/NewsletterTheme';
import NotesTheme from './themes/NotesTheme';
import './Work.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import reactGA from 'react-ga4';

const Work = () => {


  useEffect(() => {
    reactGA.send({ hitType: "pageview", page: "/work", title: "Work Page" });
  }, []);

  const [currentTheme, setCurrentTheme] = useState('newsletter');

  const renderTheme = () => {
    switch (currentTheme) {
      case 'newsletter':
        return <NewsletterTheme />;
      case 'note':
        return <NotesTheme />;
      default:
        return <DayNightTheme />;
    }
  };

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setCurrentTheme(selectedTheme);
    reactGA.event({
      category: 'Interaction',
      action: 'Theme Switch',
      label: selectedTheme
    });
  };



  return (
    <div className={`work-page ${currentTheme}-theme`}>
      <Link 
        to="/" 
        className="back-btn"
        style={{
          position: 'fixed',
          top: '25px',
          left: '30px',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(30,30,30,0.85)',
          color: '#fff',
          padding: '10px 22px 10px 16px',
          borderRadius: '30px',
          fontSize: '1.1rem',
          fontWeight: 500,
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          transition: 'background 0.2s, color 0.2s, transform 0.2s',
          gap: '10px'
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </Link>

      <div id="themeSwitcher" style={{ position: 'fixed', top: '25px', right: '30px', zIndex: 201 }}>
        <select
          value={currentTheme}
          onChange={(e) => {
            setCurrentTheme(e.target.value);
            handleThemeChange(e);
          }}
          style={{
            padding: '8px 18px',
            borderRadius: '20px',
            fontSize: '1rem',
            background: '#fff',
            color: '#222',
            border: '1.5px solid #2196F3',
            fontWeight: 500,
            outline: 'none'
          }}
        >
          <option value="daynight">Days and Nights</option>
          <option value="newsletter">Newsletter</option>
          <option value="note">Notes</option>
        </select>
      </div>

      {renderTheme()}
    </div>
  );
};

export default Work;