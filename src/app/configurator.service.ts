import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, Color, CarOptions, Config } from './models.type';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  public http = inject(HttpClient);

  // Fetch models and colors from the API
  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>('models'),
    { initialValue: [] }
  );
  readonly allColors: Signal<Color[]> = toSignal(
    this.http.get<Color[]>('colors'),
    { initialValue: [] }
  );

  // Signals holding the selections from Step 1
  readonly currentCar = signal<CarModel | undefined>(undefined);
  readonly selectedColor = signal<Color | string>('');

  // Signals for Step 2 (configurations and extra options)
  readonly availableConfigs = signal<Config[]>([]);
  readonly selectedConfig = signal<Config | undefined>(undefined);
  

  // Signals to indicate if the user has opted for these extras.
  readonly yokeSteeringWheel = signal<boolean>(false);
  readonly towHitch = signal<boolean>(false);

  // Signals to indicate if these options are available for the current model.
  readonly availableYokeSteeringWheel = signal<boolean>(false);
  readonly availableTowHitch = signal<boolean>(false);

  fetchOptionsForModel(modelCode: string): void {
    this.http.get<CarOptions>(`/options/${modelCode}`).subscribe(response => {
      // **Set the available configurations from the API response**
      this.availableConfigs.set(response.configs);
      this.availableYokeSteeringWheel.set(response.yoke);
      this.availableTowHitch.set(response.towHitch);
      // Reset any previously selected configuration and extra options
      this.selectedConfig.set(undefined);
      this.yokeSteeringWheel.set(false);
      this.towHitch.set(false);
    });
  }
}
