import React from 'react';
import workData from '../data/work.json';

const WorkExperience = () => {
    const targetCompanies = ['NEURICORN SYNDICATE', 'Duzo Kriton PVT LTD'];

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        if (Number.isNaN(date.getTime())) return dateStr;
        return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    };

    const workExperiences = workData.timeline
        .filter((item) => targetCompanies.includes(item.company))
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    return (
        <section id="work" className="work-experience">
            <div className="container">
                <div className="section-header">
                    <h2>Work Experience</h2>
                    <div className="underline"></div>
                </div>
                <div className="experience-grid">
                    {workExperiences.map((item) => (
                        <div key={`${item.title}-${item.company}`} className="experience-card">
                            <div className="experience-header">
                                <div>
                                    <h3>{item.title}</h3>
                                    <p className="experience-company">{item.company}</p>
                                </div>
                                <span className="experience-dates">
                                    {formatDate(item.startDate)} - {item.ongoing ? 'Present' : formatDate(item.endDate)}
                                </span>
                            </div>
                            <p className="experience-description">{item.description}</p>
                            {item.tags?.length > 0 && (
                                <div className="experience-tags">
                                    {item.tags.map((tag) => (
                                        <span key={`${item.title}-${tag}`} className="experience-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;
