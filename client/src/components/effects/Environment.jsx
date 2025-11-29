import React from 'react';
import { Environment as DreiEnvironment, Stars as DreiStars } from '@react-three/drei';

export const Environment = () => {
  return (
    <>
      {/* HDR Environment Lighting */}
      <DreiEnvironment
        preset="night"
        background={false}
      />

      {/* Starfield Background */}
      <DreiStars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Global Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Hemisphere Light for better ambient */}
      <hemisphereLight
        color="#00ffcc"
        groundColor="#0a0e27"
        intensity={0.3}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0e27', 30, 100]} />
    </>
  );
};
