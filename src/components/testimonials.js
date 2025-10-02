import React, { useState, useEffect } from "react";
import dp from "../assets/images/dsa.png"

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="testimonials" className="testimonials">
        <div className="container">
            <div className="section-header">
                <h2>Testimonials</h2>
                <div className="underline"></div>
            </div>
            <div className="testimonial-slider">
                <div 
                    className="testimonial-track" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    <div className="testimonial">
                        <div className="testimonial-content">
                            <div className="quote-icon">
                                <i className="fas fa-quote-left"></i>
                            </div>
                            <p>John is an exceptional developer who delivered our project on time and exceeded our expectations. His attention to detail and problem-solving skills are impressive.</p>
                            <div className="client-info">
                                <img src={dp} alt="Sarah Johnson" />
                                <div>
                                    <h4>Sarah Johnson</h4>
                                    <p>CEO, TechStart</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial">
                        <div className="testimonial-content">
                            <div className="quote-icon">
                                <i className="fas fa-quote-left"></i>
                            </div>
                            <p>Working with John was a pleasure. He understood our requirements perfectly and created a website that perfectly represents our brand. Highly recommended!</p>
                            <div className="client-info">
                                <img src={dp} alt="Michael Brown" />
                                <div>
                                    <h4>Michael Brown</h4>
                                    <p>Marketing Director, Innovate Inc.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial">
                        <div className="testimonial-content">
                            <div className="quote-icon">
                                <i className="fas fa-quote-left"></i>
                            </div>
                            <p>John's technical skills and creativity make him stand out. He not only built a functional website but also provided valuable suggestions to improve our user experience.</p>
                            <div className="client-info">
                                <img src={dp} alt="Sarah Johnson" />
                                <div>
                                    <h4>Emily Davis</h4>
                                    <p>Founder, Design Studio</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slider-controls">
                    <button className="prev-btn" onClick={prevSlide}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="slider-dots">
                        {[...Array(totalSlides)].map((_, index) => (
                            <span 
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></span>
                        ))}
                    </div>
                    <button className="next-btn" onClick={nextSlide}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Testimonials;