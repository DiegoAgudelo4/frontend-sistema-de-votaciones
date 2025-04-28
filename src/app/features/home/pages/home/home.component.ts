import { Component, inject } from '@angular/core';
import { CandidatesComponent } from '../../../candidates/pages/candidates/candidates.component';
import { LoginService } from '../../../login/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CandidatesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // private session = inject(LoginService);
  // private router = inject(Router);

  // constructor() {
  //   this.validateSession()
  // }
  // private validateSession() {
  //   if (!this.session.authenticated()) {
  //     this.router.navigate(['/auth/login']);
  //   }
  // }

}
