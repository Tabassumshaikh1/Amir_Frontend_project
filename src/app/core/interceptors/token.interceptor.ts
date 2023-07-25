import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from 'src/app/app.constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService, private storageSvc: StorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authSvc.isUserLoggedIn) {
      const token = this.storageSvc.getItem(LocalStorageKeys.TOKEN);
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { authorization: `Bearer ${token}` },
      });
    }
    return next.handle(request);
  }
}
