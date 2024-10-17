import React, { useState, useEffect } from 'react';
import { GlobalProvider } from './context/GlobalContext';
import SideMenu from './components/SideMenu';
import SolarSystem from './components/SolarSystem';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="splash-screen">
        <img src="/logo.svg" alt="Logo" className="splash-logo" />
      </div>
    );
  }

  return (
    <GlobalProvider>
      <div className="app-container">
        <SolarSystem />
        <SideMenu />
      </div>
    </GlobalProvider>
  );
}

export default App;