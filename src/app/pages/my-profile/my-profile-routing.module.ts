import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMyProfileComponent } from './view-my-profile/view-my-profile.component';
import { UpdateMyProfileComponent } from './update-my-profile/update-my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ViewMyProfileComponent,
  },
  {
    path: 'edit',
    component: UpdateMyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfileRoutingModule {}
