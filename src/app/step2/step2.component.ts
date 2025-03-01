import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguratorService } from '../configurator.service';
import { CarOptions, Config } from '../models.type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  public configurator = inject(ConfiguratorService);
  private http = inject(HttpClient);
  
  // Holds the configuration options from the API
  carOptions: CarOptions | null = null;

  ngOnInit(): void {
    const car = this.configurator.car();
    console.log('Selected car in Step2:', car);
    if (car && car.code) {
      // Use a leading slash to ensure the proper endpoint is hit.
      this.http.get<CarOptions>(`/options/${car.code}`).subscribe({
        next: (data) => {
          console.log('Fetched options:', data);
          this.carOptions = data;
          // Reset previous selections for config and extras.
          this.configurator.selectConfig(null);
          this.configurator.yoke.set(false);
          this.configurator.towHitch.set(false);
        },
        error: (err) => console.error('Error fetching options:', err)
      });
    } else {
      console.error('No car selected - cannot fetch options.');
    }
  }

  onConfigChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    console.log('Selected config:', target.value);
    const selectedId = target.value;
    if (!this.carOptions) return;
    const config: Config | undefined = this.carOptions.configs.find(c => c.id === +selectedId);
    console.log('Selected config:', config);
    if (config) {
      this.configurator.selectConfig(config);
    }
  }

  toggleYoke(): void {
    if (this.carOptions?.yoke) {
      this.configurator.toggleYoke();
    }
  }

  toggleTowHitch(): void {
    if (this.carOptions?.towHitch) {
      this.configurator.toggleTowHitch();
    }
  }
}
