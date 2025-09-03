import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImage from '../assets/images/profile.jpg';

const roles = ["Full Stack Developer.", "UI-UX Designer.", "AI Agentic Expert.","Social Media Manager.","Software Engineer."];

const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prevIndex => (prevIndex + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sentence = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Taha_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    // On mobile (default), it's a single column. On medium screens and up (md:), it's a two-column grid.
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* --- Text Content (Order 2 on mobile, Order 1 on desktop) --- */}
        <div className="text-center md:text-left order-2 md:order-1">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          >
            Hi, I'm Taha.
            <br />
            I'm a{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                variants={sentence}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="text-primary whitespace-nowrap"
              >
                {roles[roleIndex].split("").map((char, index) => (
                  <motion.span key={char + "-" + index} variants={letter}>
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </AnimatePresence>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-lg text-secondary-text mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building Elegant And Robust Digital Solutions From Concept To Deployment.
          </motion.p>
          
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="https://github.com/Tahacoder14" target="_blank" rel="noopener noreferrer"
              className="bg-gradient-to-r from-primary to-purple-600 text-white font-bold py-3 px-8 rounded-full cursor-pointer hover:bg-primary-variant transition-all duration-300 text-center">
              View on GitHub
            </a>
            <button onClick={handleDownloadCV}
              className="bg-transparent border-2 border-primary text-primary font-bold py-3 px-8 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
              Download CV
            </button>
          </motion.div>
        </div>

        {/* --- Image (Order 1 on mobile, Order 2 on desktop) --- */}
        <motion.div
          className="flex justify-center order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        >
          {/* Responsive image size */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-xl animate-pulse"></div>
            <img src={profileImage} alt="Taha" className="relative w-full h-full object-cover rounded-full border-4 border-card-bg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;