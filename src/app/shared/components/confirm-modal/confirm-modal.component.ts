import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() public msg: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal(result: boolean = false): void {
    this.activeModal.close(result);
  }
}
