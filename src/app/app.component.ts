import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NabvarComponent } from './core/shared/components/nabvar/nabvar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, NabvarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
