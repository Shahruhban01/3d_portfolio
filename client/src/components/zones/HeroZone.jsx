import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Text } from '@react-three/drei';
import Button3D from '../ui3d/Button3D';
import Portal3D from '../ui3d/Portal3D';

const HeroZone = ({ position }) => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.003;
    }
  });

  const handleDownloadCV = () => {
    console.log('Download CV clicked');
    window.open('/cv.pdf', '_blank');
  };

  const navigateToZone = (zone) => {
    window.dispatchEvent(new CustomEvent('navigateToZone', { detail: { zone } }));
  };

  return (
    <group position={position}>
      {/* Central Animated Sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={sphereRef} args={[2, 64, 64]} position={[0, 3, -5]}>
          <MeshDistortMaterial
            color="#00ffcc"
            emissive="#00ffcc"
            emissiveIntensity={0.5}
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Name - Regular Text */}
      <Text
        position={[0, 5, -3]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        outlineWidth={0.02}
        outlineColor="#00ffcc"
      >
        YOUR NAME
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00ffcc"
          emissiveIntensity={0.3}
        />
      </Text>

      {/* Title */}
      <Text
        position={[0, 3.5, -3]}
        fontSize={0.4}
        color="#4a9eff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        SOFTWARE ENGINEER
        <meshStandardMaterial
          color="#4a9eff"
          emissive="#4a9eff"
          emissiveIntensity={0.3}
        />
      </Text>

      {/* CTA Buttons */}
      <Button3D
        text="VIEW PROJECTS"
        position={[-2.5, 1.5, -2]}
        onClick={() => navigateToZone('projects')}
        color="#00ffcc"
      />

      <Button3D
        text="DOWNLOAD CV"
        position={[0, 1.5, -2]}
        onClick={handleDownloadCV}
        color="#4a9eff"
      />

      <Button3D
        text="CONTACT ME"
        position={[2.5, 1.5, -2]}
        onClick={() => navigateToZone('contact')}
        color="#ff006e"
      />

      {/* Portals to other zones */}
      <Portal3D
        position={[6, 2, 0]}
        label="ABOUT"
        onEnter={() => navigateToZone('about')}
      />

      <Portal3D
        position={[-6, 2, 0]}
        label="EXPERIENCE"
        onEnter={() => navigateToZone('experience')}
      />

      <Portal3D
        position={[0, 2, -10]}
        label="PROJECTS"
        onEnter={() => navigateToZone('projects')}
      />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a0e27"
          emissive="#00ffcc"
          emissiveIntensity={0.05}
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      {/* Ambient Lights for this zone */}
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#00ffcc" />
      <pointLight position={[5, 3, -5]} intensity={0.3} color="#4a9eff" />
    </group>
  );
};

export default HeroZone;
