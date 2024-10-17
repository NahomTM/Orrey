import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Saturn() {
  const planetRef = useRef();
  const ringsRef = useRef();

  useFrame((state, delta) => {
    planetRef.current.rotation.y += delta * 0.15;
    ringsRef.current.rotation.z += delta * 0.05;
  });

  return (
    <group>
      <mesh ref={planetRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial>
          <texture
            attach="map"
            url="/saturn/saturn_texture.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
          />
        </meshStandardMaterial>
      </mesh>
      <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 2, 64]} />
        <meshStandardMaterial side={THREE.DoubleSide} transparent opacity={0.8}>
          <texture
            attach="map"
            url="/saturn/saturn_rings.png"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
          />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
}
