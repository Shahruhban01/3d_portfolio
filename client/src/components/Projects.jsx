import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchProjects } from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section projects-section">
        <div className="container">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Projects</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Here are some of my recent works and side projects
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="project-image-container">
                <img 
                  src={project.imageUrl || '/placeholder-project.jpg'} 
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link-btn"
                      >
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link-btn"
                      >
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.techStack && project.techStack.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
