import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfiguratorService } from '../../configurator.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  authService = inject(ConfiguratorService);
  router = inject(Router);

  onLogin(): void {
    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/step1']);
    }
  }
}
