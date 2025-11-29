import React from 'react';
import { Float, Sphere } from '@react-three/drei';
import Text3D from '../ui3d/Text3D';
import Panel3D from '../ui3d/Panel3D';
import Portal3D from '../ui3d/Portal3D';

const AboutZone = ({ position }) => {
  const skills = [
    { name: 'React', level: 0.95, color: '#61dafb' },
    { name: 'Node.js', level: 0.90, color: '#68a063' },
    { name: 'Three.js', level: 0.85, color: '#000000' },
    { name: 'MongoDB', level: 0.88, color: '#4db33d' },
    { name: 'Python', level: 0.82, color: '#3776ab' },
    { name: 'DevOps', level: 0.78, color: '#f05032' }
  ];

  const navigateToZone = (zone) => {
    window.dispatchEvent(new CustomEvent('navigateToZone', { detail: { zone } }));
  };

  return (
    <group position={position}>
      {/* Title */}
      <Text3D
        position={[0, 6, 0]}
        size={0.6}
        color="#00ffcc"
        emissive="#00ffcc"
      >
        ABOUT ME
      </Text3D>

      {/* Bio Panel */}
      <Panel3D
        position={[0, 3, 0]}
        title="WHO AM I?"
        content="Passionate Software Engineer with 5+ years building scalable web applications and immersive 3D experiences."
        size={[6, 2, 0.1]}
      />

      {/* Skills as 3D Spheres */}
      <group position={[0, 0, 0]}>
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = 4;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <Float key={skill.name} speed={1 + index * 0.2} floatIntensity={0.5}>
              <group position={[x, 1, z]}>
                <Sphere args={[skill.level * 0.5, 32, 32]}>
                  <meshStandardMaterial
                    color={skill.color}
                    emissive={skill.color}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Sphere>
                <Text3D
                  position={[0, -1, 0]}
                  size={0.15}
                  color="#ffffff"
                >
                  {skill.name}
                </Text3D>
              </group>
            </Float>
          );
        })}
      </group>

      {/* Portal Back */}
      <Portal3D
        position={[-8, 2, 0]}
        label="BACK TO HOME"
        onEnter={() => navigateToZone('hero')}
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a0e27"
          emissive="#4a9eff"
          emissiveIntensity={0.05}
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      <pointLight position={[0, 5, 0]} intensity={0.5} color="#4a9eff" />
    </group>
  );
};

export default AboutZone;
