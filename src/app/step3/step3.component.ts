import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  public configuratorService = inject(ConfiguratorService);

  // Expose service signals to the template
  selectedModel = this.configuratorService.selectedModel;
  selectedColor = this.configuratorService.selectedColor;
  selectedConfig = this.configuratorService.selectedConfig;
  selectedYoke = this.configuratorService.selectedYoke;
  selectedTowHitch = this.configuratorService.selectedTowHitch;
  yokeAvailable = this.configuratorService.yokeAvailable;
  towHitchAvailable = this.configuratorService.towHitchAvailable;
  totalPrice = this.configuratorService.totalPrice;

  // Computed getters for the template
  get modelDescription(): string {
    return this.configuratorService.selectedModel()?.description || '';
  }

  get colorDescription(): string {
    return this.configuratorService.selectedColor()?.description || '';
  }

  get colorPrice(): number {
    return this.configuratorService.selectedColor()?.price || 0;
  }

  get configDescription(): string {
    return this.configuratorService.selectedConfig()?.description || '';
  }

  get configPrice(): number {
    return this.configuratorService.selectedConfig()?.price || 0;
  }

  get yokePrice(): number {
    return this.configuratorService.yokeAvailable() && this.configuratorService.selectedYoke() ? 1000 : 0;
  }

  get towHitchPrice(): number {
    return this.configuratorService.towHitchAvailable() && this.configuratorService.selectedTowHitch() ? 1000 : 0;
  }
}
