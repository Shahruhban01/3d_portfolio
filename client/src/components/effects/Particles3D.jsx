import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles3D = ({ count = 3000 }) => {
  const pointsRef = useRef();

  // Optimize count based on device
  const particleCount = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? Math.min(count, 1500) : count;
  }, [count]);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Spread particles in a large sphere
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color gradient
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i3] = 0.0; // R
        colors[i3 + 1] = 1.0; // G
        colors[i3 + 2] = 0.8; // B (cyan)
      } else if (colorChoice < 0.66) {
        colors[i3] = 0.29; // R
        colors[i3 + 1] = 0.62; // G
        colors[i3 + 2] = 1.0; // B (blue)
      } else {
        colors[i3] = 1.0; // R
        colors[i3 + 1] = 0.0; // G
        colors[i3 + 2] = 0.43; // B (pink)
      }
    }
    
    return { positions, colors };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles3D;
