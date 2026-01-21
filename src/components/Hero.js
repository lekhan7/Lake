import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaChartLine, FaEdit } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            Welcome to <span className="gradient-text">Lake</span>
          </motion.h1>
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Professional Web Agency by <span className="highlight">Lekhan Karumbaiah K.T.</span>
          </motion.p>
          <motion.p className="hero-description" variants={itemVariants}>
            Building exceptional digital experiences with cutting-edge technology.
            From full-stack development to SEO optimization, we bring your vision to life.
          </motion.p>

          <motion.div className="hero-features" variants={itemVariants}>
            <div className="feature-item">
              <FaCode className="feature-icon" />
              <span>Full Stack Development</span>
            </div>
            <div className="feature-item">
              <FaRocket className="feature-icon" />
              <span>Website Solutions</span>
            </div>
            <div className="feature-item">
              <FaChartLine className="feature-icon" />
              <span>SEO Management</span>
            </div>
            <div className="feature-item">
              <FaEdit className="feature-icon" />
              <span>Content Management</span>
            </div>
          </motion.div>

          <motion.div className="hero-cta" variants={itemVariants}>
            <motion.button
              onClick={() => scrollToSection('booking')}
              className="cta-button primary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="floating-card card-1">
            <div className="card-glow"></div>
            <img src="/service1.png" alt="Service 1" className="service-image" />
          </div>
          <div className="floating-card card-2">
            <div className="card-glow"></div>
            <img src="/service2.png" alt="Service 2" className="service-image" />
          </div>
          <div className="floating-card card-3">
            <div className="card-glow"></div>
            <img src="/service3.png" alt="Service 3" className="service-image" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

