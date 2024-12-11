import { describe, it, expect, vi } from 'vitest';
import { LocationService } from '../LocationService';

describe('LocationService', () => {
  it('should get current location when permissions are granted', async () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    };

    global.navigator.geolocation = {
      getCurrentPosition: vi.fn().mockImplementation((success) => 
        success(mockPosition)
      )
    } as any;

    const location = await LocationService.getCurrentLocation();
    
    expect(location).toEqual({
      latitude: 40.7128,
      longitude: -74.0060
    });
  });

  it('should throw error when geolocation is not supported', async () => {
    global.navigator.geolocation = undefined;

    await expect(LocationService.getCurrentLocation()).rejects.toThrow(
      'Geolocation is not supported by your browser'
    );
  });
});