import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {CompanyComponent} from './company/company.component';
import {TechnologiesComponent} from './technologies/technologies.component';
import {SupportComponent} from './support/support.component';
import {HomeComponent} from '../home/home.component';
import {TracksComponent} from './tracks/tracks.component';
import {SigninComponent} from '../auth/signin/signin.component';
import {SignupComponent} from '../auth/signup/signup.component';
import {AuthGuard} from '../auth/auth-guard.service';
import {AnimationComponent} from './animation/animation.component';
import {AboutComponent} from './menulinks/about/about.component';
import {GovernanceComponent} from './menulinks/governance/governance.component';

const routes: Routes = [
  // { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserListComponent },
  { path: 'create', component: UserCreateComponent },
  { path: 'user/edit/:id', component: UserCreateComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'tech', component: TechnologiesComponent },
  { path: 'support', component: SupportComponent },
  { path: 'tracks', component: TracksComponent },
  { path: 'animations', component: AnimationComponent },

  { path: 'about', component: AboutComponent },
  { path: 'governance', component: GovernanceComponent },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
