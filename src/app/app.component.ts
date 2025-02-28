import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Step1Component } from './step1/step1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Step1Component
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  name = 'Angular';
}
