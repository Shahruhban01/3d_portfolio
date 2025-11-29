export const ZONE_POSITIONS = {
  hero: [0, 0, 0],
  about: [30, 0, 0],
  projects: [0, 0, -30],
  experience: [-30, 0, 0],
  contact: [0, 0, 30],
  blog: [30, 0, -30]
};

export const COLORS = {
  primary: '#00ffcc',
  secondary: '#4a9eff',
  accent: '#ff006e',
  warning: '#ffaa00',
  purple: '#aa00ff',
  success: '#00ff88',
  background: '#0a0e27',
  backgroundLight: '#151932'
};

export const CAMERA_CONFIG = {
  fov: 75,
  near: 0.1,
  far: 1000,
  initialPosition: [0, 2, 10]
};

export const PERFORMANCE_CONFIG = {
  mobile: {
    particles: 1500,
    dpr: [1, 1.5],
    shadowMapSize: 1024
  },
  tablet: {
    particles: 2500,
    dpr: [1, 1.5],
    shadowMapSize: 1024
  },
  desktop: {
    particles: 5000,
    dpr: [1, 2],
    shadowMapSize: 2048
  }
};
