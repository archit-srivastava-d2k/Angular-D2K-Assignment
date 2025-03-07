import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConfiguratorService } from './configurator.service';

@Injectable({
  providedIn: 'root'
})
export class Step2Guard implements CanActivate {

  constructor(private router: Router, private configuratorService: ConfiguratorService) { }

  canActivate(): boolean {
    const selectedModel = this.configuratorService.selectedModel();
    const selectedColor = this.configuratorService.selectedColor();

    if (selectedModel && selectedColor) {
      return true;
    } else {
      this.router.navigate(['/step1']);
      return false;
    }
  }

}
