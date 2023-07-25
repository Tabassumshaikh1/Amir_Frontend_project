import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';

@NgModule({
  declarations: [DepartmentListComponent, AddEditDepartmentComponent],
  imports: [CommonModule, DepartmentRoutingModule, NgbModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class DepartmentModule {}
