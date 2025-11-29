import { useState } from 'react';

export const useInteraction = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
    setIsHovered(true);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
    setIsHovered(false);
  };

  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  return {
    isHovered,
    isClicked,
    handlePointerOver,
    handlePointerOut,
    handleClick
  };
};
