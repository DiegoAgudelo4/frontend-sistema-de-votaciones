import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Candidate } from '../../../../features/candidates/interfaces/candidato.interfaces';

@Component({
  selector: 'app-candidate-card',
  imports: [MatCardModule],
  templateUrl: './candidate-card.component.html',
  styleUrl: './candidate-card.component.css'
})
export class CandidateCardComponent {
}
