import { Component, computed, inject, Output } from '@angular/core';
import { Candidate } from '../../interfaces/candidato.interfaces';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-candidates',
  imports: [],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {
    public candidatesService = inject(CandidatesService);

    // Accede a los candidatos como una signal computada
    // @Output() candidate = this.candidatesService.candidates
}
