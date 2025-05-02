import { Component, inject } from '@angular/core';
import { VotesService } from '../../services/votes.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseChartDirective } from 'ng2-charts';
import { MatTabsModule } from '@angular/material/tabs';

import { BarController, Chart, LinearScale, LineController, PieController, PointElement } from 'chart.js';

import { CategoryScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement } from 'chart.js';
import { CommonModule } from '@angular/common';

Chart.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineController,
  PieController,
  CategoryScale,
  BarElement,
  LineElement,
  BarController,
  LinearScale,
  PointElement,
);

@Component({
  selector: 'app-votes',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    BaseChartDirective,
    MatTabsModule,
    MatCardModule,
  ],
  templateUrl: './votes.component.html',
  styleUrl: './votes.component.css'
})
export class VotesComponent {
  public statiticsService = inject(VotesService);

  get statitics(){
    return  this.statiticsService.statitics()
  }
  get chartData() {
    return {
      labels: this.statiticsService.statitics().map(item => item.candidate_name),
      datasets: [
        {
          label: 'Total Votes',
          data: this.statiticsService.statitics().map(item => item.total_votes),
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        },
        {
          label: 'Vote Percentage',
          data: this.statiticsService.statitics().map(item => item.vote_percentage || 0),
          backgroundColor: 'rgba(40, 167, 69, 0.5)',
          borderColor: 'rgba(40, 167, 69, 1)',
          borderWidth: 1
        }
      ]
    };
  };
}
