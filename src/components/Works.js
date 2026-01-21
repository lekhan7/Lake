import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt,FaMobile, FaDesktop, FaGlobe } from 'react-icons/fa';
import './Works.css';

const Works = () => {
  const projects = [
    {
      id: 1,
      title: "Bunk Brain",
      category: "Web Development",
      description: "A modern Educational website using AI integrations",
      image: "/service1.png",
      technologies: ["React", "Node.js", "MongoDB", "AI/ML"],
      type: "web",
      liveUrl: "https://bunk-brain.pages.dev/",
    },
    {
      id: 2,
      title: "Snap Scholar",
      category: "Website",
      description: "Educational website developed by Lake agency",
      image: "/service2.png",
      technologies: ["React", "Firebase", "Redux", "Node.js"],
      type: "web",
      liveUrl: "",
    },
    {
      id: 3,
      title: "Portfolio",
      category: "Website",
      description: "Portfolio Build by Lake",
      image: "/service3.png",
      technologies: ["React",  "Express", "MongoDB"],
      type: "web",
      liveUrl: "https://lekhan-port-folio.vercel.app/",
    },
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'mobile':
        return <FaMobile />;
      case 'web':
        return <FaDesktop />;
      default:
        return <FaGlobe />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="works" className="works">
      <div className="works-container">
        <motion.div
          className="works-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="works-title">
            Our <span className="gradient-text">Works</span>
          </h2>
          <p className="works-subtitle">
            Explore our portfolio of innovative digital solutions
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="project-image-container">
                <div className="project-type-icon">
                  {getTypeIcon(project.type)}
                </div>
                <div className={`project-image ${project.image}`}>
                  <div className="image-overlay"></div>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-links">
                  <a href={project.liveUrl} className="project-link primary">
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="works-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="cta-title">Have a project in mind?</h3>
          <p className="cta-description">
            Let's collaborate and bring your ideas to life with our expertise
          </p>
          <a href="#booking" className="cta-button">
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Works;
