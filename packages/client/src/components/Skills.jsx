// client/src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt, FaPython, FaLaravel } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiExpress, SiMysql, SiFlutter, SiFirebase } from 'react-icons/si';
import { FiFigma } from 'react-icons/fi';

const skills = [
  { icon: <FaHtml5 />, name: 'HTML5' },
  { icon: <FaCss3Alt />, name: 'CSS3' },
  { icon: <FaJsSquare />, name: 'JavaScript' },
  { icon: <FaReact />, name: 'React' },
  { icon: <FaNodeJs />, name: 'Node.js' },
  { icon: <SiExpress />, name: 'Express' },
  { icon: <SiMongodb />, name: 'MongoDB' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
  { icon: <FaGitAlt />, name: 'Git' },
    { icon: <SiMysql />, name: 'MySql' },
        { icon: <FaPython />, name: 'Python' },
    { icon: <FaLaravel />, name: 'Laravel' },
        { icon: <SiFlutter />, name: 'Flutter' },
    { icon: <SiFirebase />, name: 'Firebase' },
    { icon: <FiFigma />, name: 'Figma' },


];

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technologies I Use
        </motion.h2>
        <motion.div
          className="grid grid-cols-3 md:grid-cols-5 gap-8 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-card-bg rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <div className="text-5xl text-primary">{skill.icon}</div>
              <p className="mt-2 text-secondary-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;