import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { VoteService } from '../../services/vote.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../../core/shared/modals/message/message.component';
import { CandidatesComponent } from "../../../candidates/pages/candidates/candidates.component";

@Component({
  selector: 'app-vote-wizard',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule, CandidatesComponent],
  templateUrl: './vote-wizard.component.html',
  styleUrl: './vote-wizard.component.css'
})
export class VoteWizardComponent implements OnInit {
  emailForm: FormGroup;
  email: string | null = null;
  currentStep = 0;
  validEmail = false
  selectedCandidate: number = 0;

  constructor(
    private fb: FormBuilder,
    private voteService: VoteService,
    private dialog: MatDialog
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    // this.email = this.voteService.getEmail();
  }

  submitEmail() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.voteService.validateEmail(email);

      if (this.emailForm.valid) {
        const email = this.emailForm.value.email;
        this.voteService.validateEmail(email).subscribe({
          next: (res) => {
            if (this.voteService.validatedVoter === null) {
              console.log("no fue validado el email")
              this.validEmail = false;
              return;
            }
            this.validEmail = true;
            this.email = email;
            this.currentStep++;
          },
          error: () => {
            console.log("no fue validado el email");
            this.validEmail = false;
          }
        });
      }
    }
    else {
      this.openMessageDialog("Campo inválido")
    }
  }

  nextStep() {
    this.currentStep++;
  }

  reset() {
    // this.voteService.setEmail('');
    this.emailForm.reset();
    this.currentStep = 0;
  }
  private openMessageDialog(mensaje: string) {
    this.dialog.open(MessageComponent, {
      data: mensaje
    });
  }

  handleCardClick(id: number): void {
    console.log('Recibido en el padre:', id);
    this.selectedCandidate=id;

  }
  vote(): void{
    console.log("Votando...");
    const voter_id = this.voteService.validatedVoter(); 
    const candidate_id = this.selectedCandidate;
    if(voter_id && candidate_id){
      this.voteService.vote(voter_id, candidate_id);
      this.currentStep++;
    }else{
      this.openMessageDialog("Ha ocurrido un error, vuelve a intentarlo.")
    }
  }
  
}
