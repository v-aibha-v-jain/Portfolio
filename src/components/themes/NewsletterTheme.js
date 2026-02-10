import React from 'react';
import workData from '../../data/work.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faCalendarAlt, faBuilding, faTags } from '@fortawesome/free-solid-svg-icons'

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
import cli from "../../assets/images/cli.png";
import ddsa from "../../assets/images/ddsa.png";
import goto from "../../assets/images/goto.png";
import rpa from "../../assets/images/rpa.png";
import va from "../../assets/images/va.png";

const NewsletterTheme = () => {
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
    'task.png': task,
    'cli.png': cli,
    'ddsa.png': ddsa,
    'goto.png': goto,
    'rpa.png': rpa,
    'va.png': va
  };

  const timelineData = workData.timeline
    .map(item => ({
      ...item,
      bg: item.bg && imageMap[item.bg] ? imageMap[item.bg] : item.bg
    }))
    .sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      return dateB - dateA;
    });

  const formatDate = (dateString) => {
    if (dateString === 'Present') return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="newsletter-theme-container">
      <div className="timeline-grid">
        {timelineData.map((item, index) => (
          <div key={item.id} className="timeline-card" data-index={index}>
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
            
            <div className="card-content">
              <div className={`date-badge ${item.ongoing ? 'ongoing' : ''}`}>
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                <span>
                  {formatDate(item.startDate)} - {item.ongoing ? 'Present' : formatDate(item.endDate)}
                </span>
              </div>

              <h3 className="card-title">{item.title}</h3>
              <div className="card-company">
                <FontAwesomeIcon icon={faBuilding} className="icon" />
                <span>{item.company}</span>
              </div>

              <p className="card-description">{item.description}</p>

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