import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Session } from '../interfaces/auth.interfaces';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../core/shared/modals/message/message.component';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);

  session = signal<Session | null>(null);
  authenticated = signal<Boolean>(false);

  constructor(private dialog: MatDialog){}

  public login(email: string, password: string) {
    const body = {
      email,
      password
    };
  
    return this.http.post<Session>(`${environment.apiVotersURL}/auth/login`, body)
      .pipe(
        map(res => {
          const { token, role } = res;
          if (token && role) {
            this.session.set(res);
            this.authenticated.set(true);
            console.log("AUTENTICADO");
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
