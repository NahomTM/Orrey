import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Venus() {
  const meshRef = useRef();
  const atmosphereRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.005;
    atmosphereRef.current.rotation.y -= delta * 0.002;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshStandardMaterial
          color="#E6C498"
          metalness={0.4}
          roughness={0.7}
        >
          <texture
            attach="map"
            url="/venus/venus_surface.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
          />
        </meshStandardMaterial>
      </mesh>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#FFA500"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
