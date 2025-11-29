import React, { useState } from 'react';
import Text3D from '../ui3d/Text3D';
import Terminal3D from '../ui3d/Terminal3D';
import Portal3D from '../ui3d/Portal3D';
import { submitContactForm } from '../../utils/api';
import { Sphere, Float } from '@react-three/drei';

const ContactZone = ({ position }) => {
  const navigateToZone = (zone) => {
    window.dispatchEvent(new CustomEvent('navigateToZone', { detail: { zone } }));
  };

  const handleSubmit = async (formData) => {
    try {
      await submitContactForm(formData);
      return true;
    } catch (error) {
      console.error('Contact form error:', error);
      throw error;
    }
  };

  return (
    <group position={position}>
      {/* Title */}
      <Text3D
        position={[0, 6, 0]}
        size={0.6}
        color="#00ff88"
        emissive="#00ff88"
      >
        CONTACT
      </Text3D>

      {/* Terminal */}
      <Terminal3D
        position={[0, 2, 0]}
        onSubmit={handleSubmit}
      />

      {/* Decorative Floating Spheres */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[0.5, 32, 32]} position={[-5, 3, -2]}>
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[0.3, 32, 32]} position={[5, 4, -2]}>
          <meshStandardMaterial
            color="#4a9eff"
            emissive="#4a9eff"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>

      {/* Portal Back */}
      <Portal3D
        position={[0, 2, 12]}
        label="BACK TO HOME"
        onEnter={() => navigateToZone('hero')}
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 25]} />
        <meshStandardMaterial
          color="#0a0e27"
          emissive="#00ff88"
          emissiveIntensity={0.05}
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      <pointLight position={[0, 8, 0]} intensity={0.6} color="#00ff88" />
    </group>
  );
};

export default ContactZone;
