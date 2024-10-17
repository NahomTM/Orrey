import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Uranus() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.1;
    meshRef.current.rotation.z = Math.PI * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#4FD0E7"
        metalness={0.3}
        roughness={0.7}
      >
        <texture
          attach="map"
          url="/uranus/uranus_texture.jpg"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
        />
      </meshStandardMaterial>
    </mesh>
  );
}
