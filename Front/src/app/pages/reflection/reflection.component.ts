import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reflection.component.html',
  styleUrls: ['./reflection.component.css']
})
export class ReflectionComponent {
  dlls: string[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  loadDlls() {
    this.loading = true;
    this.error = null;

    this.http.get<string[]>('http://localhost:7152/api/reflection/importers').subscribe({
      next: (data) => {
        this.dlls = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar las DLLs';
        this.loading = false;
      }
    });
  }
}
