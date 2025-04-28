import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Voter, VotersResponse } from '../interfaces/voters.interfaces';

@Injectable({
  providedIn: 'root'
})
export class VotersService {

  constructor(private http: HttpClient) {
    this.loadVoters();
  }

  candidates = signal<Voter[]>([]);

  private loadVoters(): void {
      this.http
        .get<VotersResponse>(`${environment.apiVotersURL}/voters`)
        .subscribe({
          next: res => {
            this.candidates.set(res.data.voters);
          },
          error: err => console.error('No se pudieron cargar candidatos', err)
        });
    }
}
