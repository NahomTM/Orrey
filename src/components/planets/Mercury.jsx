import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Mercury() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#8C7853"
        metalness={0.5}
        roughness={0.7}
      >
        <texture
          attach="bumpMap"
          url="/mercury/mercury_bump.jpg"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
        />
      </meshStandardMaterial>
    </mesh>
  );
}
