import { Component, OnInit } from '@angular/core';
import { GarageService } from '../../../core/services/garage-services/garage.service';
import { AuthService } from '../../../core/services/authentication-service/auth.service';
import { GarageModel } from '../../../core/models/garage/garage.model';
import { CarsService } from '../../../core/services/cars-service/cars.service';
import { CarModel } from '../../../core/models/cars/car.model';

@Component({
  selector: 'app-my-garage',
  templateUrl: './my-garage.component.html',
  styleUrls: ['./my-garage.component.css']
})
export class MyGarageComponent implements OnInit {

  public garageId: string;
  public userID: string;
  public garageData: Array<GarageModel>;
  public cars: Array<CarModel>
  constructor(
    private garageService: GarageService,
    private authService: AuthService,
    private carService: CarsService
  ) { }

  ngOnInit() {
    this.userID = JSON.parse(localStorage.getItem('currentUser'))['userId']
    if (!this.userID) {
      return
    }
    this.garageService
      .getMyGarage(this.userID)
      .subscribe(data => {

        this.garageData = data
        if (this.garageData.length === 0) {
          return
        }
        this.garageId = data[0]['_id']
        this.carService.getAllCarsByUserID(this.userID).subscribe(data => { this.cars = data })
      })
  }

}
