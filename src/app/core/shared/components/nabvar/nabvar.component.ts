import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({

  selector: 'app-nabvar',
  imports: [RouterLink,RouterLinkActive,  MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'

})
export class NabvarComponent {
  constructor(public router: Router) {}

  isAuthRoute(): boolean {
    return this.router.url.startsWith('/auth');
  }
}
