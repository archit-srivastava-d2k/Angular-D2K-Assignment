import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguratorService } from '../configurator.service';
import { Config } from '../models.type';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {
  public configurator = inject(ConfiguratorService);

  // Alias signals from the service for ease of use.
  availableConfigs = this.configurator.availableConfigs;
  selectedConfig = this.configurator.selectedConfig;
  yokeSteeringWheel = this.configurator.yokeSteeringWheel;
  towHitch = this.configurator.towHitch;
  availableYokeSteeringWheel = this.configurator.availableYokeSteeringWheel;
  availableTowHitch = this.configurator.availableTowHitch;

  constructor() {
    // When Step 2 loads, if a car is selected then fetch its configuration options.
    const car = this.configurator.currentCar();
    if (car && car.code) {
      this.configurator.fetchOptionsForModel(car.code);
    }
  }
  

  // Called when the user selects a configuration from the dropdown.
  updateConfig(event: Event): void {
    const configDescription = (event.target as HTMLSelectElement).value;
    const config: Config | undefined = this.availableConfigs().find(
      cfg => cfg.description === configDescription
    );
    console.log(config)
    console.log(configDescription)
    this.configurator.selectedConfig.set(config);
  }
  

}
