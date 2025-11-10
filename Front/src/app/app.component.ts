import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ConsignaComponent } from './shared/components/consigna/consigna.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ConsignaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';
}
