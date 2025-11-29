import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Text } from '@react-three/drei';
import Text3D from '../ui3d/Text3D';
import Panel3D from '../ui3d/Panel3D';
import Portal3D from '../ui3d/Portal3D';
import * as THREE from 'three';

const TimelineNode = ({ position, year, title, company, description, color }) => {
  const nodeRef = useRef();

  useFrame((state) => {
    if (nodeRef.current) {
      nodeRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.002;
    }
  });

  return (
    <group ref={nodeRef} position={position}>
      {/* Node Sphere */}
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>

      {/* Info Panel */}
      <Panel3D
        position={[0, 2, 0]}
        title={`${year} - ${title}`}
        content={`${company}\n${description}`}
        size={[3, 2, 0.1]}
        color="#151932"
      />

      {/* Connecting Line to Panel */}
      <Line
        points={[[0, 0.3, 0], [0, 1.7, 0]]}
        color={color}
        lineWidth={2}
      />
    </group>
  );
};

const ExperienceZone = ({ position }) => {
  const experiences = [
    {
      year: '2023',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      description: 'Led development of scalable web apps',
      color: '#00ffcc'
    },
    {
      year: '2021',
      title: 'Full Stack Developer',
      company: 'Startup Labs',
      description: 'Built 10+ production applications',
      color: '#4a9eff'
    },
    {
      year: '2019',
      title: 'Junior Developer',
      company: 'Web Solutions',
      description: 'Started career in web development',
      color: '#ff006e'
    },
    {
      year: '2019',
      title: 'BS Computer Science',
      company: 'University of Tech',
      description: 'Graduated with honors',
      color: '#ffaa00'
    }
  ];

  const navigateToZone = (zone) => {
    window.dispatchEvent(new CustomEvent('navigateToZone', { detail: { zone } }));
  };

  // Calculate timeline positions
  const timelinePoints = experiences.map((_, index) => {
    const x = (index - experiences.length / 2) * 6;
    return [x, 0, 0];
  });

  return (
    <group position={position}>
      {/* Title */}
      <Text3D
        position={[0, 6, 0]}
        size={0.6}
        color="#ffaa00"
        emissive="#ffaa00"
      >
        EXPERIENCE
      </Text3D>

      {/* Timeline Path */}
      <Line
        points={timelinePoints}
        color="#00ffcc"
        lineWidth={3}
        dashed
        dashScale={50}
        dashSize={0.5}
        gapSize={0.3}
      />

      {/* Timeline Nodes */}
      {experiences.map((exp, index) => (
        <TimelineNode
          key={index}
          position={timelinePoints[index]}
          {...exp}
        />
      ))}

      {/* Portal Back */}
      <Portal3D
        position={[12, 2, 0]}
        label="BACK TO HOME"
        onEnter={() => navigateToZone('hero')}
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial
          color="#0a0e27"
          emissive="#ffaa00"
          emissiveIntensity={0.05}
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      <pointLight position={[0, 8, 0]} intensity={0.6} color="#ffaa00" />
    </group>
  );
};

export default ExperienceZone;
