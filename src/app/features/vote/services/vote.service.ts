import { inject, Injectable, signal } from '@angular/core';
import { ValidateResponse, VoteResponse } from '../interfaces/vote.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../core/shared/modals/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  isLoading = signal<boolean>(false);

  validatedVoter = signal<number | null>(null);

  constructor() { }

  public validateEmail(email:string){
    const encodedEmail = encodeURIComponent(email);
    return this.http.get<ValidateResponse>(`${environment.apiVotersURL}/voters/search/`+encodedEmail)
    .pipe(
      map(res => {
        console.log(JSON.stringify(res.data));
        this.validatedVoter.set(res.data.id);
        console.log("Validado con id:"+res.data.id)
        this.openMessageDialog("Bienvenido "+ res.data.name);
        return res.data;
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
    )
  }

  public vote(voter_id: number, candidate_id: number) {
    const body = {
      voter_id,
      candidate_id
    };

    this.isLoading.set(true);

    return this.http.post<VoteResponse>(`${environment.apiVotersURL}/votes`, body)
      .pipe(
        map(res => {
          console.log(JSON.stringify(res.data));
          this.openMessageDialog("Voto realizado con éxito:\n" + "ID: " + res.data.id +"\n"+"Has votado a candidato: "+res.data.candidate_id);
          return res.data;
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
      ).subscribe()
  }

  private openMessageDialog(mensaje: string) {
    this.dialog.open(MessageComponent, {
      data: mensaje
    });
  }
}
