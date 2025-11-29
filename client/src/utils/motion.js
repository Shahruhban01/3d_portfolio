// Framer Motion animation variants and utilities

/**
 * Text animation variants - characters appear one by one
 */
export const textVariant = (delay = 0) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

/**
 * Fade in animation from a specific direction
 */
export const fadeIn = (direction = 'up', type = 'spring', delay = 0, duration = 0.75) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

/**
 * Zoom in animation
 */
export const zoomIn = (delay = 0, duration = 0.75) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

/**
 * Slide in from side
 */
export const slideIn = (direction = 'left', type = 'tween', delay = 0, duration = 0.5) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

/**
 * Stagger container - children animate one after another
 */
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Scale animation on hover
 */
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
};

/**
 * Rotate animation on hover
 */
export const hoverRotate = {
  rotate: 5,
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
};

/**
 * Card flip animation
 */
export const flipVariant = {
  initial: {
    rotateY: 0,
    opacity: 1,
  },
  flipped: {
    rotateY: 180,
    opacity: 0.8,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

/**
 * Bounce animation
 */
export const bounceVariant = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Pulse animation (for loading or attention)
 */
export const pulseVariant = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Page transition variants
 */
export const pageVariants = {
  initial: {
    opacity: 0,
    x: '-100vw',
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: '100vw',
  },
};

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

/**
 * Nav link hover animation
 */
export const navLinkVariant = {
  initial: {
    borderBottom: '2px solid transparent',
  },
  hover: {
    borderBottom: '2px solid #00ffcc',
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Scroll reveal animation helper
 * Use with useScroll and useTransform from Framer Motion
 */
export const createScrollAnimation = (inputRange, outputRange) => ({
  inputRange,
  outputRange,
  extrapolate: 'clamp',
});

/**
 * Parallax scroll effect helper
 * Returns transform values for parallax
 */
export const parallaxEffect = (scrollProgress, speed = 0.5) => {
  return {
    y: scrollProgress * 100 * speed,
  };
};

/**
 * Modal/Dialog animation
 */
export const modalVariant = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Overlay backdrop animation
 */
export const backdropVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * List item stagger animation
 */
export const listItemVariant = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

/**
 * Counter animation helper
 * Animates numbers from 0 to target
 */
export const counterAnimation = (target, duration = 2) => ({
  from: 0,
  to: target,
  transition: {
    duration,
    ease: 'easeOut',
  },
});

/**
 * Path drawing animation (for SVGs)
 */
export const pathVariant = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

/**
 * Typewriter effect animation
 */
export const typewriterVariant = {
  hidden: { 
    width: 0 
  },
  visible: {
    width: '100%',
    transition: {
      duration: 2,
      ease: 'linear',
    },
  },
};

/**
 * Example usage with useScroll:
 * 
 * import { useScroll, useTransform, motion } from 'framer-motion';
 * import { fadeIn } from './motion';
 * 
 * const MyComponent = () => {
 *   const { scrollYProgress } = useScroll();
 *   const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
 *   
 *   return (
 *     <motion.div
 *       variants={fadeIn('up', 'spring', 0.5, 1)}
 *       initial="hidden"
 *       animate="show"
 *       style={{ opacity }}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * };
 */
