import { StackNavigationProp } from '@react-navigation/stack';
import { View, Button } from 'react-nativescript';
import { MapView } from '../components/MapView';
import { Utils } from '@nativescript/core';

interface NavigationScreenProps {
  navigation: StackNavigationProp<any>;
}

export function NavigationScreen({ navigation }: NavigationScreenProps) {
  // Example destination (Times Square, NYC)
  const destination = {
    latitude: 40.7580,
    longitude: -73.9855
  };

  const startNavigation = () => {
    // Open Google Maps with navigation
    const url = `google.navigation:q=${destination.latitude},${destination.longitude}`;
    Utils.openUrl(url);
  };

  return (
    <View height={{ unit: '%', value: 100 }}>
      <MapView destination={destination} />
      <Button
        text="Start Navigation"
        onTap={startNavigation}
        className="btn btn-primary"
      />
    </View>
  );
}