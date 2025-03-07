import { inject, Injectable, signal, Signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CarModel, CarOptions, Color, Config, SelectedConfig } from './models.type';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  private http = inject(HttpClient);

  // Signal for all car models
  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>('models'),
    { initialValue: [] }
  );

  // Signals for selected model and color
  readonly selectedModel = signal<CarModel| undefined>(undefined);
  readonly selectedColor = signal<Color | undefined>(undefined);
  readonly code = this.selectedModel()?.code;

  // Signal for car options
  private carOptionsSubject = new BehaviorSubject<string | null>(null);

  readonly carOptions = signal<CarOptions | undefined>(undefined);
  readonly selectedConfig = signal<Config | undefined>(undefined);
  readonly yokeAvailable = signal<boolean>(false);
  readonly towHitchAvailable = signal<boolean>(false);
  readonly selectedYoke = signal<boolean>(false);
  readonly selectedTowHitch = signal<boolean>(false);

  // Computed signal for available colors
  readonly availableColors = computed(() => {
    const model = this.selectedModel();
    return model ? model.colors : [];
  });

  // Computed signal for available configs
  readonly availableConfigs = computed(() => {
    return this.carOptions()?.configs || [];
  });

  constructor() {
    // Load car options when model changes
    effect(() => {
      const model = this.selectedModel();
      if (model) {
        this.loadCarOptions(model.code);
      } else {
        this.resetOptions();
      }
    });
  }

  // Methods to update selections
  setSelectedModel(model: CarModel) {
    this.selectedModel.set(model);
    this.selectedConfig.set(undefined);
    this.selectedYoke.set(false);
    this.selectedTowHitch.set(false);
  }

  setSelectedColor(color: Color) {
    this.selectedColor.set(color);
  }

  setSelectedConfig(config: Config) {
    this.selectedConfig.set(config);
  }

  setSelectedYoke(selected: boolean) {
    this.selectedYoke.set(selected);
  }

  setSelectedTowHitch(selected: boolean) {
    this.selectedTowHitch.set(selected);
  }

  // Load car options for a specific model
  loadCarOptions(modelCode: string): void {
    this.http.get<CarOptions>(`options/${modelCode}`).pipe(
      tap((options: CarOptions) => {
        this.carOptions.set(options);
        this.yokeAvailable.set(options.yoke);
        this.towHitchAvailable.set(options.towHitch);
      })
    ).subscribe();
  }

  // Reset options when model changes
  private resetOptions(): void {
    this.carOptions.set(undefined);
    this.selectedConfig.set(undefined);
    this.yokeAvailable.set(false);
    this.towHitchAvailable.set(false);
    this.selectedYoke.set(false);
    this.selectedTowHitch.set(false);
  }

  // Calculate total price
  readonly totalPrice = computed(() => {
    let total = 0;

    // Add color price
    const color = this.selectedColor();
    if (color) {
      total += color.price;
    }

    // Add config price
    const config = this.selectedConfig();
    if (config) {
      total += config.price;
    }

    // Add yoke price if selected and available
    if (this.yokeAvailable() && this.selectedYoke()) {
      total += 1000; // Yoke costs $1,000
    }

    // Add tow hitch price if selected and available
    if (this.towHitchAvailable() && this.selectedTowHitch()) {
      total += 1000; // Tow hitch costs $1,000
    }

    return total;
  });

  // Computed signal for image URL.
  readonly imageUrl = computed(() => {
    const model = this.selectedModel();
    const color = this.selectedColor();
    if (model && color) {
      return `https://interstate21.com/tesla-app/images/${model.code}/${color.code}.jpg`;
    }
    return '';
  });
}
