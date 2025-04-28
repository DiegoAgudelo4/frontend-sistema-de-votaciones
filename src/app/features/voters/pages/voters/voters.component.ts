import { Component, inject } from '@angular/core';
import { VotersService } from '../../services/voters.service';

@Component({
  selector: 'app-voters',
  imports: [],
  templateUrl: './voters.component.html',
  styleUrl: './voters.component.css'
})
export class VotersComponent {
  public voterService = inject(VotersService);
}
