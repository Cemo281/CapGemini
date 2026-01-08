import { Routes } from '@angular/router';
import { TestComponent } from './pages/test/test.component'
import { AccueilComponent } from './pages/accueil/accueil.component'
import { TerrainsComponent } from './pages/terrains/terrains.component';
import { CoordonneesComponent } from './pages/coordonnees/coordonnees.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';
import { MapComponent } from './app/map/map.component';

export const routes: Routes = [
  { path : 'login', component: LoginComponent },
  { path : '', component : AccueilComponent, canActivate: [AuthGuard] },
  { path : 'test', component : TestComponent, canActivate: [AuthGuard] },
  { path : 'terrains', component : TerrainsComponent, canActivate: [AuthGuard] },
  { path : 'coordonnees', component : CoordonneesComponent, canActivate: [AuthGuard] },
  { path : 'utilisateurs', component : UtilisateursComponent, canActivate: [AuthGuard] },
  { path : 'map', component : MapComponent, canActivate: [AuthGuard] }
];
