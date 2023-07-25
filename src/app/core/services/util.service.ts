import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserStatus, LeaveStatus } from 'src/app/app.constants';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ILeave } from '../interfaces/leave.interface';
import { IUser } from '../interfaces/user.interface';
import { ImageCropperComponent } from 'src/app/shared/components/image-cropper/image-cropper.component';
import { ImageViewerComponent } from 'src/app/shared/components/image-viewer/image-viewer.component';

@Injectable()
export class UtilService {
  constructor(private spinner: NgxSpinnerService, private modalSvc: NgbModal) {}

  isFieldInvalid(field: string, form: FormGroup, error: string = '') {
    return !form.controls[field].valid && form.controls[field].touched && (error ? form.controls[field].hasError(error) : 1);
  }

  showSpinner(name: string = '') {
    name ? this.spinner.show(name) : this.spinner.show();
  }

  hideSpinner(name: string = '') {
    name ? this.spinner.hide(name) : this.spinner.hide();
  }

  getHttpOptions(filters: any = {}) {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      if (typeof filters[key] !== 'undefined') {
        params = params.append(key, filters[key]);
      }
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params,
    };
    return httpOptions;
  }

  getFormattedDate(date?: NgbDateStruct, dayTime?: 'start' | 'end'): Date {
    const newDate: Date = new Date();
    if (!date) {
      return new Date(newDate);
    }
    let formattedDate = new Date(newDate.setFullYear(date.year, date.month - 1, date.day));
    if (dayTime) {
      if (dayTime === 'start') {
        formattedDate = new Date(formattedDate.setUTCHours(0, 0, 0, 0));
      } else {
        formattedDate = new Date(formattedDate.setUTCHours(23, 59, 59, 999));
      }
    }
    return formattedDate;
  }

  getNgbDate(date?: string | Date): NgbDateStruct {
    date = date ? new Date(date) : new Date();
    return {
      day: date.getUTCDate(),
      month: date.getUTCMonth() + 1,
      year: date.getUTCFullYear(),
    };
  }

  getLeaveStatus(leave: ILeave): string {
    switch (leave.status) {
      case LeaveStatus.PENDING:
        return 'bg-warning';
      case LeaveStatus.REJECTED:
        return 'bg-danger';
      case LeaveStatus.APPROVED:
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }

  getUserStatus(user: IUser): string {
    switch (user.status) {
      case UserStatus.INACTIVE:
        return 'bg-danger';
      case UserStatus.ACTIVE:
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }

  async showConfirmation(msg: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        centered: true,
        keyboard: false,
        size: 'md',
      };
      const modalRef = this.modalSvc.open(ConfirmModalComponent, ngbModalOptions);
      modalRef.componentInstance.msg = msg;
      resolve((await modalRef.result) || false);
    });
  }

  async getCroppedImage(file: File): Promise<Blob | null> {
    return new Promise(async (resolve, reject) => {
      const ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        centered: true,
        keyboard: false,
        size: 'md',
      };
      const modalRef = this.modalSvc.open(ImageCropperComponent, ngbModalOptions);
      modalRef.componentInstance.file = file;
      resolve((await modalRef.result) || null);
    });
  }

  showImageViewer(imgUrl: string): void {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      centered: true,
      keyboard: false,
      size: 'sm',
    };
    const modalRef = this.modalSvc.open(ImageViewerComponent, ngbModalOptions);
    modalRef.componentInstance.imgUrl = imgUrl;
  }
}
