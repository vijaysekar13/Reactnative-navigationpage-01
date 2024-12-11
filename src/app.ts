import { Application } from '@nativescript/core';
import { NavigationScreen } from './screens/NavigationScreen';

Application.run({
  create: () => {
    return NavigationScreen;
  }
});