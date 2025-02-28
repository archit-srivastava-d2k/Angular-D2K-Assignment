import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { ConfiguratorService } from './configurator.service';

export const requireModelAndColorGuard = (): boolean | UrlTree => {
  const router = inject(Router);
  const configurator = inject(ConfiguratorService);
  const model = configurator.currentCar();
  const color = configurator.selectedColor();
  console.log('Guard check:', { model, color });
  
  // Ensure model is defined and color is a non-empty string.
  if (model && typeof color === 'string' && color.trim() !== '') {
    return true;
  }
  
  // Otherwise, redirect to step1.
  return router.parseUrl('/step1');
};
