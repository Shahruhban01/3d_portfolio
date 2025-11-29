import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Stars = () => {
  const pointsRef = useRef();
  
  // Generate star positions - optimized count for mobile
  const particles = useMemo(() => {
    const count = window.innerWidth < 768 ? 1000 : 3000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);

  // Gentle rotation animation
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

export default Stars;
