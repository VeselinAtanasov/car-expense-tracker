import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin-service/admin.service';



@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private adminService: AdminService,
        private router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.check();
    }

    check(): boolean {
        let currentUserID = JSON.parse(localStorage.getItem('currentUser'))['userId']
        return Observable.create(observer => {

            this.adminService.getRoleByUserId(currentUserID).subscribe(data => {
                if(data.length!==0){
                    observer.next(data.length !== 0)
                }else{
                    this.router.navigate(['/'])
                    observer.next(data.length === 0)
                }
            })
        })
    }
}