import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent implements OnInit {
  @Input() file: File;

  croppedImage: Blob | null;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.croppedImage = null;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = base64ToFile(event.base64 as string);
  }

  onSubmit() {
    this.activeModal.close(this.croppedImage);
  }

  closeModal(): void {
    this.activeModal.close(null);
  }
}
