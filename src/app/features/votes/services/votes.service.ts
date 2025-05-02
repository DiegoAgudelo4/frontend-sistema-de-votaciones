import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Statitic, StatiticsResponse } from '../interfaces/votes.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MessageComponent } from '../../../core/shared/modals/message/message.component';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private authsservice = inject(LoginService);

  statitics = signal<Statitic[]>([]);

  private getToken(): string | null {
    return this.authsservice.session()?.token ?? null;
  }
  constructor() {
    this.loadVotes();
  }

  public loadVotes() {

    const token = this.getToken();
    console.log("TOKEN:" + token);

    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
    console.log("HEADERS: " + headers);

    return this.http.get<StatiticsResponse>(`${environment.apiVotersURL}/votes/statistics`, { headers })
      .pipe(
        map(res => {
          console.log(">response:" + res.data)
          console.log(">statitics: " + JSON.stringify(res.data.statitics));

          this.statitics.set(res.data.statitics);
          return res;
        }),
        catchError(err => {
          const code = err.status;
          console.error("ERROR:" + err);
          if (code === 403) {
            this.authsservice.logOut();
          } else
            if (code >= 400 && code < 500) {
              this.openMessageDialog(err.error.message);
            } else {
              this.openMessageDialog("Servidor desconectado. Inténtalo nuevamente más tarde");
            }
          return throwError(() => err);
        })
      ).subscribe();


  }

  private openMessageDialog(mensaje: string) {
    this.dialog.open(MessageComponent, {
      data: mensaje
    });
  }
}
