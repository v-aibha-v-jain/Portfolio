import React from 'react';
import workData from '../../data/work.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faCalendarAlt, faBuilding, faTags } from '@fortawesome/free-solid-svg-icons'

import dragImage from '../../assets/images/drag.webp';
import moodyImage from '../../assets/images/moody.webp';
import ttImage from '../../assets/images/tt.webp';
import bubImage from '../../assets/images/bub.webp';
import isonImage from '../../assets/images/ison.webp';
import captImage from '../../assets/images/capt.webp';
import clayartsImage from '../../assets/images/clayarts.webp';
import duzoImage from '../../assets/images/duzo.webp';
import aicteAiImage from '../../assets/images/aicte-ai.webp';
import sihImage from '../../assets/images/sih-23.webp';
import dsa from '../../assets/images/dsa.webp';
import email from '../../assets/images/email.webp';
import task from '../../assets/images/task.webp';
import cli from "../../assets/images/cli.webp";
import ddsa from "../../assets/images/ddsa.webp";
import goto from "../../assets/images/goto.webp";
import rpa from "../../assets/images/rpa.webp";
import va from "../../assets/images/va.webp";

const NewsletterTheme = () => {
  const imageMap = {
    'drag.webp': dragImage,
    'moody.webp': moodyImage,
    'tt.webp': ttImage,
    'bub.webp': bubImage,
    'ison.webp': isonImage,
    'capt.webp': captImage,
    'clayarts.webp': clayartsImage,
    'duzo.webp': duzoImage,
    'aicte-ai.webp': aicteAiImage,
    'sih-23.webp': sihImage,
    'dsa.webp': dsa,
    'email.webp': email,
    'task.webp': task,
    'cli.webp': cli,
    'ddsa.webp': ddsa,
    'goto.webp': goto,
    'rpa.webp': rpa,
    'va.webp': va
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