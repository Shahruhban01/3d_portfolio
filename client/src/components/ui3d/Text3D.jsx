import React from 'react';
import { Text, Center } from '@react-three/drei';

const Text3D = ({
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 1,
  color = '#00ffcc',
  emissive = '#00ffcc',
  ...props
}) => {
  return (
    <Center position={position} rotation={rotation}>
      <Text
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        {...props}
      >
        {children}
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </Text>
    </Center>
  );
};

export default Text3D;
