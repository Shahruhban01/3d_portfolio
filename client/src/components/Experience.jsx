import React from 'react';
import CameraController from './Navigation/CameraController';
import NavigationMenu from './Navigation/NavigationMenu';
import HeroZone from './zones/HeroZone';
import AboutZone from './zones/AboutZone';
import ProjectsZone from './zones/ProjectsZone';
import ExperienceZone from './zones/ExperienceZone';
import ContactZone from './zones/ContactZone';
import BlogZone from './zones/BlogZone';
import Particles3D from './effects/Particles3D';

// Zone positions in 3D space
const ZONE_POSITIONS = {
  hero: [0, 0, 0],
  about: [30, 0, 0],
  projects: [0, 0, -30],
  experience: [-30, 0, 0],
  contact: [0, 0, 30],
  blog: [30, 0, -30]
};

const Experience = () => {
  return (
    <>
      {/* Camera and Navigation System */}
      <CameraController zones={ZONE_POSITIONS} />
      
      {/* Floating 3D Navigation Menu */}
      <NavigationMenu zones={ZONE_POSITIONS} />
      
      {/* Background Particles */}
      <Particles3D count={3000} />
      
      {/* All 3D Zones */}
      <HeroZone position={ZONE_POSITIONS.hero} />
      <AboutZone position={ZONE_POSITIONS.about} />
      <ProjectsZone position={ZONE_POSITIONS.projects} />
      <ExperienceZone position={ZONE_POSITIONS.experience} />
      <ContactZone position={ZONE_POSITIONS.contact} />
      <BlogZone position={ZONE_POSITIONS.blog} />
    </>
  );
};

export default Experience;
