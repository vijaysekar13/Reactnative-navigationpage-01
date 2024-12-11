# Location Navigation App

A React Native application that displays user location and provides navigation features using Google Maps API.

## Features

- Display user's current location on a map
- Show navigation route to a predefined destination
- Open navigation in Google Maps
- Error handling for location permissions
- Cross-platform support (iOS & Android)

## Prerequisites

- Node.js (v14 or higher)
- React Native development environment
- Google Maps API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/location-navigation-app.git
cd location-navigation-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google Maps API key:

   a. Get an API key from [Google Cloud Console](https://console.cloud.google.com/)
   b. Enable the following APIs:
      - Maps JavaScript API
      - Directions API
      - Places API
   
   c. Add your API key to `src/config/constants.ts`:
   ```typescript
   export const MAPS_CONFIG = {
     GOOGLE_MAPS_API_KEY: 'YOUR_API_KEY_HERE',
     // ...
   };
   ```

4. Configure platform-specific settings:

   ### Android
   Add your API key to `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="YOUR_API_KEY_HERE"/>
   ```

   ### iOS
   Add your API key to `ios/YourApp/AppDelegate.m`:
   ```objective-c
   [GMSServices provideAPIKey:@"YOUR_API_KEY_HERE"];
   ```

## Running the App

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## Testing
```bash
npm test
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/         # Screen components
├── services/        # Business logic and API calls
├── config/          # Configuration files
├── utils/          # Helper functions
└── types/          # TypeScript type definitions
```

## Error Handling

The app handles various error scenarios:
- Location permission denied
- Location unavailable
- Network errors
- API failures

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.