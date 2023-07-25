import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HodDashboardComponent } from './components/hod-dashboard/hod-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { TableComponent } from './components/table/table.component';
import { UserImgComponent } from './components/user-img/user-img.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PasswordConfirmModalComponent } from './components/password-confirm-modal/password-confirm-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';

@NgModule({
  declarations: [
    AddUserFormComponent,
    SidebarComponent,
    HeaderComponent,
    UserImgComponent,
    StaffDashboardComponent,
    HodDashboardComponent,
    TableComponent,
    ConfirmModalComponent,
    AdminDashboardComponent,
    UserInfoComponent,
    FooterComponent,
    PasswordConfirmModalComponent,
    ImageCropperComponent,
    ImageViewerComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, RouterModule, NgxSpinnerModule, ImageCropperModule],
  exports: [
    AddUserFormComponent,
    SidebarComponent,
    HeaderComponent,
    UserImgComponent,
    StaffDashboardComponent,
    HodDashboardComponent,
    TableComponent,
    ConfirmModalComponent,
    AdminDashboardComponent,
    UserInfoComponent,
    FooterComponent,
    PasswordConfirmModalComponent,
    ImageCropperComponent,
    ImageViewerComponent,
  ],
})
export class SharedModule {}
