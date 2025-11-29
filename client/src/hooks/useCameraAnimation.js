import { useRef, useCallback } from 'react';
import gsap from 'gsap';

export const useCameraAnimation = (zones) => {
  const currentZone = useRef('hero');
  const isAnimating = useRef(false);

  const animateToZone = useCallback((zoneName, camera) => {
    if (isAnimating.current || !zones[zoneName]) return;

    isAnimating.current = true;
    currentZone.current = zoneName;

    const targetPosition = zones[zoneName];
    const lookAtPosition = [targetPosition[0], targetPosition[1] + 2, targetPosition[2]];

    // GSAP camera animation
    const timeline = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });

    // Animate camera position
    timeline.to(camera.position, {
      x: targetPosition[0],
      y: targetPosition[1] + 5,
      z: targetPosition[2] + 10,
      duration: 2,
      ease: 'power2.inOut'
    });

    // Animate camera lookAt
    const lookAt = { x: 0, y: 0, z: 0 };
    timeline.to(lookAt, {
      x: lookAtPosition[0],
      y: lookAtPosition[1],
      z: lookAtPosition[2],
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
      }
    }, '<');

  }, [zones]);

  return {
    animateToZone,
    currentZone: currentZone.current
  };
};
