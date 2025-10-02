import React, { useState, useEffect, useRef } from 'react';
import workData from '../../data/work.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faExternalLinkAlt, faCalendarAlt, faBuilding, faTags } from '@fortawesome/free-solid-svg-icons'

// Import images
import dragImage from '../../assets/images/drag.png';
import moodyImage from '../../assets/images/moody.png';
import ttImage from '../../assets/images/tt.png';
import bubImage from '../../assets/images/bub.png';
import isonImage from '../../assets/images/ison.png';
import captImage from '../../assets/images/capt.png';
import clayartsImage from '../../assets/images/clayarts.png';
import duzoImage from '../../assets/images/duzo.png';
import aicteAiImage from '../../assets/images/aicte-ai.png';
import sihImage from '../../assets/images/sih-23.png';
import dsa from '../../assets/images/dsa.png';

const NotesTheme = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Map image names to imported images
  const imageMap = {
    'drag.png': dragImage,
    'moody.png': moodyImage,
    'tt.png': ttImage,
    'bub.png': bubImage,
    'ison.png': isonImage,
    'capt.png': captImage,
    'clayarts.png': clayartsImage,
    'duzo.png': duzoImage,
    'aicte-ai.png': aicteAiImage,
    'sih-23.png': sihImage,
    'dsa.png': dsa
  };

  // Process and sort timeline data
  const timelineData = workData.timeline
    .map(item => ({
      ...item,
      bg: item.bg && imageMap[item.bg] ? imageMap[item.bg] : item.bg
    }))
    .sort((a, b) => {
      // Convert dates to Date objects for comparison
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      // Sort in descending order (newest first)
      return dateB - dateA;
    });

  // Format date for display
  const formatDate = (dateString) => {
    if (dateString === 'Present') return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Navigate to next page
  const nextPage = () => {
    if (isAnimating || currentIndex >= timelineData.length - 1) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Navigate to previous page
  const prevPage = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Handle touch events for mobile
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX.current = event.changedTouches[0].clientX;
    
    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        nextPage(); // Swipe left = next page
      } else {
        prevPage(); // Swipe right = previous page
      }
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        prevPage();
      } else if (event.key === 'ArrowRight') {
        nextPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, isAnimating]);

  const currentItem = timelineData[currentIndex];

  return (
    <div 
      className="book-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Book Background */}
      <div className="book-background">
        <div className="book-spine"></div>
      </div>

      {/* Book Content */}
      <div className={`book-content ${isAnimating ? 'page-turning' : ''}`}>
        {/* Left Page - Image */}
        <div className="left-page">
          <div className="page-shadow"></div>
          <div className="page-content">
            {currentItem?.bg ? (
              <img 
                src={currentItem.bg}
                alt={currentItem.title}
                className="book-image"
              />
            ) : (
              <div className="book-image placeholder">
                <div className="placeholder-text">No Image</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Page - Content */}
        <div className="right-page">
          <div className="page-shadow"></div>
          <div className="page-content">
            <div className="book-header">
              <div className={`date-badge ${currentItem?.ongoing ? 'ongoing' : ''}`}>
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                <span>
                  {formatDate(currentItem?.startDate)} - {currentItem?.ongoing ? 'Present' : formatDate(currentItem?.endDate)}
                </span>
              </div>
            </div>

            <h2 className="book-title">{currentItem?.title}</h2>
            
            <div className="book-company">
              <FontAwesomeIcon icon={faBuilding} className="icon" />
              <span>{currentItem?.company}</span>
            </div>

            <p className="book-description">{currentItem?.description}</p>

            {currentItem?.tags && currentItem.tags.length > 0 && (
              <div className="book-tags">
                <FontAwesomeIcon icon={faTags} className="tags-icon" />
                <div className="tags-list">
                  {currentItem.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {currentItem?.link && currentItem.link.length > 0 && (
              <div className="book-links">
                {currentItem.link.map((linkObj, linkIndex) => {
                  if (linkObj && typeof linkObj === 'object') {
                    const entries = Object.entries(linkObj);
                    if (entries.length > 0) {
                      const [label, url] = entries[0];
                      return (
                        <a 
                          key={linkIndex}
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="book-link"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                          <span>{label}</span>
                        </a>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            )}

            <div className="page-number right">{currentIndex + 1}</div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        className={`nav-arrow left-arrow ${currentIndex === 0 ? 'disabled' : ''}`}
        onClick={prevPage}
        disabled={isAnimating || currentIndex === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      
      <button 
        className={`nav-arrow right-arrow ${currentIndex === timelineData.length - 1 ? 'disabled' : ''}`}
        onClick={nextPage}
        disabled={isAnimating || currentIndex === timelineData.length - 1}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      {/* Page Indicator */}
      <div className="page-indicator">
        <span className="current-page">{currentIndex + 1}</span>
        <span className="separator"> / </span>
        <span className="total-pages">{timelineData.length}</span>
      </div>
    </div>
  );
};

export default NotesTheme;