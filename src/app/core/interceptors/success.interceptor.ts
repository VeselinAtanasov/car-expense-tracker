import {
    HttpResponse,
    HttpRequest,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication-service/auth.service';
import { dbDescription } from '../utils/db-config/db-configuration';
import { isArray } from 'util';
import { AdminService } from '../services/admin-service/admin.service';
 

const appKey = dbDescription['appKey']  // APP KEY HERE;
const fakeId = dbDescription['fakeId'];

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private authService: AuthService,
        private adminService :AdminService
    ) { }


    private saveToken(data,adminId) {
        localStorage.setItem('currentUser', JSON.stringify({
            username: data['username'],
            token: data['_kmd']['authtoken'],
            lastName: data['lastName'],
            firstName: data['firstName'],
            email: data['email'],
            userId: data['_id'],
            isAdmin:adminId
        }))
        localStorage.setItem('authToken',data['_kmd']['authtoken'])
        this.authService.importSessionData(localStorage.getItem('currentUser'))
    }

    private checkIsAdmin(response){
        this.adminService.getRoleByUserId(response['_id']).subscribe(data =>{
            let adminId =fakeId;
            if(data.length!==0 && data[0] && data[0]['roleId']){
                adminId=data[0]['roleId']
                this.saveToken(response,adminId);
            }
        })
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(tap((res: HttpEvent<any>) => {

                if (res instanceof HttpResponse && res.ok && res.url.endsWith(appKey) && !Array.isArray(res.body)) {
                    this.toastr.success("Successful registration! Please login", "Success: ")
                    this.router.navigate(['/auth/login'])
                } else if (res instanceof HttpResponse && res.ok && res.url.endsWith('login')) {
                    this.checkIsAdmin(res['body']);
                    this.saveToken(res['body'],fakeId);
                    this.toastr.success('Hello, ' + this.authService.getUserName() + " and  Welcome to Car Expense Tracker", "Success:")
                    this.router.navigate(['/home'])
                } else if (res instanceof HttpResponse && res.ok && res.url.endsWith('logout')) {
                    this.toastr.success('GoodBye, ' + this.authService.getUserName() + "!", "Success:")
                    this.authService.eraseSessionData()
                    localStorage.clear();
                } else if (res instanceof HttpResponse && res.ok && req.url.endsWith('garage') && res['body'] && res['body']['garageName']) {
                    this.toastr.success('You successfully created your own garage: ' + res['body']['garageName'] + "!", "Success:");
                    this.router.navigate(['/garage/my']);
                } else if (res instanceof HttpResponse && res.ok && req.url.endsWith('cars') && res['statusText'] === "Created") {
                    this.toastr.success('You successfully created car: ' + res['body']['carName'] + "!", "Success:");
                    this.router.navigate(['/garage/my']);
                }else if (res instanceof HttpResponse && res.body && res.body['count'] && res.body['count']===1 && req.url.indexOf('cars') !== -1 && !this.adminService.isAdmin()) {
                    this.toastr.success('Successfully deleted!', "Success:");
                    this.router.navigate(['/cars/remove']);
                } else if (res instanceof HttpResponse && req.url.indexOf('details') !== -1) {
                    if (res.body.message) {
                        this.toastr.error(res.body.message);
                        this.router.navigate(['/all']);
                    }
                } 
            }))
    }

}