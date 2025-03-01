import { Injectable, signal } from '@angular/core';
import { CarModel, Color, CarOptions, Config, SelectedConfig } from './models.type';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfiguratorService {
  constructor(private http: HttpClient) {}

  car = signal<CarModel | null>(null);
  color = signal<Color | null>(null);

  config = signal<Config | null>(null);
  yoke = signal<boolean>(false);
  towHitch = signal<boolean>(false);

  availableConfigs = signal<Config[]>([]);
  availableYoke = signal<boolean>(false);
  availableTowHitch = signal<boolean>(false);

  selectCar(car: CarModel) {
    this.car.set(car);
  }
  
  selectColor(color: Color | null = null) {
    this.color.set(color);
  }
  
  selectConfig(config: Config | null) {
    this.config.set(config);
  }
  
  toggleYoke() {
    this.yoke.set(!this.yoke());
  }
  
  toggleTowHitch() {
    this.towHitch.set(!this.towHitch());
  }
  
  fetchOptionsForModel(modelCode: string): void {
    this.http.get<CarOptions>(`/options/${modelCode}`).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.availableConfigs.set(response.configs);
        this.availableYoke.set(response.yoke);
        this.availableTowHitch.set(response.towHitch);
        this.selectConfig(null);
        this.yoke.set(false);
        this.towHitch.set(false);
      },
      error: (err) => console.error('Error fetching options:', err)
    });
  }
  
  getSelectedConfig(): SelectedConfig {
    return {
      car: this.car() || { code: '', description: '', colors: [] },
      color: this.color() || { code: '', description: '', price: 0 },
      config: this.config() || { id: 0, description: '', range: 0, speed: 0, price: 0 },
      yoke: this.yoke(),
      towHitch: this.towHitch()
    };
  }
}
