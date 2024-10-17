import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Jupiter() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial>
        <texture
          attach="map"
          url="/jupiter/jupiter_texture.jpg"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
        />
      </meshStandardMaterial>
    </mesh>
  );
}
