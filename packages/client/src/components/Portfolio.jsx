// client/src/components/Portfolio.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// Define the categories that will be displayed as filter buttons
const categories = ['All', 'Website', 'AI Agentic', 'UI/UX'];

const Portfolio = () => {
  // State for all projects fetched from the backend
  const [projects, setProjects] = useState([]);
  // State for the projects that are currently visible after filtering
  const [filteredProjects, setFilteredProjects] = useState([]);
  // State to track the currently active category filter
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch projects from the backend when the component mounts
   useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects'); // Use relative path
        setProjects(data.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []); // This hook runs only once to fetch data

  // CORRECTED: This hook now correctly includes `projects` in its dependency array.
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  return (
    // The main section container. Transparent background to see the particles.
    <section className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Work
        </motion.h2>

        {/* Category Filter Buttons */}
        <div className="flex justify-center items-center flex-wrap gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative font-medium py-2 px-5 rounded-full transition-colors duration-300 ${
                activeCategory === category ? 'text-white' : 'text-secondary-text hover:text-light-text'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="active-pill" // This ID links the animation between buttons
                  className="absolute inset-0 bg-primary rounded-full"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Animated Project Grid */}
        <motion.div
          layout // This prop enables the cool re-ordering animation
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout // Ensures smooth transition when items re-order
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="bg-card-bg rounded-lg overflow-hidden shadow-lg group flex flex-col"
              >
                <div className="overflow-hidden">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
                  <p className="mt-2 text-secondary-text flex-grow">{project.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold bg-dark-bg text-primary py-1 px-3 rounded-full">{project.category}</span>
                    <div className="flex items-center space-x-4">
                      {project.repoUrl && (
                         <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary transition-colors"><FiGithub size={24} /></a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary transition-colors"><FiExternalLink size={24} /></a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;