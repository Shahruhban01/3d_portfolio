import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

const FloatingCube = () => {
  const meshRef = useRef();

  // Animation loop - optimized for mobile
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <MeshDistortMaterial
        color="#00ffcc"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
        metalness={0.8}
      />
    </mesh>
  );
};

export default FloatingCube;
