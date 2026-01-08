import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    console.log('Attempting login with username:', this.username);
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        console.log('Login successful. Redirecting...');
        console.log('User role:', this.auth.getRole());
        console.log('Is admin:', this.auth.isAdmin());
        this.router.navigate(['']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message || 'Login failed';
        console.error('Login error:', err);
      }
    });
  }
}
