import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import { useGlobalContext } from '../context/GlobalContext';
import { DEG_TO_RAD } from '../global/constants';
import Planet from './planet';
import Earth from '../assets/earth/Earth';

function SolarSystem() {
  const { planetData, sunData, showOrbits, isPaused, speed, setSelectedObject } = useGlobalContext();
  const [positions, setPositions] = useState({});

  function calculatePlanetPosition(a, e, i, Ω, ϖ, M) {
    M = M * DEG_TO_RAD;
    const E = solveKeplersEquation(M, e);
    const ν = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
    const r = a * (1 - e * Math.cos(E));
    const x_orbit = r * Math.cos(ν);
    const y_orbit = r * Math.sin(ν);
    i = i * DEG_TO_RAD;
    Ω = Ω * DEG_TO_RAD;
    ϖ = ϖ * DEG_TO_RAD;

    const x_helio =
      (Math.cos(Ω) * Math.cos(ϖ) - Math.sin(Ω) * Math.sin(ϖ) * Math.cos(i)) * x_orbit +
      (-Math.cos(Ω) * Math.sin(ϖ) - Math.sin(Ω) * Math.cos(ϖ) * Math.cos(i)) * y_orbit;
    const y_helio =
      (Math.sin(Ω) * Math.cos(ϖ) + Math.cos(Ω) * Math.sin(ϖ) * Math.cos(i)) * x_orbit +
      (-Math.sin(Ω) * Math.sin(ϖ) + Math.cos(Ω) * Math.cos(ϖ) * Math.cos(i)) * y_orbit;
    const z_helio = Math.sin(ϖ) * Math.sin(i) * x_orbit + Math.cos(ϖ) * Math.sin(i) * y_orbit;

    return { x_helio, y_helio, z_helio };
  }

  function solveKeplersEquation(M, e, tolerance = 1e-6) {
    let E = M;
    let delta = 1;
    while (Math.abs(delta) > tolerance) {
      delta = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
      E -= delta;
    }
    return E;
  }

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newPositions = {};
      Object.entries(planetData).forEach(([name, data]) => {
        data.M += 0.05 * speed;
        newPositions[name] = calculatePlanetPosition(
          data.a, data.e, data.i, data.Ω, data.ϖ, data.M
        );
      });
      setPositions(newPositions);
    }, 16);

    return () => clearInterval(interval);
  }, [isPaused, speed, planetData]);

  return (
    <Canvas camera={{ position: [0, 20, 25], fov: 60 }} onClick={() => setSelectedObject(null)}>
      <OrbitControls />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={5} distance={100} decay={0} />

      {/* Sun */}
      <mesh position={[0, 0, 0]} onClick={(e) => {
        e.stopPropagation();
        setSelectedObject('sun');
      }}>
        <sphereGeometry args={[sunData.radius, 32, 32]} />
        <meshBasicMaterial color={sunData.color} />
      </mesh>

      {/* Planets */}
      {Object.entries(planetData).map(([name, data]) => {
        if (!positions[name]) return null;
        const { x_helio, y_helio, z_helio } = positions[name];
        return name === 'earth' ? (
          <Earth
            key={name}
            position={[x_helio, y_helio, z_helio]}
            scale={[data.size, data.size, data.size]}
          />
        ) : (
          <Planet
            key={name}
            name={name}
            position={[x_helio, y_helio, z_helio]}
            size={data.size}
            color={data.color}
          />
        );
      })}

      {/* Orbits */}
      {showOrbits && Object.entries(planetData).map(([name, data]) => {
        const orbitPoints = [];
        for (let i = 0; i <= 360; i++) {
          const { x_helio, y_helio, z_helio } = calculatePlanetPosition(
            data.a, data.e, data.i, data.Ω, data.ϖ, i
          );
          orbitPoints.push([x_helio, y_helio, z_helio]);
        }
        return (
          <Line
            key={`${name}-orbit`}
            points={orbitPoints}
            color={data.color}
            lineWidth={1}
            opacity={0.5}
            transparent
          />
        );
      })}
    </Canvas>
  );
}

export default SolarSystem;