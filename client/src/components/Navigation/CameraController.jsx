import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import gsap from 'gsap';
import { useCameraAnimation } from '../../hooks/useCameraAnimation';
import FirstPersonControls from './FirstPersonControls';
import MobileControls from './MobileControls';

const CameraController = ({ zones }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  const isMobile = window.innerWidth < 768;
  const { animateToZone, currentZone } = useCameraAnimation(zones);

  // Listen for zone navigation events
  useEffect(() => {
    const handleNavigate = (e) => {
      animateToZone(e.detail.zone, camera);
    };

    window.addEventListener('navigateToZone', handleNavigate);
    return () => window.removeEventListener('navigateToZone', handleNavigate);
  }, [animateToZone, camera]);

  // Set camera up direction
  useEffect(() => {
    camera.up.set(0, 1, 0);
  }, [camera]);

  return (
    <>
      {!isMobile ? (
        <FirstPersonControls />
      ) : (
        <MobileControls />
      )}
    </>
  );
};

export default CameraController;
