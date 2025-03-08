import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConfiguratorService } from './configurator.service';

export const Step3Guard: CanActivateFn = () => {
  const configuratorService = inject(ConfiguratorService);
  const router = inject(Router);

  // Check if model, color, and config are selected
  const modelSelected = !!configuratorService.selectedModel();
  const colorSelected = !!configuratorService.selectedColor();
  const configSelected = !!configuratorService.selectedConfig();

  if (modelSelected && colorSelected && configSelected) {
    return true;
  } else {
    // Redirect to step1 if model or color is not selected
    if (!modelSelected || !colorSelected) {
      router.navigate(['/step1']);
    }
    // Redirect to step2 if config is not selected
    else if (!configSelected) {
      router.navigate(['/step2']);
    }
    return false;
  }
};
