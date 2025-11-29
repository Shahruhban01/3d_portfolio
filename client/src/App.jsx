import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import World from './components/World';
import ErrorBoundary from './components/ErrorBoundary';
import { useResponsive3D } from './hooks/useResponsive3D';

function App() {
  const { dpr, pixelRatio } = useResponsive3D();

  return (
    <ErrorBoundary>
      <Canvas
        shadows
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          pixelRatio: pixelRatio
        }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 2, 10]
        }}
      >
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{
          background: '#0a0e27'
        }}
        innerStyles={{
          background: '#00ffcc'
        }}
        barStyles={{
          background: '#4a9eff'
        }}
        dataStyles={{
          color: '#ffffff'
        }}
      />
      
      {/* Instructions Overlay */}
      <div className="instructions">
        <h3>🎮 Controls</h3>
        <p><strong>Desktop:</strong> WASD/Arrows = Move | Mouse = Look | Click = Interact</p>
        <p><strong>Mobile:</strong> Left = Joystick | Right = Look | Tap = Interact</p>
      </div>
    </ErrorBoundary>
  );
}

export default App;
