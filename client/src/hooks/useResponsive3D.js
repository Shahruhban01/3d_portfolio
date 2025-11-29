import { useState, useEffect } from 'react';

export const useResponsive3D = () => {
  const [deviceType, setDeviceType] = useState('desktop');
  const [dpr, setDpr] = useState([1, 2]);
  const [pixelRatio, setPixelRatio] = useState(1);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setDeviceType('mobile');
        setDpr([1, 1.5]);
        setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      } else if (width < 1024) {
        setDeviceType('tablet');
        setDpr([1, 1.5]);
        setPixelRatio(Math.min(window.devicePixelRatio, 2));
      } else {
        setDeviceType('desktop');
        setDpr([1, 2]);
        setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return {
    deviceType,
    dpr,
    pixelRatio,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop'
  };
};
