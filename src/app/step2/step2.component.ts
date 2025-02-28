import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  configs = [
    { name: 'Choose...', range: '', maxSpeed: '', cost: '' },
    { name: 'Rear-Wheel Drive', range: '250 miles', maxSpeed: '120', cost: '$45,990.00' },
    { name: 'Long Range - Dual Motor All-Wheel Drive', range: '310 miles', maxSpeed: '135', cost: '$52,990.00' },
    { name: 'Performance - Dual Motor All-Wheel Drive', range: '280 miles', maxSpeed: '150', cost: '$58,990.00' },
    { name: 'Cyberbeast - Tri Motor All-Wheel Drive', range: '320 miles', maxSpeed: '130', cost: '$99,990.00' }
  ];

  // ✅ Correct Signal Usage
  selectedConfig = signal(this.configs[0]);

  // ✅ Fix: Ensure these properties exist for `ngModel`
  towHitch = false;
  yokeSteeringWheel = false;

  updateConfig(event: Event) {
    const selectedName = (event.target as HTMLSelectElement).value;
    const config = this.configs.find(cfg => cfg.name === selectedName) || this.configs[0];
    
    // ✅ Use `.set()` to update the signal
    this.selectedConfig.set(config);
  }
}
