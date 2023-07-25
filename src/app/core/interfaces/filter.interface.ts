import { LeaveStatus, SortBy } from 'src/app/app.constants';

interface CommonFilters {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortBy?: `${SortBy}`;
}

export interface IDepartmentFilters extends CommonFilters {}

export interface ILeaveFilters extends CommonFilters {
  reason_like?: string;
  status?: `${LeaveStatus}`;
  user?: string;
  department?: string;
  fromDate?: any;
  toDate?: any;
}

export interface IUserFilters extends CommonFilters {
  department?: string;
  status?: string;
}
