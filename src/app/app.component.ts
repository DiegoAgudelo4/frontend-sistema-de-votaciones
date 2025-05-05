import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NabvarComponent } from './core/shared/components/nabvar/nabvar.component';
import { FooterComponent } from "./core/shared/components/footer/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, NabvarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
