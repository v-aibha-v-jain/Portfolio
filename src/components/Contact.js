import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: new Date(),
        type: 'contact'
      });
      
      setSubmitMessage('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitMessage('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await addDoc(collection(db, 'newsletter'), {
        email: newsletterEmail,
        timestamp: new Date(),
        type: 'newsletter'
      });
      
      setNewsletterEmail('');
      alert('Successfully subscribed to newsletter!');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('Error subscribing. Please try again.');
    }
  };

  return (
    <>
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Contact Me</h2>
            <div className="underline"></div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Location</h4>
                    <p>Bangalore, Karnataka, India</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email</h4>
                    <p>vaibhavjain.vjv@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-globe"></i>
                  <div>
                    <h4>Website</h4>
                    <a href="https://vaibhav-jain.me">Portfolio</a>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href="https://x.com/why_bhav_v"><i className="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/whybhav_o_o/"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/vaibhavjain-/"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://github.com/v-aibha-v-jain"><i className="fab fa-github"></i></a>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send Me a Message</h3>
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message" 
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitMessage && <p className="submit-message">{submitMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>Vaibhav<span>Jain</span></h2>
              <p>Full Stack Developer</p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h3>Newsletter</h3>
              <p>Subscribe to my newsletter for updates</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your Email" 
                  required 
                />
                <button type="submit"><i className="fas fa-paper-plane"></i></button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;