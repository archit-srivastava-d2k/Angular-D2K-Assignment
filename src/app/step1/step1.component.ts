// step1.component.ts
import { Component, effect, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorService } from '../configurator.service';
import { CommonModule, CurrencyPipe } from '@angular/common';  // Import CurrencyPipe

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CurrencyPipe  // Add CurrencyPipe
  ],
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  private configuratorService = inject(ConfiguratorService);

  // Expose signals to the template
  allModels = this.configuratorService.allModels;
  availableColors = this.configuratorService.availableColors;
  selectedModel = this.configuratorService.selectedModel;
  selectedColor = this.configuratorService.selectedColor;
  imageUrl = this.configuratorService.imageUrl;  // Add imageUrl

  ngOnInit() {
    // If there's a selected model but no selected color, select the first color
    if (this.selectedModel() && !this.selectedColor() && this.availableColors().length > 0) {
      this.configuratorService.setSelectedColor(this.availableColors()[0]);
    }
  }

  onModelChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedModelCode = target.value;
    const model = this.allModels().find(m => m.code === selectedModelCode);
    if (model) {
      this.configuratorService.setSelectedModel(model);

      // Automatically select the first color when a model is selected
      if (model.colors && model.colors.length > 0) {
        this.configuratorService.setSelectedColor(model.colors[0]);
      }
    }
  }

  onColorChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedColorCode = target.value;
    const color = this.availableColors().find(color => color.code === selectedColorCode);
    if (color) {
      this.configuratorService.setSelectedColor(color);
    }
  }

  constructor() {
    console.log(this.configuratorService.allModels());
    console.log(this.configuratorService.allModels().map((car: any) => car.code));
    effect(() => {
      console.log(this.configuratorService.selectedModel()?.code);
      console.log(this.configuratorService.selectedColor()?.code);
    });
  }
}

