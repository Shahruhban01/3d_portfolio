import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = ({ count = 5000 }) => {
  const pointsRef = useRef();
  const { viewport } = useThree();
  
  // Optimize particle count based on device performance
  const particleCount = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    if (isMobile) return Math.min(count, 2000);
    if (isTablet) return Math.min(count, 3500);
    return count;
  }, [count]);

  // Generate particle positions and properties
  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const spread = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions within spread
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
      
      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Random colors (cyan to blue gradient)
      const colorVariant = Math.random();
      colors[i3] = 0.0 + colorVariant * 0.3; // R
      colors[i3 + 1] = 0.8 + colorVariant * 0.2; // G
      colors[i3 + 2] = 1.0; // B
    }
    
    return { positions, velocities, colors };
  }, [particleCount]);

  // Animation loop - particles drift slowly
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array;
    const spread = 15;
    const boundaryPadding = spread / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Update positions based on velocities
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Boundary checking with wrap-around
      if (Math.abs(positions[i3]) > boundaryPadding) {
        positions[i3] = -Math.sign(positions[i3]) * boundaryPadding;
      }
      if (Math.abs(positions[i3 + 1]) > boundaryPadding) {
        positions[i3 + 1] = -Math.sign(positions[i3 + 1]) * boundaryPadding;
      }
      if (Math.abs(positions[i3 + 2]) > boundaryPadding) {
        positions[i3 + 2] = -Math.sign(positions[i3 + 2]) * boundaryPadding;
      }
    }
    
    // Mark attribute as needing update
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation of entire particle field
    pointsRef.current.rotation.y += delta * 0.02;
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
        size={0.05}
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

export default ParticleField;
