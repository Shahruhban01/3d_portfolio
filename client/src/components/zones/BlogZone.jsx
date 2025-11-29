import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import { fetchPosts } from '../../utils/api';
import Text3D from '../ui3d/Text3D';
import Portal3D from '../ui3d/Portal3D';
import { useInteraction } from '../../hooks/useInteraction';

const BlogBook = ({ position, post, onClick }) => {
  const bookRef = useRef();
  const { isHovered, handlePointerOver, handlePointerOut } = useInteraction();

  useFrame(() => {
    if (bookRef.current) {
      bookRef.current.scale.setScalar(isHovered ? 1.1 : 1);
      bookRef.current.rotation.y = isHovered ? Math.PI / 8 : 0;
    }
  });

  return (
    <group ref={bookRef} position={position}>
      {/* Book Cover */}
      <RoundedBox
        args={[0.3, 2, 1.5]}
        radius={0.02}
        smoothness={4}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          color={isHovered ? '#ffffff' : '#aa00ff'}
          emissive="#aa00ff"
          emissiveIntensity={isHovered ? 0.6 : 0.3}
          metalness={0.8}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Book Title */}
      <Text
        position={[0.16, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.12}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
        fontWeight="bold"
      >
        {post.title}
      </Text>

      {/* Book Spine */}
      <RoundedBox args={[0.35, 2, 0.1]} position={[-0.175, 0, -0.7]} radius={0.01}>
        <meshStandardMaterial
          color="#8800cc"
          metalness={0.9}
          roughness={0.2}
        />
      </RoundedBox>
    </group>
  );
};

const BlogZone = ({ position }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const navigateToZone = (zone) => {
    window.dispatchEvent(new CustomEvent('navigateToZone', { detail: { zone } }));
  };

  const handleBookClick = (post) => {
    console.log('Blog post clicked:', post);
    // In a real app, this would open a 3D modal with the full post
  };

  return (
    <group position={position}>
      {/* Title */}
      <Text3D
        position={[0, 6, 0]}
        size={0.6}
        color="#aa00ff"
        emissive="#aa00ff"
      >
        BLOG
      </Text3D>

      {/* Bookshelf Structure */}
      <group position={[0, 2, -2]}>
        {/* Shelves */}
        {[0, 1, 2].map((shelfIndex) => (
          <RoundedBox
            key={shelfIndex}
            args={[12, 0.1, 2]}
            position={[0, 2 - shelfIndex * 2.5, 0]}
            radius={0.02}
          >
            <meshStandardMaterial
              color="#1a1d35"
              metalness={0.6}
              roughness={0.4}
            />
          </RoundedBox>
        ))}

        {/* Back Panel */}
        <RoundedBox args={[12, 8, 0.1]} position={[0, 1, -1]} radius={0.02}>
          <meshStandardMaterial
            color="#0a0e27"
            metalness={0.4}
            roughness={0.6}
          />
        </RoundedBox>

        {/* Books */}
        {!loading && posts.length > 0 ? (
          posts.slice(0, 9).map((post, index) => {
            const shelfIndex = Math.floor(index / 3);
            const positionOnShelf = index % 3;
            const x = (positionOnShelf - 1) * 3;
            const y = 2.3 - shelfIndex * 2.5;
            const z = -0.2;

            return (
              <BlogBook
                key={post._id}
                position={[x, y, z]}
                post={post}
                onClick={() => handleBookClick(post)}
              />
            );
          })
        ) : (
          <Text3D position={[0, 2, 0.5]} size={0.3} color="#ffffff">
            {loading ? 'LOADING...' : 'NO POSTS YET'}
          </Text3D>
        )}
      </group>

      {/* Portal Back */}
      <Portal3D
        position={[0, 2, 10]}
        label="BACK TO HOME"
        onEnter={() => navigateToZone('hero')}
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a0e27"
          emissive="#aa00ff"
          emissiveIntensity={0.05}
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      <pointLight position={[0, 8, 0]} intensity={0.6} color="#aa00ff" />
    </group>
  );
};

export default BlogZone;
