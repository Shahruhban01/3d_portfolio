import React, { useState } from 'react';
import { RoundedBox, Text } from '@react-three/drei';
import Button3D from './Button3D';

const Terminal3D = ({ position = [0, 0, 0], onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    setStatus('SENDING...');
    try {
      await onSubmit(formData);
      setStatus('SUCCESS!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <group position={position}>
      {/* Terminal Frame */}
      <RoundedBox args={[8, 6, 0.3]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#0a0e27"
          emissive="#00ffcc"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Terminal Screen */}
      <RoundedBox args={[7.5, 5, 0.1]} position={[0, 0.2, 0.2]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color="#000000"
          emissive="#00ffcc"
          emissiveIntensity={0.05}
        />
      </RoundedBox>

      {/* Header */}
      <Text
        position={[0, 2.3, 0.31]}
        fontSize={0.3}
        color="#00ffcc"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {'> CONTACT_TERMINAL'}
      </Text>

      {/* Form Labels (Simulated) */}
      <Text
        position={[-3, 1.3, 0.31]}
        fontSize={0.2}
        color="#00ffcc"
        anchorX="left"
        anchorY="middle"
      >
        {'> NAME:'}
      </Text>

      <Text
        position={[-3, 0.5, 0.31]}
        fontSize={0.2}
        color="#00ffcc"
        anchorX="left"
        anchorY="middle"
      >
        {'> EMAIL:'}
      </Text>

      <Text
        position={[-3, -0.3, 0.31]}
        fontSize={0.2}
        color="#00ffcc"
        anchorX="left"
        anchorY="middle"
      >
        {'> MESSAGE:'}
      </Text>

      {/* Input Field Representations */}
      <RoundedBox args={[6, 0.4, 0.05]} position={[0.5, 1.3, 0.32]} radius={0.02}>
        <meshStandardMaterial color="#1a1d35" emissive="#00ffcc" emissiveIntensity={0.1} />
      </RoundedBox>

      <RoundedBox args={[6, 0.4, 0.05]} position={[0.5, 0.5, 0.32]} radius={0.02}>
        <meshStandardMaterial color="#1a1d35" emissive="#00ffcc" emissiveIntensity={0.1} />
      </RoundedBox>

      <RoundedBox args={[6, 1.2, 0.05]} position={[0.5, -0.8, 0.32]} radius={0.02}>
        <meshStandardMaterial color="#1a1d35" emissive="#00ffcc" emissiveIntensity={0.1} />
      </RoundedBox>

      {/* Submit Button */}
      <Button3D
        text="SEND MESSAGE"
        position={[0, -2, 0.4]}
        onClick={handleSubmit}
        color="#00ffcc"
        size={[3, 0.6, 0.2]}
      />

      {/* Status Message */}
      {status && (
        <Text
          position={[0, -2.8, 0.31]}
          fontSize={0.15}
          color={status === 'SUCCESS!' ? '#00ff88' : status === 'ERROR' ? '#ff006e' : '#ffffff'}
          anchorX="center"
          anchorY="middle"
        >
          {status}
        </Text>
      )}

      {/* Note */}
      <Text
        position={[0, -2.3, 0.31]}
        fontSize={0.1}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        (Click input fields in real app to type)
      </Text>
    </group>
  );
};

export default Terminal3D;
