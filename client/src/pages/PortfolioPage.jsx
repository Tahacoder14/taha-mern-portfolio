// client/src/pages/PortfolioPage.jsx

import React, { useState, useEffect, Suspense } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Header from '../components/Header';

// Lazy load components
const Home = React.lazy(() => import('../components/Home'));
const About = React.lazy(() => import('../components/About'));
const Skills = React.lazy(() => import('../components/Skills'));
const Portfolio = React.lazy(() => import('../components/Portfolio'));
const Contact = React.lazy(() => import('../components/Contact'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
  </div>
);

const PortfolioPage = () => {
  const [init, setInit] = useState(false);
  
  // This useEffect now includes debugging logs
  useEffect(() => {
    console.log("PortfolioPage: Effect is running. Attempting to initialize particles...");

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      console.log("PortfolioPage: Particle engine initialized SUCCESSFULLY!");
      setInit(true);
    }).catch((error) => {
      console.error("PortfolioPage: FAILED to initialize particle engine.", error);
    });
  }, []);
  
 const particlesOptions = {
    background: {
        color: {
            value: "#121212",
        },
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "grab", // "grab" feels more interactive than "repulse"
            },
        },
        modes: {
            grab: {
                distance: 140,
                links: {
                    opacity: 0.5,
                }
            },
        },
    },
    particles: {
        color: {
            value: "#bb86fc", // Back to the vibrant primary color
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.3, // <-- INCREASED link opacity
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: true, // <-- Make movement random for a more organic feel
            speed: 1, // <-- INCREASED speed
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 50, // A few more particles for a fuller look
        },
        opacity: {
            value: 0.4, // <-- INCREASED particle opacity
        },
        shape: {
            type: "circle",
            // "triangle": { sides: 3
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
    detectRetina: true,
  };
  // Log to check if the component is trying to render
  console.log("PortfolioPage: Rendering component. Is initialized:", init);

  return (
    <div className="relative">
      {/* Background Animation Layer */}
      {init && <Particles id="tsparticles" options={particlesOptions} className="fixed inset-0 z-10" />}
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Header />
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <div id="home"><Home /></div>
            <div id="about"><About /></div>
            <div id="skills"><Skills /></div>
            <div id="portfolio"><Portfolio /></div>
            <div id="contact"><Contact /></div>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default PortfolioPage;