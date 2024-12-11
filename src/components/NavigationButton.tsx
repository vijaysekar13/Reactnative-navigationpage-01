import React from 'react';
import { Location } from '../services/LocationService';

interface NavigationButtonProps {
  destination: Location;
}

export function NavigationButton({ destination }: NavigationButtonProps) {
  const startNavigation = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <button 
      className="navigation-button"
      onClick={startNavigation}
    >
      Start Navigation
    </button>
  );
}