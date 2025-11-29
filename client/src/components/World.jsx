import React from 'react';
import { Environment as EnvironmentComponent } from './effects/Environment';
import PostProcessing from './effects/PostProcessing';
import Experience from './Experience';

const World = () => {
  return (
    <>
      {/* Lighting and Environment */}
      <EnvironmentComponent />
      
      {/* Main 3D Experience */}
      <Experience />
      
      {/* Post Processing Effects */}
      <PostProcessing />
    </>
  );
};

export default World;
