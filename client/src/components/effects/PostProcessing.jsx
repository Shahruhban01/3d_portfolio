import React from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const PostProcessing = () => {
  return (
    <EffectComposer>
      {/* Bloom for glowing effects */}
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.ADD}
      />

      {/* Chromatic Aberration for cyberpunk feel */}
      <ChromaticAberration
        offset={[0.001, 0.001]}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* Vignette for focus */}
      <Vignette
        offset={0.3}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};

export default PostProcessing;
