import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate, CandidatesResponse } from '../interfaces/candidato.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private http = inject(HttpClient);

  constructor() {
    this.loadCandidates();
  }

  candidates = signal<Candidate[]>([]);

  private loadCandidates(): void {
    this.http
      .get<CandidatesResponse>('http://localhost:3000/v1/api/candidates')
      .subscribe({
        next: res => {
          console.log(res.data.candidates)
          this.candidates.set(res.data.candidates);
        },
        error: err => console.error('No se pudieron cargar candidatos', err)
      });
  }
}
