import { Component, OnInit } from '@angular/core';
import { GarageService } from '../../../core/services/garage-services/garage.service';
import { GarageModel } from '../../../core/models/garage/garage.model';
import { AuthService } from '../../../core/services/authentication-service/auth.service';
import { AdminService } from './../../../core/services/admin-service/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentPage: number = 1;
  public pageSize: number = 6;

  public allPublicGarages: Array<GarageModel>;
  public isAuth: any;

  constructor(
    private garageService: GarageService,
    private authService: AuthService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated()

    if (this.isAuth) {
      if (this.adminService.isAdmin()) {
        this.garageService.getAllGarages('').subscribe(data => {
          this.allPublicGarages = data
        })
      } else {
        this.garageService.getAllGarages('public').subscribe(data => {
          this.allPublicGarages = data
        })
      }

    }
  }

  pageChange(page) {
    this.currentPage = page

  }

}
