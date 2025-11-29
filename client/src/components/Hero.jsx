import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import FloatingCube from './canvas/FloatingCube';
import Stars from './canvas/Stars';

const Hero = () => {
  const handleDownloadCV = () => {
    // Replace with your actual CV link
    window.open('/path-to-your-cv.pdf', '_blank');
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      {/* 3D Canvas Background */}
      <div className="hero-canvas-container">
        <Canvas
          dpr={[1, 2]} // Limit pixel ratio for performance
          performance={{ min: 0.5 }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Suspense fallback={null}>
            <Stars />
            <FloatingCube />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-text"
        >
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Your Name</span>
          </h1>
          <h2 className="hero-subtitle">Software Engineer</h2>
          <p className="hero-description">
            I craft immersive digital experiences with cutting-edge technologies.
            Specializing in full-stack development, 3D web applications, and modern UI/UX.
          </p>
          
          <div className="hero-buttons">
            <motion.button
              className="btn btn-primary"
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
            <motion.button
              className="btn btn-outline"
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="scroll-arrow"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
