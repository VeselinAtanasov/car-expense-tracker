import { Component, OnInit } from '@angular/core';
import { GarageService } from './../../../core/services/garage-services/garage.service';
import { CarsService } from './../../../core/services/cars-service/cars.service';
import { ExpenseService } from './../../../core/services/expense-service/expense.service';
import { AdminService } from './../../../core/services/admin-service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { CarModel } from './../../../core/models/cars/car.model';
import { GarageModel } from './../../../core/models/garage/garage.model';
import { ExpensesModel } from './../../../core/models/expenses/expenses';
import { UserModel } from '../../../core/models/user/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-garages',
  templateUrl: './admin-garages.component.html',
  styleUrls: ['./admin-garages.component.css']
})
export class AdminGaragesComponent implements OnInit {

  public cars: Array<CarModel>;
  public garages: Array<GarageModel>;
  public expenses: Array<ExpensesModel>;
  public users: Array<UserModel>;
  public userData: Array<Object> = [];
  constructor(
    private location: Location,
    private garageService: GarageService,
    private carService: CarsService,
    private expenseService: ExpenseService,
    private adminService: AdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.garageService.getAllGarages('').subscribe(garages => {
      this.garages = garages;
      this.dataPreparation();
    }, err => this.toastr.error("Error during retrieval garages", "Error: "));

    this.carService.getAllCars().subscribe(cars => {
      this.cars = cars;
      this.dataPreparation();
    }, err => this.toastr.error("Error during retrieval cars", "Error: "));

    this.expenseService.getAllExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.dataPreparation();
    }, err => this.toastr.error("Error during retrieval car expenses", "Error: "));

    this.adminService.getAllUsers().subscribe(users => {
      this.users = users
      this.dataPreparation();
    }, err => this.toastr.error("Error during retrieval users", "Error: "));
  }
  pageReRender(userID: string, carID: string, expenseID: string, garageID: string) {
    let index;
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i]['user']['_id'] === userID) {
        index = i;
      }
    }

    if (index !== undefined) {
      this.userData[index]['garage']['allCars'] = this.userData[index]['garage']['allCars'].filter(c => c['_id'] !== carID);
      this.userData[index]['garage']['cars'] = this.userData[index]['garage']['cars'].filter(c => c !== carID);
    }
  }

  dataPreparation() {
    if (this.cars && this.users && this.expenses && this.garages) {
      for (let user of this.users) {
        let currentUser = {};
        currentUser['user'] = user;
        for (let garage of this.garages) {
          if (garage['_acl']['creator'] === currentUser['user']['_id']) {
            currentUser['garage'] = garage;
            currentUser['garage']['allCars'] = [];
            if (currentUser['garage']['cars'].length === 0) {
              this.userData.push(currentUser);
              continue;
            }
            for (let c of currentUser['garage']['cars']) {
              for (let car of this.cars) {
                if (c === car['_id']) {
                  for (let expense of this.expenses) {
                    if (expense['carId'] === car['_id']) {
                      car['expenses'] = expense;
                    }
                  }
                  currentUser['garage']['allCars'].push(car)
                }
              }
            }
            this.userData.push(currentUser);
          }
        }
      }
    }
  }

  deleteGarage(id: string) {
    this.garageService.deleteGarageByCreatorId(id).subscribe(deletedGarage => {
      this.expenseService.deleteExpensesByCreatorId(id).subscribe(deletedExpense => {
        this.carService.deleteCarByCreatorId(id).subscribe(deletedCar => {
          this.userData.filter(u => u['user']['_id'] !== id)
          this.userData = this.userData.filter(u => u['user']['_id'] !== id)
          this.toastr.success("User successfully deleted!", "Success: ")
        }, err => this.toastr.error("Error during deleting user's car", "Error: "))
      }, err => this.toastr.error("Error during deleting user's expenses", "Error: "))
    }, err => this.toastr.error("Error during deleting user's garage", "Error: "));

  }

  deleteCar(userID: string, carID: string, expenseID: string, garageID: string) {

    this.carService.deleteCar(carID).subscribe(deletedCar => {
      this.expenseService.removeExpenseById(expenseID).subscribe(deletedExpense => {
        this.garageService.getGarageById(garageID).subscribe(garageData => {

          let currentGarage = garageData;
          let custom = currentGarage['cars'].filter(car => car !== carID);
          let garage = {
            garageDescription: currentGarage['garageDescription'],
            garageName: currentGarage['garageName'],
            garagePicture: currentGarage['garagePicture'],
            isPublic: currentGarage['isPublic'],
            cars: custom
          }
          this.garageService.updateGarageById(garageID, garage).subscribe(modifiedGarage => {
            this.pageReRender(userID, carID, expenseID, garageID)
            // window.location.reload()
            this.toastr.success("Successfully deleted a car from garage", "Success: ")

          }, err => this.toastr.error("Error during updating a garage", "Error: "))
        }, err => this.toastr.error("Error during retrieval a garage", "Error: "))
      }, err => this.toastr.error("Error during deleting a expense", "Error: "))
    }, err => this.toastr.error("Error during deleting a car", "Error: "))
  }
}

