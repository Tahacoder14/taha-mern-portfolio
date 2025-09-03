// client/src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-card-bg">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-secondary-text mb-4">
            As An Accomplished Web And App Developer, I Have Dedicated The Past Three Years To Architecting And Building High-Performance Digital Experiences. From Intuitive Mobile Applications To Complex, Data-Driven Web Platforms, My Focus Has Always Been On Creating Solutions That Are Both Technically Excellent And Beautifully Simple For The End-User.
          </p>
          <p className="text-lg text-secondary-text">
            While I Am Proficient Across The Full Stack, My Curiosity Has Propelled Me Toward The Next Evolution Of Technology. I Am Currently Immersed In The Fascinating Worlds Of AI Agents And Robotics, Developing A Deep Understanding Of How To Engineer Intelligent Systems That Can Automate, Learn, And Interact With The World In Meaningful Ways. I Am Seeking Opportunities To Merge My Proven Expertise In Application Development With My Growing Knowledge In Artificial Intelligence, Creating Next-Generation Products That Are Not Just Functional, But Truly Cognitive And Autonomous.
          </p>
        </motion.div>
        <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* A cool abstract visual */}
            <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-primary rounded-full opacity-30 blur-2xl"></div>
                <div className="absolute top-10 left-10 w-60 h-60 border-2 border-primary rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-primary-variant rounded-full opacity-50"></div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;