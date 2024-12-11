import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { AppError } from './errorHandling';

export async function requestLocationPermission(): Promise<boolean> {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    default: null,
  });

  if (!permission) {
    throw new AppError('Unsupported platform');
  }

  try {
    const result = await check(permission);
    
    switch (result) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.DENIED:
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      default:
        return false;
    }
  } catch (error) {
    throw new AppError('Failed to request location permission');
  }
}