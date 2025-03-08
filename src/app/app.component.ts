import { Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  configurator = inject(ConfiguratorService);
  router = inject(Router);

  constructor() {
    effect(() => {
      const theme = this.configurator.theme();
      document.body.classList.toggle('dark', theme === 'dark');
   } );
  }
  toggleTheme() {
    this.configurator.toggleTheme();
  }
}
