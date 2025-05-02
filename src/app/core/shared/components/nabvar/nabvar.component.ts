import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from '../../../../features/login/services/login.service';

@Component({

  selector: 'app-nabvar',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'

})
export class NabvarComponent{
  private authservice = inject(LoginService);

  constructor(public router: Router) { }

  isAuthRoute(): boolean {
    if(this.router.url.startsWith('/auth') ){
      return true;
    }
    if(this.router.url === '/'){
      return true;
    }
    return false;
  }
  
  onLogout():void{
    this.authservice.logOut();
    this.router.navigate(['/auth']);
  }

}
