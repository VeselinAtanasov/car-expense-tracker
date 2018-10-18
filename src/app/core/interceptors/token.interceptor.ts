import {
    HttpResponse,
    HttpRequest,
    HttpEvent,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication-service/auth.service';
import { dbDescription } from '../utils/db-config/db-configuration';
import { AdminService } from '../services/admin-service/admin.service';

const appKey = dbDescription['appKey']  // APP KEY HERE;
const appSecret = dbDescription['appSecret']   // APP SECRET HERE;
const masterSecret = dbDescription['masterSecret']   // APP SECRET HERE;



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private toastr: ToastrService,
        private router: Router,
        private adminService: AdminService,
        private authService: AuthService) { }

    getAuthToken(): string {
        return this.authService.authToken;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.endsWith('user/' + appKey) && request.method === "POST" && this.adminService.isAdmin()) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                }
            })
        }else  if ((request.url.indexOf('role') !==-1) || this.adminService.isAdmin() && !request.url.endsWith('_logout')) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${btoa(`${appKey}:${masterSecret}`)}`,
                    'Content-Type': 'application/json'
                }
            })
        } else if (request.url.endsWith('login') || request.url.endsWith(appKey) || !this.authService.isAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                }
            })
        } else {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Kinvey ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        return next.handle(request)
    }
}