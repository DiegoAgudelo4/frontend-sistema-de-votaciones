import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/pages/login/login.component';
import { RegisterComponent } from './features/login/pages/register/register.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { VotesComponent } from './features/votes/pages/votes/votes.component';
import { CandidatesComponent } from './features/candidates/pages/candidates/candidates.component';
import { VotersComponent } from './features/voters/pages/voters/voters.component';
import { NotFoundComponent } from './core/shared/components/not-found/not-found.component';
import { AuthGuard } from './features/login/services/auth.guard';
import { VoteComponent } from './features/vote/pages/vote/vote.component';
import { VoteWizardComponent } from './features/vote/pages/wizard/vote-wizard.component';

export const routes: Routes = [
  {

    path:'auth',
    children:[
      {
        path:'**',
        component: LoginComponent,
        
      },
      {
        path:'login',
        component: LoginComponent,
      },
      {
        path:'register',
        component: RegisterComponent,
      },
    ]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'votes',
    component: VotesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'voters',
    component: VotersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'candidates',
    component: CandidatesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'',
    component: VoteWizardComponent,
  },
  {
    path:'**',
    component: NotFoundComponent,
  }
];
