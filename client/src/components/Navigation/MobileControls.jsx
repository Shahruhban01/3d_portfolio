import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MobileControls = () => {
  const { camera, gl } = useThree();
  const [joystick, setJoystick] = useState({ x: 0, y: 0 });
  const touchStartRef = useRef({ x: 0, y: 0 });
  const lookTouchRef = useRef({ x: 0, y: 0 });
  const velocity = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  const moveSpeed = 0.15;
  const lookSpeed = 0.003;

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        // Movement joystick (left side)
        if (e.touches[0].clientX < window.innerWidth / 2) {
          touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          };
        }
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        
        // Movement joystick (left half)
        if (touch.clientX < window.innerWidth / 2) {
          const deltaX = touch.clientX - touchStartRef.current.x;
          const deltaY = touch.clientY - touchStartRef.current.y;
          setJoystick({
            x: Math.max(-1, Math.min(1, deltaX / 50)),
            y: Math.max(-1, Math.min(1, deltaY / 50))
          });
        }
        
        // Look control (right half)
        if (touch.clientX >= window.innerWidth / 2) {
          if (lookTouchRef.current.x !== 0) {
            const movementX = touch.clientX - lookTouchRef.current.x;
            const movementY = touch.clientY - lookTouchRef.current.y;

            euler.current.setFromQuaternion(camera.quaternion);
            euler.current.y -= movementX * lookSpeed;
            euler.current.x -= movementY * lookSpeed;
            euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
            camera.quaternion.setFromEuler(euler.current);
          }
          lookTouchRef.current = { x: touch.clientX, y: touch.clientY };
        }
      }
    };

    const handleTouchEnd = () => {
      setJoystick({ x: 0, y: 0 });
      lookTouchRef.current = { x: 0, y: 0 };
    };

    gl.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    gl.domElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    gl.domElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      gl.domElement.removeEventListener('touchstart', handleTouchStart);
      gl.domElement.removeEventListener('touchmove', handleTouchMove);
      gl.domElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [camera, gl]);

  useFrame(() => {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    const moveVector = new THREE.Vector3();
    moveVector.addScaledVector(right, joystick.x * moveSpeed);
    moveVector.addScaledVector(forward, -joystick.y * moveSpeed);

    camera.position.add(moveVector);
  });

  return null;
};

export default MobileControls;
