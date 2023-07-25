import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { apiResources } from 'src/app/app.constants';
import { ILeaveFilters } from '../interfaces/filter.interface';
import { ILeave } from '../interfaces/leave.interface';
import { IListResponse } from '../interfaces/response.interface';
import { UtilService } from './util.service';

@Injectable()
export class LeaveService {
  constructor(private http: HttpClient, private utilSvc: UtilService) {}

  async addLeave(payload: ILeave): Promise<ILeave> {
    return await lastValueFrom(this.http.post<ILeave>(apiResources.leave, payload, this.utilSvc.getHttpOptions()));
  }

  async getLeaves(filters: ILeaveFilters): Promise<IListResponse> {
    return await lastValueFrom(this.http.get<IListResponse>(apiResources.leave, this.utilSvc.getHttpOptions(filters)));
  }

  async getSingleLeave(id: string): Promise<ILeave> {
    return await lastValueFrom(this.http.get<ILeave>(`${apiResources.leave}/${id}`));
  }

  async updateLeave(id: string, payload: any) {
    return await lastValueFrom(this.http.put<ILeave>(`${apiResources.leave}/${id}`, payload, this.utilSvc.getHttpOptions()));
  }

  async updateLeaveStatus(id: string, action: string) {
    return await lastValueFrom(this.http.post<ILeave>(`${apiResources.leave}/${id}/${action}`, null, this.utilSvc.getHttpOptions()));
  }

  async deleteLeave(id: string): Promise<ILeave> {
    return await lastValueFrom(this.http.delete<ILeave>(`${apiResources.leave}/${id}`));
  }

  async getLeaveCount(filters?: ILeaveFilters): Promise<number> {
    const response = await lastValueFrom(this.http.get<IListResponse>(apiResources.leave, this.utilSvc.getHttpOptions(filters)));
    return response.total || 0;
  }
}
