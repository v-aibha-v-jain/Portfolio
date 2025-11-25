import React from 'react';

const Skills = () => {
  const programmingSkills = [
    { name: 'Web Development', icon: 'fas fa-code', percentage: 95 },
    { name: 'MERN', icon: 'fab fa-react', percentage: 80 },
    { name: 'PHP', icon: 'fab fa-php', percentage: 90 },
    { name: 'Machine Learning', icon: 'fas fa-robot', percentage: 60 },
    { name: 'Python', icon: 'fab fa-python', percentage: 75 },
    { name: 'DBMS', icon: 'fas fa-database', percentage: 80 },
    { name: 'Automation', icon: 'fas fa-cogs', percentage: 70 },
    { name: 'C/C++', icon: 'fas fa-code-branch', percentage: 60 },
    { name: 'Java', icon: 'fab fa-java', percentage: 50 }
  ];

  const otherSkills = [
    { name: 'Git', icon: 'fab fa-git-alt', percentage: 90 },
    { name: 'Cloud Computing', icon: 'fas fa-cloud', percentage: 75 },
    { name: 'UI/UX', icon: 'fas fa-mobile-alt', percentage: 85 },
    { name: 'Figma', icon: 'fas fa-paint-brush', percentage: 85 },
    { name: 'Linux', icon: 'fab fa-linux', percentage: 65 }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <h2>My Skills</h2>
          <div className="underline"></div>
        </div>
        <div className="skills-content">
          <div className="skill-category">
            <h3>Programming Skills</h3>
            <div className="skills-grid">
              {programmingSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-icon">
                    <i className={skill.icon}></i>
                  </div>
                  <h4>{skill.name}</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${skill.percentage}%` }}></div>
                  </div>
                  <span>{skill.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3>Other Skills</h3>
            <div className="skills-grid">
              {otherSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-icon">
                    <i className={skill.icon}></i>
                  </div>
                  <h4>{skill.name}</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${skill.percentage}%` }}></div>
                  </div>
                  <span>{skill.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;