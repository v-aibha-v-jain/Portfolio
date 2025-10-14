import React, { useState } from 'react';
import clayartsImage from '../assets/images/clayarts.png';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Agent-task-manager',
      description: 'MERN stack application with JWT authentication and automated CSV/Excel task processing',
      image: 'https://github-readme-stats.vercel.app/api/pin/?username=v-aibha-v-jain&repo=agent-task-manager&theme=radical',
      categories: ['web', 'js', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/agent-task-manager.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 2,
      title: 'Email-classifier',
      description: 'Next.js/React app integrating Gmail API with OpenAI GPT-4o for email categorization',
      image: 'https://github-readme-stats.vercel.app/api/pin/?username=v-aibha-v-jain&repo=email-classifier&theme=radical',
      categories: ['web', 'js', 'ml'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/email-classifier.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 3,
      title: 'drag_drop_swipe | draggrid',
      description: 'Open Source, Drag, Drop and Swipe node module',
      image: 'https://github-readme-stats.vercel.app/api/pin/?username=v-aibha-v-jain&repo=drag_drop_swipe&theme=radical',
      categories: ['opensource', 'js', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/drag_drop_swipe.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 4,
      title: 'Clayarts',
      description: 'Freelance, Web Development',
      image: clayartsImage,
      categories: ['web', 'js', 'ui'],
      links: [
        { url: 'https://clayarts.co', text: 'Website' }
      ]
    },
    {
      id: 5,
      title: 'University Time-table generator',
      description: 'Academic project',
      image: 'https://github-readme-stats.vercel.app/api/pin/?username=v-aibha-v-jain&repo=TimeTable-generator-MiniProject&theme=radical',
      categories: ['web', 'js', 'ml', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/TimeTable-generator-MiniProject.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 6,
      title: 'MoodyAiBot',
      description: 'Personal project, Mood-based AI Chatbot',
      image: 'https://github-readme-stats.vercel.app/api/pin/?username=v-aibha-v-jain&repo=MoodyAiBot&theme=radical',
      categories: ['web', 'js', 'ml'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/MoodyAiBot.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 7,
      title: 'ForkTheCaptcha',
      description: 'Open Source, CAPTCHA, Web Security',
      image: 'https://github-readme-stats.vercel.app/api/pin/?username=v-aibha-v-jain&repo=ForkTheCaptcha&theme=radical',
      categories: ['opensource', 'web', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/ForkTheCaptcha.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 8,
      title: 'elcostra',
      description: 'Open Source, Web App, Json view',
      image: 'https://github-readme-stats.vercel.app/api/pin/?username=v-aibha-v-jain&repo=elcostra&theme=radical',
      categories: ['web', 'ui', 'opensource'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/elcostra.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 9,
      title: 'Hospital Management System',
      description: 'Bubble-no code website',
      image: 'https://github-readme-stats.vercel.app/api/pin/?username=v-aibha-v-jain&repo=HOSPITAL-MANAGEMENT-SYSTEM&theme=radical',
      categories: ['web'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/HOSPITAL-MANAGEMENT-SYSTEM.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 10,
      title: 'Fruit Database Analysis',
      description: 'Python, Machine Learning, Exploratory Data Analysis, Streamlit App',
      image: 'https://github-readme-stats.vercel.app/api/pin/?username=v-aibha-v-jain&repo=FRUIT_DATABASE_EDA_AND_ML_WITH_APP.&theme=radical',
      categories: ['ml', 'app'],
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