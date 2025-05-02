import { Component, inject } from '@angular/core';
import { VotersService } from '../../services/voters.service';
import { MatTableModule } from '@angular/material/table'; // Importar MatTableModule
import { MatCheckboxModule } from '@angular/material/checkbox'; // Si deseas agregar un checkbox
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-voters',
  imports: [MatTableModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './voters.component.html',
  styleUrl: './voters.component.css'
})
export class VotersComponent {
  public voterService = inject(VotersService);
}
