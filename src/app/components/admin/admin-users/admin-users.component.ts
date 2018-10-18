import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin-service/admin.service';
import { UserModel } from '../../../core/models/user/user.model';
import { GarageService } from './../../../core/services/garage-services/garage.service';
import { ExpenseService } from './../../../core/services/expense-service/expense.service';
import { CarsService } from './../../../core/services/cars-service/cars.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {


  public users: Array<UserModel>;
  constructor(
    private toastr: ToastrService,
    private adminService: AdminService,
    private garageService: GarageService,
    private expenseService: ExpenseService,
    private carService: CarsService,
    private route: Router
  ) { }

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(data => {
      let users = data.filter(e => !e['_kmd']['status']);
      this.users = users
    })
  }

  deleteUser(id: string): void {
    this.garageService.deleteGarageByCreatorId(id).subscribe(deletedGarage => {
      this.expenseService.deleteExpensesByCreatorId(id).subscribe(deletedExpense => {
        this.carService.deleteCarByCreatorId(id).subscribe(deletedCar => {
          this.adminService.deleteUser(id).subscribe(deletedUser => {
            this.users = this.users.filter(user => user['_id'] !== id)
            this.toastr.success("User successfully deleted!", "Success: ")
          }, err => this.toastr.error("Error during deleting user", "Error: "))
        }, err => this.toastr.error("Error during deleting user's car", "Error: "))
      }, err => this.toastr.error("Error during deleting user's expenses", "Error: "))
    }, err => this.toastr.error("Error during deleting user's garage", "Error: "));
  }
  makeAnAdmin(id: string): void {
    this.adminService.getRoleByUserId(id).subscribe(role => {
      if (role.length !== 0) {
        this.toastr.error("This user is already an Admin!", "Error: ")
        return;
      }
      this.adminService.assignRoleToUser(id, this.adminService.getAdminRoleId()).subscribe(data => {
        this.ngOnInit()
        this.toastr.success("You just added this user as an Admin!", "Success: ")
      }, err => this.toastr.error("Error during assignment of Admin role to a user", "Error: "))
    }, err => this.toastr.error("Error during retrieval user roles!", "Error: "))
  }
  removeFromAdmin(id: string): void {
    this.adminService.getRoleByUserId(id).subscribe(role => {
      if (role.length === 0) {
        this.toastr.error("This user is not an Admin!", "Error: ")
        return;
      }
      this.adminService.deleteRoleFromUser(id, this.adminService.getAdminRoleId()).subscribe(data => {
        this.ngOnInit()
        this.toastr.success("You just removed Admin role from user!", "Success: ")
      }, err => this.toastr.error("Error during assignment of Admin role to a user", "Error: "))
    }, err => this.toastr.error("Error during retrieval user roles!", "Error: "))
  }

}
