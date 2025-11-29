import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const CodeSphere = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 32, 32]}>
      <meshStandardMaterial
        color="#4a9eff"
        wireframe
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
};

export default CodeSphere;
