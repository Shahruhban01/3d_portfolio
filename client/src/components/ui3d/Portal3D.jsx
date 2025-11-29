import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, MeshDistortMaterial, Text } from '@react-three/drei';
import { useInteraction } from '../../hooks/useInteraction';

const Portal3D = ({ position = [0, 0, 0], destination, onEnter, label }) => {
  const torusRef = useRef();
  const { isHovered, handlePointerOver, handlePointerOut } = useInteraction();

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.z += 0.01;
      torusRef.current.scale.setScalar(isHovered ? 1.2 : 1);
    }
  });

  return (
    <group position={position} onClick={onEnter}>
      <Torus
        ref={torusRef}
        args={[1.5, 0.2, 16, 100]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <MeshDistortMaterial
          color={isHovered ? '#ffffff' : '#00ffcc'}
          emissive="#00ffcc"
          emissiveIntensity={isHovered ? 0.8 : 0.5}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </Torus>

      {/* Portal Center */}
      <mesh>
        <circleGeometry args={[1.3, 32]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#4a9eff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Label */}
      {label && (
        <Text
          position={[0, -2, 0]}
          fontSize={0.3}
          color="#00ffcc"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

export default Portal3D;
