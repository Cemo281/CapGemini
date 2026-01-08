import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'projet-crud';
  pageTitle = 'PolyGEMIMI';
  showSubtitle = true;

  private titleMap: { [key: string]: string } = {
    '/': 'PolyGEMIMI',
    '/terrains': 'Gestion des Terrains',
    '/coordonnees': 'Gestion des Coordonnées',
    '/utilisateurs': 'Gestion des Utilisateurs',
    '/map': 'Carte Interactive',
    '/login': 'PolyGEMIMI'
  };

  isDarkMode = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.pageTitle = this.titleMap[url] || 'PolyGEMIMI';
      this.showSubtitle = url === '/';
    });

    // Initialize theme based on preference or default
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
