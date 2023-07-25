import { LeaveStatus } from 'src/app/app.constants';
import { IDepartment } from './department.interface';
import { IUser } from './user.interface';

export interface ILeave {
  _id: string;
  fromDate: Date | string;
  toDate: Date | string;
  reason: string;
  status: `${LeaveStatus}`;
  user: IUser;
  department: IDepartment;
  createdAt: Date | string;
  updatedAt: Date | string;
}
