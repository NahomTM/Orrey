import React, { useState, Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGlobalContext } from '../context/GlobalContext';
import { SOLAR_SYSTEM_DESCRIPTION } from '../global/constants';

const PlanetModel = ({ planet }) => {
  const [PlanetComponent, setPlanetComponent] = useState(null);

  React.useEffect(() => {
    import(`/${planet}/${planet.charAt(0).toUpperCase() + planet.slice(1)}.jsx`)
      .then(module => setPlanetComponent(() => module.default))
      .catch(error => console.error(`Error loading ${planet} component:`, error));
  }, [planet]);

  if (!PlanetComponent) {
    return <FallbackSphere />;
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<FallbackSphere />}>
        <ErrorBoundary fallback={<ErrorSphere />}>
          <PlanetComponent />
        </ErrorBoundary>
      </Suspense>
    </Canvas>
  );
};

const FallbackSphere = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshBasicMaterial color="gray" wireframe />
  </mesh>
);

const ErrorSphere = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshBasicMaterial color="red" wireframe />
  </mesh>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Planet loading error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const SideMenu = () => {
  const {
    selectedObject,
    showOrbits,
    setShowOrbits,
    isPaused,
    setIsPaused,
    speed,
    setSpeed,
    planetData,
    sunData,
    resetData
  } = useGlobalContext();

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (planet) => {
    setOpenDropdown(openDropdown === planet ? null : planet);
  };

//   const renderPlanetDropdowns = () => {
//     return Object.entries(planetData).map(([planet, data]) => (
//       <div key={planet} className="planet-dropdown">
//         <button 
//           className="dropdown-toggle futuristic-button" 
//           onClick={() => toggleDropdown(planet)}
//         >
//           {planet.charAt(0).toUpperCase() + planet.slice(1)}
//         </button>
//         {openDropdown === planet && (
//           <div className="dropdown-content">
//             <div className="planet-model">
//               <PlanetModel planet={planet} />
//             </div>
//             <div className="planet-info">
//               <h3>{planet.charAt(0).toUpperCase() + planet.slice(1)}</h3>
//               <p>Mass: {data.mass.toExponential(2)} kg</p>
//               <p>Size: {data.size} Earth radii</p>
 
//               {/* Add more planet-specific information here */}
//             </div>
//           </div>
//         )}
//       </div>
//     ));
//   };

const renderPlanetDropdowns = () => {
    return Object.entries(planetData).map(([planet, data]) => (
      <div key={planet} className="planet-dropdown">
        <button 
          className="dropdown-toggle futuristic-button" 
          onClick={() => toggleDropdown(planet)}
        >
          {planet.charAt(0).toUpperCase() + planet.slice(1)}
        </button>
        {openDropdown === planet && (
          <div className="dropdown-content">
            <div className="planet-model">
              <img src={`../components/planets/${planet}.png`} alt={`${planet} model`} />
            </div>
            <div className="planet-info">
              <h3>{planet.charAt(0).toUpperCase() + planet.slice(1)}</h3>
              <p>Mass: {data.mass.toExponential(2)} kg</p>
              <p>Size: {data.size} Earth radii</p>
              {/* Add more planet-specific information here */}
            </div>
          </div>
        )}
      </div>
    ));
  };
  
  const renderControls = () => {
    return (
      <div className="controls">
        <button className="futuristic-button" onClick={() => setShowOrbits(!showOrbits)}>
          {showOrbits ? 'Hide Orbits' : 'Show Orbits'}
        </button>
        <button className="futuristic-button" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <div className="speed-control">
          <label htmlFor="speed-slider">Speed: </label>
          <input
            id="speed-slider"
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
          <span>{speed.toFixed(1)}x</span>
        </div>
        <button className="futuristic-button" onClick={resetData}>Reset</button>
      </div>
    );
  };

  return (
    <div className="side-menu">
      <h2>Solar System Explorer</h2>
      <p>{SOLAR_SYSTEM_DESCRIPTION}</p>
      {renderPlanetDropdowns()}
      {renderControls()}
    </div>
  );
};

export default SideMenu;