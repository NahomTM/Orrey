import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Earth from '../assets/earth/Earth.jsx';
import { SOLAR_SYSTEM_DESCRIPTION } from '../globals/constants';

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
    updatePlanetData,
    updateSunData,
    resetData
  } = useGlobalContext();

  const renderObjectView = () => {
    if (!selectedObject) {
      return <img src="/solar-system.jpg" alt="Solar System" className="object-view" />;
    }
    // For now, we'll use Earth for all planets. You can replace this later.
    return (
      <div className="object-view">
        <Earth />
      </div>
    );
  };

  const renderDescription = () => {
    if (!selectedObject) {
      return <p>{SOLAR_SYSTEM_DESCRIPTION}</p>;
    }
    const object = selectedObject === 'sun' ? sunData : planetData[selectedObject];
    return (
      <div>
        <h2>{selectedObject}</h2>
        <p>Mass: {object.mass.toExponential(2)} kg</p>
        <p>Radius: {object.radius || object.size} {selectedObject === 'sun' ? 'solar radii' : 'Earth radii'}</p>
        {/* Add more object-specific information here */}
      </div>
    );
  };

  const renderControls = () => {
    return (
      <div className="controls">
        <button onClick={() => setShowOrbits(!showOrbits)}>
          {showOrbits ? 'Hide Orbits' : 'Show Orbits'}
        </button>
        <button onClick={() => setIsPaused(!isPaused)}>
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
        {selectedObject && selectedObject !== 'sun' && (
          <>
            <div className="mass-control">
              <label htmlFor="mass-input">Mass (kg): </label>
              <input
                id="mass-input"
                type="number"
                value={planetData[selectedObject].mass}
                onChange={(e) => updatePlanetData(selectedObject, { mass: parseFloat(e.target.value) })}
              />
            </div>
            {/* Add more planet-specific controls here */}
          </>
        )}
        <button onClick={resetData}>Reset</button>
      </div>
    );
  };

  return (
    <div className="side-menu">
      {renderObjectView()}
      {renderDescription()}
      {renderControls()}
    </div>
  );
};

export default SideMenu;