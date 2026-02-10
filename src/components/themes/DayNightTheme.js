import React, { useState, useEffect, useRef } from "react";
import workData from "../../data/work.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import dragImage from "../../assets/images/drag.png";
import moodyImage from "../../assets/images/moody.png";
import ttImage from "../../assets/images/tt.png";
import bubImage from "../../assets/images/bub.png";
import isonImage from "../../assets/images/ison.png";
import captImage from "../../assets/images/capt.png";
import clayartsImage from "../../assets/images/clayarts.png";
import duzoImage from "../../assets/images/duzo.png";
import aicteAiImage from "../../assets/images/aicte-ai.png";
import sihImage from "../../assets/images/sih-23.png";
import email from "../../assets/images/email.png";
import task from "../../assets/images/task.png";
import cli from "../../assets/images/cli.png";
import ddsa from "../../assets/images/ddsa.png";
import goto from "../../assets/images/goto.png";
import rpa from "../../assets/images/rpa.png";
import va from "../../assets/images/va.png";

const DayNightTheme = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const scrollCooldown = 1000;

  const imageMap = {
    "drag.png": dragImage,
    "moody.png": moodyImage,
    "tt.png": ttImage,
    "bub.png": bubImage,
    "ison.png": isonImage,
    "capt.png": captImage,
    "clayarts.png": clayartsImage,
    "duzo.png": duzoImage,
    "aicte-ai.png": aicteAiImage,
    "sih-23.png": sihImage,
    "email.png": email,
    "task.png": task,
    "cli.png": cli,
    "ddsa.png": ddsa,
    "goto.png": goto,
    "rpa.png": rpa,
    "va.png": va,
  };

  const timelineData = workData.timeline
    .map((item) => ({
      ...item,
      bg: item.bg && imageMap[item.bg] ? imageMap[item.bg] : item.bg,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      return dateB - dateA;
    });

  const formatDate = (dateString) => {
    if (dateString === "Present") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const handleScroll = (event) => {
    const now = Date.now();
    if (isScrolling || now - lastScrollTime.current < scrollCooldown) return;

    setIsScrolling(true);
    lastScrollTime.current = now;

    const direction = event.deltaY > 0 ? 1 : -1;
    let newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < timelineData.length) {
      setCurrentIndex(newIndex);
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  const handleTouchStart = (event) => {
    const target = event.target;
    const isInteractiveElement =
      target.tagName === "SELECT" ||
      target.tagName === "INPUT" ||
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("select") ||
      target.closest("input") ||
      target.closest("button") ||
      target.closest("a") ||
      target.closest(".nav-dot");

    touchStartY.current = event.touches[0].clientY;

    if (!isInteractiveElement) {
      event.preventDefault();
    }
  };

  const handleTouchMove = (event) => {
    const target = event.target;
    const isInteractiveElement =
      target.tagName === "SELECT" ||
      target.tagName === "INPUT" ||
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("select") ||
      target.closest("input") ||
      target.closest("button") ||
      target.closest("a") ||
      target.closest(".nav-dot");

    if (!isInteractiveElement) {
      event.preventDefault();
    }
  };

  const handleTouchEnd = (event) => {
    const target = event.target;
    const isInteractiveElement =
      target.tagName === "SELECT" ||
      target.tagName === "INPUT" ||
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("select") ||
      target.closest("input") ||
      target.closest("button") ||
      target.closest("a") ||
      target.closest(".nav-dot");

    touchEndY.current = event.changedTouches[0].clientY;

    const now = Date.now();
    if (isScrolling || now - lastScrollTime.current < scrollCooldown) return;

    const deltaY = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaY) > minSwipeDistance && !isInteractiveElement) {
      event.preventDefault();
      setIsScrolling(true);
      lastScrollTime.current = now;

      const direction = deltaY > 0 ? 1 : -1;
      let newIndex = currentIndex + direction;

      if (newIndex >= 0 && newIndex < timelineData.length) {
        setCurrentIndex(newIndex);
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  const goToSlide = (index) => {
    if (index < 0) index = 0;
    if (index >= timelineData.length) index = timelineData.length - 1;
    setCurrentIndex(index);
  };

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      );
    }
    return stars;
  };

  const updateDayNightCycle = () => {
    return currentIndex % 2 === 0 ? "day-sky" : "night-sky";
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  });

  return (
    <>
      <div
        className={`sky-container ${updateDayNightCycle()}`}
        id="skyContainer"
      >
        <div
          className={`sun-moon ${currentIndex % 2 === 0 ? "sun" : "moon"}`}
        />
        <div
          className="stars"
          style={{ opacity: currentIndex % 2 === 0 ? "0" : "1" }}
        >
          {createStars()}
        </div>
        <div
          className="cloud"
          style={{
            width: "100px",
            height: "30px",
            top: "30%",
            animationDuration: "60s",
          }}
        ></div>
        <div
          className="cloud"
          style={{
            width: "150px",
            height: "40px",
            top: "20%",
            animationDuration: "75s",
            animationDelay: "5s",
          }}
        ></div>
        <div
          className="cloud"
          style={{
            width: "120px",
            height: "35px",
            top: "40%",
            animationDuration: "45s",
            animationDelay: "10s",
          }}
        ></div>
      </div>

      <div
        className="progress-bar"
        style={{
          width: `${(currentIndex / (timelineData.length - 1)) * 100}%`,
        }}
      />

      <div className="timeline-container">
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className={`activity-slide ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <div className="activity-card">
              <span className={`date-badge ${item.ongoing ? "ongoing" : ""}`}>
                {formatDate(item.startDate)} -{" "}
                {item.ongoing ? "Present" : formatDate(item.endDate)}
              </span>
              <h2>{item.title}</h2>
              <div className="company">{item.company}</div>
              <p className="description">{item.description}</p>
              <div className="tags">
                {item.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {item.link && item.link.length > 0 && (
                <div style={{ marginTop: "10px", display: "flex" }}>
                  <div className="links">
                    {item.link.map((linkObj, linkIndex) => {
                      if (linkObj && typeof linkObj === "object") {
                        return Object.entries(linkObj).map(
                          ([label, url], entryIndex) => (
                            <a
                              key={`${linkIndex}-${entryIndex}`}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                            >
                              <FontAwesomeIcon icon={faExternalLinkAlt} />{" "}
                              {label}
                            </a>
                          )
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="timeline-nav">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`nav-dot ${index === currentIndex ? "active" : ""}`}
            data-title={item.title}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrows">
          <FontAwesomeIcon icon={faChevronUp} />
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <span>Scroll to navigate</span>
      </div>
    </>
  );
};

export default DayNightTheme;
