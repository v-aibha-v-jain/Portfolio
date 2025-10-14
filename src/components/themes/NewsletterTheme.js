import React from 'react';
import workData from '../../data/work.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faCalendarAlt, faBuilding, faTags } from '@fortawesome/free-solid-svg-icons'

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
import email from '../../assets/images/email.png';
import task from '../../assets/images/task.png';

const NewsletterTheme = () => {
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
    'dsa.png': dsa,
    'email.png': email,
    'task.png': task
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
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="newsletter-theme-container">
      {/* Header Section */}
      <div className="newsletter-header">
        <h1 className="newsletter-title"></h1>
        <p className="newsletter-subtitle"></p>
      </div>

      {/* Timeline Grid */}
      <div className="timeline-grid">
        {timelineData.map((item, index) => (
          <div key={item.id} className="timeline-card" data-index={index}>
            {/* Card Image */}
            {item.bg && (
              <div 
                className="card-image" 
                style={{ 
                  backgroundImage: `url(${item.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top'
                }}
              />
            )}
            
            {/* Card Content */}
            <div className="card-content">
              {/* Date Badge */}
              <div className={`date-badge ${item.ongoing ? 'ongoing' : ''}`}>
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                <span>
                  {formatDate(item.startDate)} - {item.ongoing ? 'Present' : formatDate(item.endDate)}
                </span>
              </div>

              {/* Title and Company */}
              <h3 className="card-title">{item.title}</h3>
              <div className="card-company">
                <FontAwesomeIcon icon={faBuilding} className="icon" />
                <span>{item.company}</span>
              </div>

              {/* Description */}
              <p className="card-description">{item.description}</p>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="card-tags">
                  <FontAwesomeIcon icon={faTags} className="tags-icon" />
                  <div className="tags-list">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {item.link && item.link.length > 0 && (
                <div className="card-links">
                  {item.link.map((linkObj, linkIndex) => {
                    if (linkObj && typeof linkObj === 'object') {
                      return Object.entries(linkObj).map(([label, url], entryIndex) => (
                        <a
                          key={`${linkIndex}-${entryIndex}`}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                          <span>{label}</span>
                        </a>
                      ));
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsletterTheme;