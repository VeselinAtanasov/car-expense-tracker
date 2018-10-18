import { Component, OnInit } from '@angular/core';
import { GarageModel } from '../../../core/models/garage/garage.model';
import { CarModel } from '../../../core/models/cars/car.model';
import { GarageService } from '../../../core/services/garage-services/garage.service';
import { CarsService } from '../../../core/services/cars-service/cars.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-details-garage',
  templateUrl: './details-garage.component.html',
  styleUrls: ['./details-garage.component.css']
})
export class DetailsGarageComponent implements OnInit {

  public userID: string;
  public garageID: string
  public garageData: GarageModel;
  public cars: Array<CarModel>
  constructor(
    private route: ActivatedRoute,
    private garageService: GarageService,
    private carService: CarsService
  ) { }

  ngOnInit() {
    this.garageID = this.route.snapshot.paramMap.get('id');
    this.garageService
      .getGarageById(this.garageID)
      .subscribe(data => {
        this.garageData = data
        this.userID = data['_acl']['creator'];
        this.carService.getAllCarsByUserID(this.userID).subscribe(cars => {   this.cars = cars })
      })
  }
}
