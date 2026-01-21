import React from 'react';
import { motion } from 'framer-motion';
import {  FaEnvelope, FaPhone, FaMapMarkerAlt, } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="footer-logo">
              Lake<span className="logo-accent">.</span>
            </h3>
            <p className="footer-description">
              Professional web agency specializing in full-stack development, 
              SEO management, and content creation. Building digital excellence 
              for your business.
            </p>
            <div className="social-links">
             
            </div>
          </motion.div>

    

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
              </li>
              <li>
                <a href="#services" onClick={() => scrollToSection('services')}>Services</a>
              </li>
              <li>
                <a href="#booking" onClick={() => scrollToSection('booking')}>Book Now</a>
              </li>
              <li>
                <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="footer-title">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:ktkarumbaiah@gmail.com">ktkarumbaiah@gmail.com</a>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <a href="tel:+917019564975">+91 7019564975</a>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <a contact-iconhref="https://www.google.com/maps/search/?api=1&query=Bangalore+Karnataka" target="_blank" rel="noopener noreferrer">Bangalore Karnataka</a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            &copy; {currentYear} Lake Web Agency. All rights reserved.
            <br />
            <span className="owner-name">Lekhan Karumbaiah K.T.</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

