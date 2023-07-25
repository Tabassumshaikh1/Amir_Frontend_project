import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-user-img',
  templateUrl: './user-img.component.html',
  styleUrls: ['./user-img.component.css'],
})
export class UserImgComponent implements OnInit {
  @Input() imgSize: number = 40;
  @Input() imagePath: string | undefined | File;
  @Input() hideImageFromViewer: boolean = false;

  constructor(private utilSvc: UtilService) {}

  ngOnInit(): void {}

  showImageInViewer() {
    if (!this.hideImageFromViewer) {
      this.utilSvc.showImageViewer(this.imagePath as string);
    }
  }
}
