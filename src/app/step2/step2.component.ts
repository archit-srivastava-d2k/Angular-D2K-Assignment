import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorService } from '../configurator.service';
import { CarModel, Color, CarOptions, Config, SelectedConfig } from '../models.type';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  public configuratorService = inject(ConfiguratorService);

  // Getters for selected model and color information
  get modelCode(): string {
    return this.configuratorService.selectedModel()?.code || '';
  }

  get modelDescription(): string {
    return this.configuratorService.selectedModel()?.description || '';
  }

  get colorDescription(): string {
    return this.configuratorService.selectedColor()?.description || '';
  }

  // Expose service signals to the template
  selectedModel = this.configuratorService.selectedModel;
  selectedColor = this.configuratorService.selectedColor;
  selectedConfig = this.configuratorService.selectedConfig;
  availableConfigs = this.configuratorService.availableConfigs;
  yokeAvailable = this.configuratorService.yokeAvailable;
  towHitchAvailable = this.configuratorService.towHitchAvailable;
  selectedYoke = this.configuratorService.selectedYoke;
  selectedTowHitch = this.configuratorService.selectedTowHitch;
  totalPrice = this.configuratorService.totalPrice;
  imageUrl = this.configuratorService.imageUrl;  // Add imageUrl

  // Event handlers for form controls
  onConfigChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const configId = target.value;
    if (configId) {
      const configIdNum = Number(configId);
      const config = this.availableConfigs().find(c => c.id === configIdNum);
      if (config) {
        this.configuratorService.setSelectedConfig(config);
      }
    } else {
      // Handle the case when no config is selected
      this.configuratorService.selectedConfig.set(undefined);
    }
  }

  onYokeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.configuratorService.setSelectedYoke(target.checked);
  }

  onTowHitchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.configuratorService.setSelectedTowHitch(target.checked);
  }
}
