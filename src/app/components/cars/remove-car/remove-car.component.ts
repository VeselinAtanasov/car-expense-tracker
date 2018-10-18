import { Component, OnInit } from '@angular/core';
import { CarModel } from '../../../core/models/cars/car.model';
import { CarsService } from '../../../core/services/cars-service/cars.service';
import { GarageService } from '../../../core/services/garage-services/garage.service';
import { AuthService } from '../../../core/services/authentication-service/auth.service';
import { ExpenseService } from '../../../core/services/expense-service/expense.service';

@Component({
  selector: 'app-remove-car',
  templateUrl: './remove-car.component.html',
  styleUrls: ['./remove-car.component.css']
})
export class RemoveCarComponent implements OnInit {

  public userID: string
  public cars: Array<CarModel>
  constructor(
    private carService: CarsService,
    private garageService: GarageService,
    private expenseService: ExpenseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userID = JSON.parse(localStorage.getItem('currentUser'))['userId']
    if (!this.userID) {
      return
    }
    this.carService.getAllCarsByUserID(this.userID).subscribe(data => {
      this.cars = data
    })
  }

  deleteCar(id: string) {

    this.carService.deleteCar(id).subscribe()
    this.garageService.getMyGarage(this.userID).subscribe(resp => {

      this.cars = this.cars.filter(car => car['_id'] !== id)
      let custom = this.cars.map(car => car['_id'])
      let myGarage = resp[0];

      let garageData = {
        garageDescription: myGarage['garageDescription'],
        garageName: myGarage['garageName'],
        garagePicture: myGarage['garagePicture'],
        isPublic: myGarage['isPublic'],
        cars: custom
      }
      this.garageService.updateGarageById(myGarage['_id'], garageData).subscribe()
      this.expenseService.getExpensesByCarId(id).subscribe(data => {
        this.expenseService.removeExpenseById(data[0]['_id']).subscribe()
      })

    })
  }
}
