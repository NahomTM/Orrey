import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Mars() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#C1440E"
        metalness={0.2}
        roughness={0.8}
      >
        <texture
          attach="map"
          url="/mars/mars_texture.jpg"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
        />
        <texture
          attach="bumpMap"
          url="/mars/mars_bump.jpg"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
        />
      </meshStandardMaterial>
    </mesh>
  );
}
