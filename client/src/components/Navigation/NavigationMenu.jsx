import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useInteraction } from '../../hooks/useInteraction';

const NavButton = ({ text, position, onClick, color = '#00ffcc' }) => {
  const meshRef = useRef();
  const { isHovered, handlePointerOver, handlePointerOut } = useInteraction();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(isHovered ? 1.1 : 1);
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[2, 0.5, 0.2]}
        radius={0.05}
        smoothness={4}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          color={isHovered ? '#ffffff' : color}
          emissive={color}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.2}
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

const NavigationMenu = ({ zones }) => {
  const { camera } = useThree();
  const menuRef = useRef();

  useFrame(() => {
    if (menuRef.current) {
      const offset = new THREE.Vector3(0, 3, -5);
      offset.applyQuaternion(camera.quaternion);
      menuRef.current.position.copy(camera.position).add(offset);
      menuRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const navigateToZone = (zoneName) => {
    window.dispatchEvent(new CustomEvent('navigateToZone', { detail: { zone: zoneName } }));
  };

  return (
    <group ref={menuRef}>
      <NavButton
        text="HOME"
        position={[-3, 1, 0]}
        onClick={() => navigateToZone('hero')}
        color="#00ffcc"
      />
      <NavButton
        text="ABOUT"
        position={[-1, 1, 0]}
        onClick={() => navigateToZone('about')}
        color="#4a9eff"
      />
      <NavButton
        text="PROJECTS"
        position={[1, 1, 0]}
        onClick={() => navigateToZone('projects')}
        color="#ff006e"
      />
      <NavButton
        text="EXPERIENCE"
        position={[3, 1, 0]}
        onClick={() => navigateToZone('experience')}
        color="#ffaa00"
      />
      <NavButton
        text="BLOG"
        position={[-2, 0.3, 0]}
        onClick={() => navigateToZone('blog')}
        color="#aa00ff"
      />
      <NavButton
        text="CONTACT"
        position={[2, 0.3, 0]}
        onClick={() => navigateToZone('contact')}
        color="#00ff88"
      />
    </group>
  );
};

export default NavigationMenu;
