import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppValidators } from 'src/app/core/classes/app-validator.class';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-password-confirm-modal',
  templateUrl: './password-confirm-modal.component.html',
  styleUrls: ['./password-confirm-modal.component.css'],
})
export class PasswordConfirmModalComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, public utilSvc: UtilService) {}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.activeModal.close(this.passwordForm.controls['password'].value);
  }

  closeModal(): void {
    this.activeModal.close(null);
  }
}
