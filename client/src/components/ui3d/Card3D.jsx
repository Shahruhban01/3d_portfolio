import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Text, Image } from '@react-three/drei';
import { useInteraction } from '../../hooks/useInteraction';
import * as THREE from 'three';

const Card3D = ({
  position = [0, 0, 0],
  title,
  description,
  imageUrl,
  onClick,
  techStack = []
}) => {
  const meshRef = useRef();
  const { isHovered, handlePointerOver, handlePointerOut } = useInteraction();

  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    } else if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Card Body */}
      <RoundedBox
        args={[3, 4, 0.2]}
        radius={0.1}
        smoothness={4}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          color={isHovered ? '#1a1d35' : '#0f1224'}
          emissive="#00ffcc"
          emissiveIntensity={isHovered ? 0.3 : 0.1}
          metalness={0.8}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Image */}
      {imageUrl && (
        <Image
          url={imageUrl}
          position={[0, 0.8, 0.11]}
          scale={[2.6, 1.5]}
        />
      )}

      {/* Title */}
      <Text
        position={[0, -0.2, 0.11]}
        fontSize={0.25}
        color="#00ffcc"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        fontWeight="bold"
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        position={[0, -0.8, 0.11]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
      >
        {description}
      </Text>

      {/* Tech Stack */}
      {techStack.length > 0 && (
        <group position={[0, -1.5, 0.11]}>
          {techStack.slice(0, 3).map((tech, index) => (
            <Text
              key={index}
              position={[(index - 1) * 0.9, 0, 0]}
              fontSize={0.1}
              color="#4a9eff"
              anchorX="center"
              anchorY="middle"
            >
              {tech}
            </Text>
          ))}
        </group>
      )}
    </group>
  );
};

export default Card3D;
