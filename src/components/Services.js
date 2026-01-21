import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaFire, FaSearch, FaEdit, FaCheckCircle } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <FaCode />,
      title: 'Full Stack Website Development',
      description: 'Complete web solutions from frontend to backend. We build scalable, modern applications using the latest technologies.',
      features: ['React, Node.js, Python', 'Database Design', 'API Development', 'Responsive Design']
    },
    {
      icon: <FaFire />,
      title: 'Website Burning',
      description: 'Secure website removal and deletion services. We help you properly decommission websites while maintaining data security.',
      features: ['Secure Deletion', 'Data Backup', 'Domain Cleanup', 'Complete Removal']
    },
    {
      icon: <FaSearch />,
      title: 'SEO Management',
      description: 'Boost your online visibility with our comprehensive SEO services. Get ranked higher and drive organic traffic.',
      features: ['Keyword Research', 'On-Page SEO', 'Link Building', 'Analytics & Reporting']
    },
    {
      icon: <FaEdit />,
      title: 'Content Management',
      description: 'Professional content creation and management. Keep your website fresh and engaging with quality content.',
      features: ['Content Strategy', 'Blog Writing', 'Social Media Content', 'Content Updates']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="services" className="services">
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive web solutions tailored to your needs
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="service-icon-wrapper">
                <div className="service-icon">{service.icon}</div>
                <div className="icon-glow"></div>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <FaCheckCircle className="feature-check" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

