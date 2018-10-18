import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { CarsService } from './../../../core/services/cars-service/cars.service';
import { ExpenseService } from '../../../core/services/expense-service/expense.service';


@Component({
  selector: 'app-admin-edit-car',
  templateUrl: './admin-edit-car.component.html',
  styleUrls: ['./admin-edit-car.component.css']
})
export class AdminEditCarComponent implements OnInit {

  public id: string
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private carService: CarsService,
    private expenseService: ExpenseService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  getCarProfileAdnUpdate(event) {

    let car = event['edited']
    car['garageId'] = event['original']['garageId']

    if (event['edited']['initialInvestment'] !== event['original']['initialInvestment']) {
      this.expenseService.getExpensesByCarId(this.id).subscribe(expense => {
        let currentExpense = {
          accessories: expense[0]['accessories'],
          carId: expense[0]['carId'],
          cleaning: expense[0]['cleaning'],
          consumables: expense[0]['consumables'],
          carRepair: expense[0]['carRepair'],
          fuel: expense[0]['fuel'],
          garageId: expense[0]['garageId'],
          initialInvestment: car['initialInvestment'],
          others: expense[0]['others'],
          taxes: expense[0]['taxes'],
        }
        this.expenseService.updateExpenseById(expense[0]['_id'], currentExpense).subscribe(updated => {
          this.carService.updateCarById(this.id, car).subscribe(resp => {
            this.toastr.success("You just modified the car content!", "Success: ")
            this.router.navigate(['/admin/garages'])
          }, err => this.toastr.error("Error during car modification!", "Error: "))
        }, err => this.toastr.error("Error during expense modification!", "Error: "))
      })
      return;
    }
    this.carService.updateCarById(this.id, car).subscribe(resp => {
      this.toastr.success("You just modified the car content!", "Success: ")
      this.router.navigate(['/admin/garages'])
    }, err => this.toastr.error("Error during car modification!", "Error: "))

  }

}
