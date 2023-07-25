import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { apiResources } from 'src/app/app.constants';
import { IUserFilters } from '../interfaces/filter.interface';
import { IListResponse } from '../interfaces/response.interface';
import { IUser } from '../interfaces/user.interface';
import { UtilService } from './util.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private utilSvc: UtilService) {}

  async getUsers(filters: IUserFilters): Promise<IListResponse> {
    return await lastValueFrom(this.http.get<IListResponse>(apiResources.user, this.utilSvc.getHttpOptions(filters)));
  }

  async getSingleUser(id: string): Promise<IUser> {
    return await lastValueFrom(this.http.get<IUser>(`${apiResources.user}/${id}`));
  }

  async addUser(payload: FormData): Promise<IUser> {
    return await lastValueFrom(this.http.post<IUser>(apiResources.user, payload));
  }

  async updateUserStatus(id: string, action: string): Promise<IUser> {
    const url = `${apiResources.user}/${id}/${action}`;
    return await lastValueFrom(this.http.post<IUser>(url, null, this.utilSvc.getHttpOptions()));
  }

  async getUsersCount(filters?: IUserFilters): Promise<number> {
    const response = await lastValueFrom(this.http.get<IListResponse>(apiResources.user, this.utilSvc.getHttpOptions(filters)));
    return response.total || 0;
  }

  async deleteUser(id: string): Promise<boolean> {
    await lastValueFrom(this.http.delete<any>(`${apiResources.user}/${id}`));
    return true;
  }
}
