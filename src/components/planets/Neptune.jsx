import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Neptune() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#4b70dd"
        metalness={0.3}
        roughness={0.7}
      >
        <texture
          attach="map"
          url="/neptune/neptune_texture.jpg"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
        />
      </meshStandardMaterial>
    </mesh>
  );
}
