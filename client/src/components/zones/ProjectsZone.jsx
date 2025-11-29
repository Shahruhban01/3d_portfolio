import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../../utils/api';
import Text3D from '../ui3d/Text3D';
import Card3D from '../ui3d/Card3D';
import Portal3D from '../ui3d/Portal3D';

const ProjectsZone = ({ position }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const navigateToZone = (zone) => {
    window.dispatchEvent(new CustomEvent('navigateToZone', { detail: { zone } }));
  };

  const handleProjectClick = (project) => {
    console.log('Project clicked:', project);
    if (project.liveLink) {
      window.open(project.liveLink, '_blank');
    }
  };

  return (
    <group position={position}>
      {/* Title */}
      <Text3D
        position={[0, 6, 0]}
        size={0.6}
        color="#ff006e"
        emissive="#ff006e"
      >
        PROJECTS
      </Text3D>

      {/* Project Gallery - 3D Cards */}
      {!loading && projects.length > 0 ? (
        <group position={[0, 2, 0]}>
          {projects.slice(0, 6).map((project, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const x = (col - 1) * 4;
            const y = 2 - row * 5;
            const z = -2;

            return (
              <Card3D
                key={project._id}
                position={[x, y, z]}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                techStack={project.techStack}
                onClick={() => handleProjectClick(project)}
              />
            );
          })}
        </group>
      ) : (
        <Text3D position={[0, 2, 0]} size={0.3} color="#ffffff">
          {loading ? 'LOADING...' : 'NO PROJECTS YET'}
        </Text3D>
      )}

      {/* Portals */}
      <Portal3D
        position={[0, 2, 12]}
        label="BACK TO HOME"
        onEnter={() => navigateToZone('hero')}
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0a0e27"
          emissive="#ff006e"
          emissiveIntensity={0.05}
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      <pointLight position={[0, 8, 0]} intensity={0.6} color="#ff006e" />
    </group>
  );
};

export default ProjectsZone;
