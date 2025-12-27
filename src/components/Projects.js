import React, { useState } from 'react';
import gotoImage from '../assets/repos/goto.png';
import dsaImage from '../assets/repos/dsa.png';
import cliImage from '../assets/repos/cli.png';
import vaImage from '../assets/repos/va.png';
import agentImage from '../assets/repos/agent.png';
import mailImage from '../assets/repos/mail.png';
import ddsImage from '../assets/repos/dds.png';
import clayartsImage from '../assets/repos/clayarts.png';
import ttImage from '../assets/repos/tt.png';
import moodImage from '../assets/repos/mood.png';
import captchaImage from '../assets/repos/captcha.png';
import elcostraImage from '../assets/repos/elcostra.png';
import hospitalImage from '../assets/repos/hospital.png';
import mlImage from '../assets/repos/ml.png';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'GoTo',
      description: 'Browser extension for quick navigation and shortcuts',
      image: gotoImage,
      categories: ['opensource', 'web', 'ui', 'js'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/GoTo', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 2,
      title: 'DecodeDsa',
      description: 'Open source contribution, visualize DSA problems and solutions',
      image: dsaImage,
      categories: ['opensource', 'web', 'js', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/DecodeDsa', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 3,
      title: 'CLIBrowser',
      description: 'Browser extension with a terminal-style interface',
      image: cliImage,
      categories: ['web', 'ui', 'js'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/clibrowser', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 4,
      title: 'VA-task-executor',
      description: 'Desktop voice assistant that listens and executes commands (open app/file/folder/url, read files, etc.)',
      image: vaImage,
      categories: ['app', 'ml', 'py'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/VA-task-executor', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 5,
      title: 'Agent-task-manager',
      description: 'MERN stack application with JWT authentication and automated CSV/Excel task processing',
      image: agentImage,
      categories: ['web', 'js', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/agent-task-manager.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 6,
      title: 'Email-classifier',
      description: 'Next.js/React app integrating Gmail API with OpenAI GPT-4o for email categorization',
      image: mailImage,
      categories: ['web', 'js', 'ml'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/email-classifier.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 7,
      title: 'drag_drop_swipe | draggrid',
      description: 'Open Source, Drag, Drop and Swipe node module',
      image: ddsImage,
      categories: ['opensource', 'js', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/drag_drop_swipe.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 8,
      title: 'Clayarts',
      description: 'Freelance, Web Development',
      image: clayartsImage,
      categories: ['web', 'js', 'ui'],
      links: [
        { url: 'https://clayarts.co', text: 'Website' }
      ]
    },
    {
      id: 9,
      title: 'University Time-table generator',
      description: 'Academic project',
      image: ttImage,
      categories: ['web', 'js', 'ml', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/TimeTable-generator-MiniProject.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 10,
      title: 'MoodyAiBot',
      description: 'Personal project, Mood-based AI Chatbot',
      image: moodImage,
      categories: ['web', 'js', 'ml', 'py'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/MoodyAiBot.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 11,
      title: 'ForkTheCaptcha',
      description: 'Open Source, CAPTCHA, Web Security',
      image: captchaImage,
      categories: ['opensource', 'web', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/ForkTheCaptcha.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 12,
      title: 'elcostra',
      description: 'Open Source, Web App, Json view',
      image: elcostraImage,
      categories: ['web', 'ui', 'opensource'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/elcostra.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 13,
      title: 'Hospital Management System',
      description: 'Bubble-no code website',
      image: hospitalImage,
      categories: ['web'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/HOSPITAL-MANAGEMENT-SYSTEM.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 14,
      title: 'Fruit Database Analysis',
      description: 'Python, Machine Learning, Exploratory Data Analysis, Streamlit App',
      image: mlImage,
      categories: ['ml', 'app', 'py'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/FRUIT_DATABASE_EDA_AND_ML_WITH_APP..git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    }
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'web', label: 'Web' },
    { key: 'app', label: 'App' },
    { key: 'js', label: 'JavaScript' },
    { key: 'py', label: 'Python' },
    { key: 'ui', label: 'UI/UX' },
    { key: 'ml', label: 'AI-ML' },
    { key: 'opensource', label: 'Open Source Contribution' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2>My Projects</h2>
          <div className="underline"></div>
        </div>
        <div className="project-filters">
          {filters.map(filter => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="project-item"
              data-category={project.categories.join(' ')}
            >
              <div className="project-img">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-links">
                      {project.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="btn-small"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.icon && <i className={link.icon}></i>} {link.text}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;