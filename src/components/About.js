import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaAward, FaLightbulb, FaHeart } from 'react-icons/fa';

const About = () => {
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

  const values = [
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "Cutting-edge solutions with modern technologies"
    },
    {
      icon: FaHeart,
      title: "Passion",
      description: "Dedicated to creating exceptional digital experiences"
    },
    {
      icon: FaUsers,
      title: "Collaboration",
      description: "Working closely with clients to achieve their vision"
    },
    {
      icon: FaAward,
      title: "Excellence",
      description: "Committed to delivering high-quality results"
    }
  ];

  const skills = [
    { name: "Full Stack Development", level: 95 },
    { name: "React & JavaScript", level: 90 },
    { name: "UI/UX Design", level: 85 },
    { name: "SEO Optimization", level: 88 },
    { name: "Content Management", level: 82 },
    { name: "Database Design", level: 87 }
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        {/* Header */}
        <motion.div
          className="about-header"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="about-title" variants={itemVariants}>
            About <span className="gradient-text">Lake Agency</span>
          </motion.h1>
          <motion.p className="about-subtitle" variants={itemVariants}>
            Crafting Digital Excellence Since 2024
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="about-content">
          {/* Story Section */}
          <motion.div
            className="about-story"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="story-text" variants={itemVariants}>
              <h2>Our Story</h2>
              <p>
                Welcome to Lake Agency, where innovation meets creativity. Founded by 
                <span className="highlight"> Lekhan Karumbaiah K.T.</span>, we are a 
                passionate team of developers and designers dedicated to transforming 
                your digital vision into reality.
              </p>
              <p>
                What started as a passion project has grown into a full-service web 
                agency, helping businesses establish their online presence with 
                cutting-edge technology and stunning design.
              </p>
              <p>
                We believe in the power of great design and robust functionality, 
                working tirelessly to deliver solutions that not only look amazing 
                but also drive real results for our clients.
              </p>
            </motion.div>
            
            <motion.div className="story-visual" variants={itemVariants}>
              <div className="about-logo-container">
                <img src="/cover.png" alt="Lake Agency" className="about-logo" />
                <div className="logo-glow"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            className="mission-vision"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="mission-card" variants={itemVariants}>
              <div className="card-icon">
                <FaRocket />
              </div>
              <h3>Our Mission</h3>
              <p>
                To empower businesses with exceptional digital solutions that 
                drive growth, enhance user experience, and create lasting impact 
                in the digital landscape.
              </p>
            </motion.div>

            <motion.div className="vision-card" variants={itemVariants}>
              <div className="card-icon">
                <FaLightbulb />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the leading digital agency known for innovation, creativity, 
                and delivering transformative web experiences that exceed expectations.
              </p>
            </motion.div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            className="values-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 className="section-title" variants={itemVariants}>
              Core Values
            </motion.h2>
            <div className="values-grid">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    className="value-card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="value-icon">
                      <Icon />
                    </div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="skills-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 className="section-title" variants={itemVariants}>
              Our Expertise
            </motion.h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-item"
                  variants={itemVariants}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="stats-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="stat-item" variants={itemVariants}>
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects Completed</div>
            </motion.div>
         
            <motion.div className="stat-item" variants={itemVariants}>
              <div className="stat-number">2</div>
              <div className="stat-label">Years Experience</div>
            </motion.div>
            <motion.div className="stat-item" variants={itemVariants}>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
