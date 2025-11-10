import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReflectionCounterService {
  private _count = 0;

  increment(): void {
    this._count++;
  }

  reset(): void {
    this._count = 0;
  }

  get value(): number {
    return this._count;
  }
}
