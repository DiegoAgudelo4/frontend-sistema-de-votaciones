import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { VoteService } from '../../services/vote.service';
import { MessageComponent } from '../../../../core/shared/modals/message/message.component';

@Component({
  selector: 'app-vote',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css'
})
export class VoteComponent {
  private voteService = inject(VoteService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      voter_id: [0],
      candidate_id: [0],
    });
  }

  onSubmit() {
    const { voter_id, candidate_id } = this.loginForm.value;
    if (!voter_id || !candidate_id) {
      this.openMessageDialog("Se deben rellenar todos los campos");
      return;
    }
    console.log("Submit")
    this.voteService.vote(voter_id, candidate_id);

  };
  get isLoading() {
    return this.voteService.isLoading();
  }
  private openMessageDialog(mensaje: string) {
    this.dialog.open(MessageComponent, {
      data: mensaje
    });
  }
}
