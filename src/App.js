import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Works from './components/Works';
import Booking from './components/Booking';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const loadingWords = ["Lake", "Agency", "Digital", "Creative", "Innovation"];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateX: 90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 1.2,
      rotateX: -90,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      }
    },
  };

  const finalWordVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 2,
      rotate: 180,
      transition: {
        duration: 0.6,
        ease: "easeIn",
      }
    },
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            className="loading-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="loading-container">
              <div className="loading-words">
                {loadingWords.map((word, index) => (
                  <motion.span
                    key={word}
                    className="loading-word"
                    variants={wordVariants}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="final-logo"
                variants={finalWordVariants}
              >
                <img src="/cover.png" alt="Lake Agency" className="loading-logo-image" />
                <h1 className="loading-title">Lake Agency</h1>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />
            <Hero />
            <Services />
            <Works />
            <Booking />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

