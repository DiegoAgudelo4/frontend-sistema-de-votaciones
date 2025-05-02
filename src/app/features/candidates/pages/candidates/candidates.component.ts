import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { Candidate } from '../../interfaces/candidato.interfaces';
import { CandidatesService } from '../../services/candidates.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  imports: [
    CommonModule
  ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {
  @Output() cardClicked = new EventEmitter<number>();
  cardSelected: number = 0;
  public candidatesService = inject(CandidatesService);
  public router=inject(Router);

  isVoteRoute(): boolean{
    if(this.router.url === '/'){
      return false
    }else{
      return true
    }
  }

  logCandidateId(id: number): void {
    console.log('Card clickeada, ID:', id);
    this.cardSelected=id;
    this.cardClicked.emit(id);  
  }
}
