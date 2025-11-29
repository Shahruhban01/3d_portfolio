import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CodeSphere from './canvas/CodeSphere';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const skills = [
    { name: 'JavaScript/React', level: 95 },
    { name: 'Node.js/Express', level: 90 },
    { name: 'Three.js/3D', level: 85 },
    { name: 'MongoDB/Databases', level: 88 },
    { name: 'Python/Django', level: 82 },
    { name: 'DevOps/Cloud', level: 78 }
  ];

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="about-content">
          {/* 3D Element */}
          <motion.div
            className="about-canvas"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Canvas dpr={[1, 1.5]}>
              <Suspense fallback={null}>
                <CodeSphere />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="about-description">
              I'm a passionate Software Engineer with 5+ years of experience building 
              scalable web applications and immersive 3D experiences. I specialize in 
              the MERN stack and have a deep love for creative coding and interactive design.
            </p>
            <p className="about-description">
              When I'm not coding, you'll find me exploring new technologies, contributing 
              to open-source projects, or experimenting with creative web animations.
            </p>

            {/* Skills */}
            <div className="skills-container">
              <h3 className="skills-title">Technical Skills</h3>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
