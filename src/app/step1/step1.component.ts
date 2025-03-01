import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguratorService } from '../configurator.service';
import { CarModel, Color } from '../models.type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {
  public configurator = inject(ConfiguratorService);
  private http = inject(HttpClient);
  
  carModels: CarModel[] = [];

  constructor() {
    this.http.get<CarModel[]>('models').subscribe(data => {
      this.carModels = data;
    });
  }

  selectCar(event: Event) {
    const target = event.target as HTMLSelectElement;
    const carCode = target.value;
    const selectedCar = this.carModels.find(car => car.code === carCode);
    
    if (selectedCar) {
      this.configurator.selectCar(selectedCar);
      console.log('Selected car:', selectedCar);

      if (selectedCar.colors.length > 0) {
        this.configurator.selectColor(selectedCar.colors[0]);
      } else {
        this.configurator.selectColor();
      }
    }
  }

  // Select Color
  selectColor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const colorCode = target.value;
    const car = this.configurator.car();
    
    if (car) {
      const selectedColor = car.colors.find(c => c.code === colorCode);
      if (selectedColor) {
        this.configurator.selectColor(selectedColor);
      }
    }
  }
}
