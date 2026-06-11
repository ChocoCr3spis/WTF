import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';

const WtfTheme = definePreset(Aura, {
  semantic: {
    // Rojo de marca (#CD1C18) como color primario.
    primary: {
      50: '#fdeceb',
      100: '#fbd0ce',
      200: '#f3a3a0',
      300: '#ea7672',
      400: '#df4843',
      500: '#cd1c18',
      600: '#b01713',
      700: '#8c1210',
      800: '#680d0b',
      900: '#450807'
    },
    surface: {
      0: '{slate.0}',
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}'
    }
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: WtfTheme,
        options: {
          darkModeSelector: 'system'
        }
      },
      ripple: true
    })
  ]
};
