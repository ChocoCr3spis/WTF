import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';

const CrowdBeatTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{purple.50}',
      100: '{purple.100}',
      200: '{purple.200}',
      300: '{purple.300}',
      400: '{purple.400}',
      500: '{purple.500}',
      600: '{purple.600}',
      700: '{purple.700}',
      800: '{purple.800}',
      900: '{purple.900}'
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
    provideRouter(routes),
    provideAnimations(),    
    providePrimeNG({
      theme: {
        preset: CrowdBeatTheme,
        options: {
          darkModeSelector: 'system'
        }
      },
      ripple: true
    })
  ]
};
