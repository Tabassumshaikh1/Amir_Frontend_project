import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewMyProfileComponent } from './view-my-profile/view-my-profile.component';
import { UpdateMyProfileComponent } from './update-my-profile/update-my-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewMyProfileComponent, UpdateMyProfileComponent],
  imports: [CommonModule, MyProfileRoutingModule, NgbModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class MyProfileModule {}
