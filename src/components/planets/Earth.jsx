import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Earth() {
  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta * 0.15;
    cloudsRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial>
          <texture
            attach="map"
            url="/earth/earth_daymap.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
          />
          <texture
            attach="bumpMap"
            url="/earth/earth_bump.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
          />
          <texture
            attach="specularMap"
            url="/earth/earth_specular.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
          />
        </meshPhongMaterial>
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial
          transparent
          opacity={0.4}
          depthWrite={false}
        >
          <texture
            attach="map"
            url="/earth/earth_clouds.png"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
          />
        </meshPhongMaterial>
      </mesh>
    </group>
  );
}
