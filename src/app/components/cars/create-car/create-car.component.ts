import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CarModel } from '../../../core/models/cars/car.model';
import { CarsService } from '../../../core/services/cars-service/cars.service';
import { GarageService } from '../../../core/services/garage-services/garage.service';
import { ExpenseService } from '../../../core/services/expense-service/expense.service';
import { ExpensesModel } from '../../../core/models/expenses/expenses';

const urlValidator: RegExp = /^(ftp|http|https):\/\/[^ "]+$/;
const priceRegex: RegExp = /^(\+?(0|[1-9]\d*))(\.(0|[0-9]\d*))?$/;

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

  public carForm: FormGroup;
  public currentCarModel: CarModel;
  public editCarModel: CarModel;
  @Input('carId') carId: any;
  @Output() carEmitter = new EventEmitter<any>()
  constructor(
    private carService: CarsService,
    private garageService: GarageService,
    private expenseService: ExpenseService
  ) { }

  initForm() {
    this.carForm = new FormGroup({
      'carName': new FormControl('', [
        Validators.required
      ]),
      'carBrand': new FormControl(''),
      'carModel': new FormControl(''),
      'carDescription': new FormControl('', [
        Validators.required
      ]),
      'initialInvestment': new FormControl('', [
        Validators.required,
        Validators.pattern(priceRegex)
      ]),
      'carPicture': new FormControl('', [
        Validators.pattern(urlValidator),
        Validators.required,
      ]),
    });
  }
  ngOnInit() {
    this.initForm();

    if (this.carId) {
      this.carService.getCarById(this.carId).subscribe(data => {
        this.editCarModel = data;
        this.carForm.patchValue({ ...data })
      })
    }

  }
  get carName(): AbstractControl {
    return this.carForm.get('carName');
  }
  get carBrand(): AbstractControl {
    return this.carForm.get('carBrand');
  }
  get carModel(): AbstractControl {
    return this.carForm.get('carModel');
  }
  get carDescription(): AbstractControl {
    return this.carForm.get('carDescription');
  }
  get initialInvestment(): AbstractControl {
    return this.carForm.get('initialInvestment');
  }
  get carPicture(): AbstractControl {
    return this.carForm.get('carPicture');
  }

  createCar() {

    if (this.carId) {
      let obj = {
        edited: this.carForm.value,
        original: this.editCarModel
      }
      this.carEmitter.emit(obj);
      return;
    }

    this.carForm.value['garageId'] = ''
    this.carService.createCar(this.carForm.value).subscribe(data => {
      this.currentCarModel = new CarModel(data['carName'], data['garageId'], data['carDescription'], data['carBrand'], data['carModel'], data['initialInvestment'], data['carPicture'])
      let carId = data['_id'];
      let creatorId = data['_acl']['creator']
      let carInvestment = data['initialInvestment'];

      this.garageService
        .getMyGarage(creatorId)
        .subscribe(resp => {
          let garage = resp[0]
          let garageId = garage['_id'];
          let allCars = garage['cars'];
          allCars.push(carId)

          this.currentCarModel['garageId'] = garageId




          this.carService.updateCarById(carId, this.currentCarModel).subscribe();

          //Create record for expenses:
          const carExpense = new ExpensesModel(carId, garageId, Number(carInvestment), 0, 0, 0, 0, 0, 0, 0)
          this.expenseService.initExpenseForCarId(carExpense).subscribe()

          let garageData = {
            garageDescription: garage['garageDescription'],
            garageName: garage['garageName'],
            garagePicture: garage['garagePicture'],
            isPublic: garage['isPublic'],
            cars: allCars
          }
          this.garageService.updateGarageById(garageId, garageData).subscribe()
        }, err => console.log(err))
    }, err => console.log(err))
  }

}
