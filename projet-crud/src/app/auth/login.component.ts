import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {Router, RouterLinkActive} from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  submit(form: NgForm) {
    this.loading = true;
    this.error = null;
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        console.log('Login successful — username:', this.auth.getUsername(), 'role:', this.auth.getRole());
        this.router.navigate(['/accueil']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message || 'Login failed';
      }
    });
  }
}
