import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfiguratorService } from '../../configurator.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email = '';
  password = '';
  authService = inject(ConfiguratorService);
  router = inject(Router);

  onSignup(): void {
    const success = this.authService.signup(this.email, this.password);
    if (success) {
      this.router.navigate(['/login']);
    }
  }

}
