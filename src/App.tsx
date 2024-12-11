import React from 'react';
import { MapView } from './components/MapView';
import { NavigationButton } from './components/NavigationButton';
import { MAPS_CONFIG } from './config/constants';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app-container">
      <div className="map-container">
        <MapView destination={MAPS_CONFIG.DEFAULT_DESTINATION} />
      </div>
      <NavigationButton destination={MAPS_CONFIG.DEFAULT_DESTINATION} />
    </div>
  );
}

export default App;