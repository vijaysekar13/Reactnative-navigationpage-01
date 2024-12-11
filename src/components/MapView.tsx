import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import { LocationService, Location } from '../services/LocationService';
import { MAPS_CONFIG } from '../config/constants';
import { handleError } from '../utils/errorHandling';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MapViewProps {
  destination: Location;
}

const defaultLocation: Location = {
  latitude: 40.7128,
  longitude: -74.0060
};

export function MapView({ destination }: MapViewProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_CONFIG.GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initLocation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const location = await LocationService.getCurrentLocation();
        setCurrentLocation(location);
      } catch (err) {
        handleError(err);
        setError(err instanceof Error ? err.message : 'Failed to get location');
        setCurrentLocation(defaultLocation);
        toast.error('Failed to retrieve your location. Using default location.');
      } finally {
        setIsLoading(false);
      }
    };

    initLocation();
  }, []);

  const directionsCallback = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        setDirections(result);
      } else {
        setError('Unable to fetch directions.');
        toast.error('Unable to fetch directions. Please check your inputs.');
      }
    },
    []
  );

  if (!isLoaded || isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading....</p>
      </div>
    );
  }

  const mapLocation: google.maps.LatLngLiteral = {
    lat: currentLocation?.latitude || defaultLocation.latitude,
    lng: currentLocation?.longitude || defaultLocation.longitude
  };

  const destinationLatLng: google.maps.LatLngLiteral = {
    lat: destination.latitude,
    lng: destination.longitude
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapLocation}
        zoom={15}
      >
        <Marker position={mapLocation} title="You are here" />
        <Marker position={destinationLatLng} title="Destination" />
        {currentLocation && (
          <DirectionsService
            options={{
              destination: destinationLatLng,
              origin: mapLocation,
              travelMode: google.maps.TravelMode.DRIVING
            }}
            callback={directionsCallback}
          />
        )}
        {directions && <DirectionsRenderer options={{ directions }} />}
      </GoogleMap>
      <ToastContainer />
    </>
  );
}
