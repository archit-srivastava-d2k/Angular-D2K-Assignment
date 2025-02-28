import {inject, Injectable, signal, Signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {CarModel} from './models.type';
import { Color } from './models.type';
@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  public http = inject(HttpClient);
  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>('models'),
    { initialValue: [] }
  );
  readonly allColors: Signal<Color[]> = toSignal(
    this.http.get<Color[]>('colors'),
    { initialValue: [] }
  );
  

  // Signals to hold the current car and selected color.
  readonly currentCar = signal<CarModel | undefined>(undefined);
  readonly selectedColor = signal<Color | string>('');

}
