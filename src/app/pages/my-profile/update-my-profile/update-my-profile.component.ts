import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { allowedImageTypes } from 'src/app/app.constants';
import { AppValidators } from 'src/app/core/classes/app-validator.class';
import { AppNotificationService } from 'src/app/core/services/app-notification.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/core/services/util.service';
import { PasswordConfirmModalComponent } from 'src/app/shared/components/password-confirm-modal/password-confirm-modal.component';

@Component({
  selector: 'app-update-my-profile',
  templateUrl: './update-my-profile.component.html',
  styleUrls: ['./update-my-profile.component.css'],
})
export class UpdateMyProfileComponent implements OnInit {
  @ViewChild('imgRef') imgRef: ElementRef;
  updateProfileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public utilSvc: UtilService,
    private notifySvc: AppNotificationService,
    private authSvc: AuthService,
    private modalSvc: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateProfileForm = this.formBuilder.group({
      profileImage: ['', [AppValidators.fileType(allowedImageTypes), AppValidators.fileSize()]],
      name: ['', [Validators.required, AppValidators.customRequired]],
      userName: ['', [Validators.required, AppValidators.customRequired]],
      email: ['', [Validators.required, AppValidators.email]],
      contactNumber: ['', [Validators.required, AppValidators.contact]],
    });

    this.initData();
  }

  initData() {
    const loggedInUser = this.authSvc.getLoggedInUser;
    this.updateProfileForm.patchValue({
      name: loggedInUser.name || '',
      userName: loggedInUser.userName || '',
      email: loggedInUser.email || '',
      contactNumber: loggedInUser.contactNumber || '',
    });
  }

  async onImageChange(event: any) {
    let file: File = event && event.target.files.length ? event.target.files[0] : null;
    this.updateProfileForm.controls['profileImage'].setValue(file || null, { emitModelToViewChange: false });

    if (file && this.updateProfileForm.controls['profileImage'].valid) {
      const croppedImage = await this.utilSvc.getCroppedImage(file);
      if (croppedImage) {
        this.updateProfileForm.controls['profileImage'].setValue(croppedImage || null, { emitModelToViewChange: false });
      } else {
        this.updateProfileForm.controls['profileImage'].setValue(null);
        this.imgRef.nativeElement.value = '';
      }
    }
  }

  async onSubmit() {
    try {
      if (this.updateProfileForm.invalid) {
        this.updateProfileForm.markAllAsTouched();
        return;
      }
      const password = await this.getUserPassword();
      if (!password) {
        return;
      }
      this.utilSvc.showSpinner();
      const profileData: any = this.updateProfileForm.value;
      const formData: FormData = new FormData();
      formData.append('name', profileData.name || '');
      formData.append('userName', profileData.userName || '');
      formData.append('email', profileData.email || '');
      formData.append('contactNumber', profileData.contactNumber || '');
      formData.append('password', password || '');
      if (profileData.profileImage) {
        formData.append('profileImage', profileData.profileImage);
      }
      await this.authSvc.updateMyProfile(formData);
      this.notifySvc.success('Profile Updated Successfully');
      this.router.navigate(['/profile']);
    } catch (error) {
      this.notifySvc.error(error);
    } finally {
      this.utilSvc.hideSpinner();
    }
  }

  async getUserPassword(): Promise<string | null> {
    return new Promise(async (resolve, reject) => {
      const ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        centered: true,
        keyboard: false,
        size: 'md',
      };
      const modalRef = this.modalSvc.open(PasswordConfirmModalComponent, ngbModalOptions);
      resolve((await modalRef.result) || null);
    });
  }
}
