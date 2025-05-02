import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Session } from '../interfaces/auth.interfaces';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../core/shared/modals/message/message.component';
import { catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);

  session = signal<Session | null>(null);
  authenticated = signal<Boolean>(false);
  isLoading = signal<Boolean>(false);

  constructor(private dialog: MatDialog) { }

  public isAuth() {
    this.isLoading.set(true)
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      this.authenticated.set(true);
      this.session.set({token, role });
    }
    this.isLoading.set(false)
  }
  public logOut(){
    this.authenticated.set(false);
    this.session.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  public login(email: string, password: string) {
    const body = {
      email,
      password
    };

    this.isLoading.set(true);

    return this.http.post<Session>(`${environment.apiVotersURL}/auth/login`, body)
      .pipe(
        map(res => {
          const { token, role } = res;
          if (token && role) {
            this.session.set(res);
            this.authenticated.set(true);
            //Guardar en localstorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            console.log("Credenciales guardados!!")
            this.isLoading.set(false);
            return res;
          } else {
            throw new Error("Error al iniciar sesión");
          }
        }),
        catchError(err => {
          const code = err.status;
          if (code >= 400 && code < 500) {
            this.openMessageDialog(err.error.message);
          } else {
            this.openMessageDialog("Servidor desconectado. Inténtalo nuevamente más tarde");
          }
          this.isLoading.set(false);
          return throwError(() => err);
        })
      );
  }

  private openMessageDialog(mensaje: string) {
    this.dialog.open(MessageComponent, {
      data: mensaje
    });
  }
}
