import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {UserRoutingModule} from "./user-routing.module";
import {UserListComponent} from "./user-list/user-list.component";
import {NgModule} from "@angular/core";
import { CompanyComponent } from './company/company.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { SupportComponent } from './support/support.component';
import { TracksComponent } from './tracks/tracks.component';
import { AnimationComponent } from './animation/animation.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AboutComponent } from './menulinks/about/about.component';
import { GovernanceComponent } from './menulinks/governance/governance.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    UserListComponent,
    UserCreateComponent,
    CompanyComponent,
    TechnologiesComponent,
    SupportComponent,
    TracksComponent,
    AnimationComponent,
    AboutComponent,
    GovernanceComponent
  ]
})
export class UserModule { }
