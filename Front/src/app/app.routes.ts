import { Routes } from '@angular/router';
import { ConsignaComponent } from './shared/components/consigna/consigna.component';
import { ReflectionComponent } from './pages/reflection/reflection.component';
import { ReflectionGuard } from './guards/reflection.guard';

export const routes: Routes = [
  { path: '', component: ConsignaComponent },
  { path: 'reflection', component: ReflectionComponent, canActivate: [ReflectionGuard] },
  { path: '**', redirectTo: '' }
];
