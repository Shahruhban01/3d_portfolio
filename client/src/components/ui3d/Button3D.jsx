import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import { useInteraction } from '../../hooks/useInteraction';

const Button3D = ({
  text,
  position = [0, 0, 0],
  onClick,
  color = '#00ffcc',
  size = [2, 0.6, 0.3]
}) => {
  const meshRef = useRef();
  const { isHovered, isClicked, handlePointerOver, handlePointerOut, handleClick } = useInteraction();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(isHovered ? 1.05 : isClicked ? 0.95 : 1);
    }
  });

  const handleButtonClick = (e) => {
    handleClick(e);
    onClick && onClick(e);
  };

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={size}
        radius={0.1}
        smoothness={4}
        onClick={handleButtonClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          color={isHovered ? '#ffffff' : color}
          emissive={color}
          emissiveIntensity={isHovered ? 0.6 : 0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>
      <Text
        position={[0, 0, size[2] / 2 + 0.01]}
        fontSize={0.25}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {text}
      </Text>
    </group>
  );
};

export default Button3D;
