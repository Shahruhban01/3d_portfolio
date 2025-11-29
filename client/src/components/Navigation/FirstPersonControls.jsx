import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FirstPersonControls = () => {
  const { camera, gl } = useThree();
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false
  });
  
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const locked = useRef(false);

  const moveSpeed = 0.2;
  const lookSpeed = 0.002;

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = true;
          break;
        case 'Space':
          moveState.current.up = true;
          e.preventDefault();
          break;
        case 'ShiftLeft':
          moveState.current.down = true;
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = false;
          break;
        case 'Space':
          moveState.current.up = false;
          break;
        case 'ShiftLeft':
          moveState.current.down = false;
          break;
      }
    };

    const handleMouseMove = (e) => {
      if (!locked.current) return;

      const movementX = e.movementX || 0;
      const movementY = e.movementY || 0;

      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y -= movementX * lookSpeed;
      euler.current.x -= movementY * lookSpeed;
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
      camera.quaternion.setFromEuler(euler.current);
    };

    const handleClick = () => {
      gl.domElement.requestPointerLock();
    };

    const handlePointerLockChange = () => {
      locked.current = document.pointerLockElement === gl.domElement;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [camera, gl]);

  useFrame((state, delta) => {
    const actualMoveSpeed = moveSpeed;

    direction.current.z = Number(moveState.current.forward) - Number(moveState.current.backward);
    direction.current.x = Number(moveState.current.right) - Number(moveState.current.left);
    direction.current.y = Number(moveState.current.up) - Number(moveState.current.down);
    direction.current.normalize();

    if (moveState.current.forward || moveState.current.backward) {
      velocity.current.z = direction.current.z * actualMoveSpeed;
    } else {
      velocity.current.z = 0;
    }

    if (moveState.current.left || moveState.current.right) {
      velocity.current.x = direction.current.x * actualMoveSpeed;
    } else {
      velocity.current.x = 0;
    }

    if (moveState.current.up || moveState.current.down) {
      velocity.current.y = direction.current.y * actualMoveSpeed;
    } else {
      velocity.current.y = 0;
    }

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    const moveVector = new THREE.Vector3();
    moveVector.addScaledVector(forward, velocity.current.z);
    moveVector.addScaledVector(right, velocity.current.x);
    moveVector.y += velocity.current.y;

    camera.position.add(moveVector);
  });

  return null;
};

export default FirstPersonControls;
