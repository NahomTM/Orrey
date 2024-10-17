import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';

function Planet({ name, position, size, color }) {
  const { selectedObject, setSelectedObject } = useGlobalContext();
  
  return (
    <mesh 
      position={position}
      onClick={() => setSelectedObject(name)}
      scale={selectedObject === name ? [1.2, 1.2, 1.2] : [1, 1, 1]}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Planet;