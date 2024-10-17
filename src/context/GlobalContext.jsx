import React, { createContext, useState, useContext } from 'react';
import { INITIAL_PLANET_DATA, SUN_DATA } from '../global/constants';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [showOrbits, setShowOrbits] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [planetData, setPlanetData] = useState(INITIAL_PLANET_DATA);
  const [sunData, setSunData] = useState(SUN_DATA);

  const updatePlanetData = (planet, newData) => {
    setPlanetData(prev => ({
      ...prev,
      [planet]: { ...prev[planet], ...newData }
    }));
  };

  const updateSunData = (newData) => {
    setSunData(prev => ({ ...prev, ...newData }));
  };

  const resetData = () => {
    setPlanetData(INITIAL_PLANET_DATA);
    setSunData(SUN_DATA);
    setSelectedObject(null);
    setShowOrbits(false);
    setIsPaused(false);
    setSpeed(1);
  };

  return (
    <GlobalContext.Provider value={{
      selectedObject,
      setSelectedObject,
      showOrbits,
      setShowOrbits,
      isPaused,
      setIsPaused,
      speed,
      setSpeed,
      planetData,
      updatePlanetData,
      sunData,
      updateSunData,
      resetData
    }}>
      {children}
    </GlobalContext.Provider>
  );
};