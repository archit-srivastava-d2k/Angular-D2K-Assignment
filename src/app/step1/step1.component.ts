import { Component, inject, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfiguratorService } from '../configurator.service';
import { CarModel, Color } from '../models.type';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {
  // Inject the configurator service.
  public configurator = inject(ConfiguratorService);

  // Use the models signal from the service.
  readonly models = this.configurator.allModels;

  // Access the selected model from the service.
  get selectedModel() {
    return this.configurator.currentCar();
  }

  // Computed signal that returns available colors based on the selected model.
  availableColors = computed(() => {
    const currentModel = this.selectedModel;
    if (!currentModel) return [];
    return currentModel.colors.map(c => c.code + '.jpg');
  });

  // Computed signal that constructs the image URL from the selections.
  imageUrl = computed(() => {
    const model = this.selectedModel;
    const color = this.configurator.selectedColor();
    if (!model || !color) return '';
    return `https://interstate21.com/tesla-app/images/${model.code}/${color}`;
  });

  // When the model changes, update the selected model and reset the color.
  onModelChange(event: Event): void {
    const modelCode = (event.target as HTMLSelectElement).value;
    const selectedModel = this.models().find(m => m.code === modelCode);
    this.configurator.currentCar.set(selectedModel);

    // Reset color to first available color
    if (selectedModel && selectedModel.colors.length > 0) {
      this.configurator.selectedColor.set(selectedModel.colors[0].code + '.jpg');
    } else {
      this.configurator.selectedColor.set('');
    }
  }

  // Update the selected color.
  onColorChange(event: Event): void {
    const color = (event.target as HTMLSelectElement).value;
    this.configurator.selectedColor.set(color);
  }
}
