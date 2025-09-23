import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImage from '../assets/images/profile.jpg';

const roles = ["Full Stack Developer.", "UI-UX Designer", "AI Agentic Expert."];

const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prevIndex => (prevIndex + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sentence = { /* ... animation variants ... */ };
  const letter = { /* ... animation variants ... */ };
  const handleDownloadCV = () => { /* ... download logic ... */ };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* --- Text Content --- */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.h1
            // THE FIX: More aggressive font scaling. Starts small, gets bigger.
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          >
            Hey I'm Taha.
            <br />
            I'm a{' '}
            {/* The height of this container is fixed to prevent layout shifts */}
            <span className="inline-block text-primary whitespace-nowrap h-[1.3em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  variants={sentence}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {roles[roleIndex].split("").map((char, index) => (
                    <motion.span key={char + "-" + index} variants={letter}>
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base sm:text-lg text-secondary-text mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
          >
            Building elegant and robust digital solutions from concept to deployment.
          </motion.p>
          
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="https://github.com/Tahacoder14" target="_blank" rel="noopener noreferrer"
              className="bg-primary text-white font-bold py-3 px-6 sm:px-8 rounded-full cursor-pointer hover:bg-primary-variant transition-all duration-300 text-center">
              View on GitHub
            </a>
            <button onClick={handleDownloadCV}
              className="bg-transparent border-2 border-primary text-primary font-bold py-3 px-6 sm:px-8 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
              Download CV
            </button>
          </motion.div>
        </div>

        {/* --- Image --- */}
        <motion.div
          className="flex justify-center order-1 lg:order-2"
          initial={{ opacity: 0.4, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3 }}
        >
          {/* Responsive image container size */}
          <div className="relative w-60 h-60 sm:w-80 sm:h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-xl animate-pulse"></div>
            <img src={profileImage} alt="Taha" className="relative w-full h-full object-cover rounded-full border-4 border-card-bg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;