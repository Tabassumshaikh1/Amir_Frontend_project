import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { apiResources, LocalStorageKeys } from 'src/app/app.constants';
import { ILoginCredentials } from '../interfaces/credentials.interface';
import { IUpdatePassword } from '../interfaces/reset.interface';
import { ILoginResponse } from '../interfaces/response.interface';
import { IUser } from '../interfaces/user.interface';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';

@Injectable()
export class AuthService {
  get isUserLoggedIn(): boolean {
    return this.storageSvc.isExist(LocalStorageKeys.LOGGED_IN_USER) && this.storageSvc.isExist(LocalStorageKeys.TOKEN);
  }

  get getLoggedInUser(): IUser {
    return this.storageSvc.getItem(LocalStorageKeys.LOGGED_IN_USER);
  }

  constructor(private http: HttpClient, private utilSvc: UtilService, private storageSvc: StorageService) {}

  async login(payload: ILoginCredentials): Promise<IUser> {
    const response = await lastValueFrom(this.http.post<ILoginResponse>(apiResources.login, payload, this.utilSvc.getHttpOptions()));
    this.storageSvc.setItem(LocalStorageKeys.LOGGED_IN_USER, response.user);
    this.storageSvc.setItem(LocalStorageKeys.TOKEN, response.token);
    return response.user;
  }

  async registerUser(payload: FormData): Promise<IUser> {
    return await lastValueFrom(this.http.post<IUser>(apiResources.register, payload));
  }

  async verifyEmail(payload: any): Promise<any> {
    return await lastValueFrom(this.http.post<any>(apiResources.verifyEmail, payload, this.utilSvc.getHttpOptions()));
  }

  async updatePassword(payload: IUpdatePassword): Promise<IUser> {
    return await lastValueFrom(this.http.post<IUser>(apiResources.updatePassword, payload, this.utilSvc.getHttpOptions()));
  }

  async updateMyProfile(payload: FormData): Promise<IUser> {
    const response = await lastValueFrom(this.http.put<IUser>(apiResources.updateMyProfile, payload));
    this.storageSvc.setItem(LocalStorageKeys.LOGGED_IN_USER, response);
    return response;
  }

  logout() {
    try {
      lastValueFrom(this.http.post<IUser>(apiResources.logout, null, this.utilSvc.getHttpOptions()));
    } catch (error) {
      console.error(error);
    }
    this.clearUserData();
    return true;
  }

  clearUserData() {
    this.storageSvc.removeItem(LocalStorageKeys.LOGGED_IN_USER);
    this.storageSvc.removeItem(LocalStorageKeys.TOKEN);
  }
}
