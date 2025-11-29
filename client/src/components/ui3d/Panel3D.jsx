import React from 'react';
import { RoundedBox, Text } from '@react-three/drei';

const Panel3D = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  title,
  content,
  size = [4, 3, 0.1],
  color = '#151932'
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Panel Background */}
      <RoundedBox args={size} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color={color}
          emissive="#00ffcc"
          emissiveIntensity={0.1}
          metalness={0.6}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Title */}
      {title && (
        <Text
          position={[0, size[1] / 2 - 0.3, size[2] / 2 + 0.01]}
          fontSize={0.3}
          color="#00ffcc"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {title}
        </Text>
      )}

      {/* Content */}
      {content && (
        <Text
          position={[0, 0, size[2] / 2 + 0.01]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={size[0] - 0.5}
        >
          {content}
        </Text>
      )}
    </group>
  );
};

export default Panel3D;
