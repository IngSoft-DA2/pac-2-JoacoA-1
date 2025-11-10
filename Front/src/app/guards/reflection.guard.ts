import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ReflectionCounterService } from '../services/reflection-counter.service';

@Injectable({ providedIn: 'root' })
export class ReflectionGuard implements CanActivate {
  constructor(private counter: ReflectionCounterService, private router: Router) { }

  canActivate(): boolean {
    console.log('[ReflectionGuard] before check, counter =', this.counter.value);

    if (this.counter.value >= 20) {
      console.warn('[ReflectionGuard] access blocked, counter >= 20');
      this.router.navigate(['/']); // redirige al inicio
      return false;
    }

    this.counter.increment();
    console.log('[ReflectionGuard] access allowed, new counter =', this.counter.value);
    return true;
  }
}
