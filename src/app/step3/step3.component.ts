import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit {
  public configuratorService = inject(ConfiguratorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isOrderRoute = false;

  // Properties for the template
  modelDescription = '';
  colorDescription = '';
  configDescription = '';
  configPrice = 0;
  colorPrice = 0;
  yokePrice = 1000; // Example price
  towHitchPrice = 1000; // Example price

  // Expose service signals to the template
  selectedModel = this.configuratorService.selectedModel;
  selectedColor = this.configuratorService.selectedColor;
  selectedConfig = this.configuratorService.selectedConfig;
  yokeAvailable = this.configuratorService.yokeAvailable;
  towHitchAvailable = this.configuratorService.towHitchAvailable;
  selectedYoke = this.configuratorService.selectedYoke;
  selectedTowHitch = this.configuratorService.selectedTowHitch;
  totalPrice = this.configuratorService.totalPrice;

  ngOnInit() {
    // Set initial values
    this.updateDisplayValues();

    // Check if we're on the order route
    this.checkIfOrderRoute();

    // Subscribe to route changes to update the isOrderRoute flag
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkIfOrderRoute();
    });
  }

  private checkIfOrderRoute() {
    const url = this.router.url;
    this.isOrderRoute = url.includes('/step3/order');
  }

  private updateDisplayValues() {
    if (this.selectedModel()) {
      this.modelDescription = this.selectedModel()?.description || '';
    }

    if (this.selectedColor()) {
      this.colorDescription = this.selectedColor()?.description || '';
      this.colorPrice = this.selectedColor()?.price || 0;
    }

    if (this.selectedConfig()) {
      this.configDescription = this.selectedConfig()?.description || '';
      this.configPrice = this.selectedConfig()?.price || 0;
    }
  }
}
