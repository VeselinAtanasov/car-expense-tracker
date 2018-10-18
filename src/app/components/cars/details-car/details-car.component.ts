import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { CarsService } from '../../../core/services/cars-service/cars.service';
import { CarModel } from '../../../core/models/cars/car.model';
import { ExpenseService } from '../../../core/services/expense-service/expense.service';
import { ExpensesModel } from '../../../core/models/expenses/expenses';

@Component({
  selector: 'app-details-car',
  templateUrl: './details-car.component.html',
  styleUrls: ['./details-car.component.css']
})
export class DetailsCarComponent implements OnInit {

  public carId: string;
  public car: CarModel
  public expense: ExpensesModel;
  constructor(
    private route: ActivatedRoute,
    private carService: CarsService,
    private expenseService: ExpenseService
  ) { }

  ngOnInit() {
    this.carId = this.route.snapshot.paramMap.get('id');

    this.carService.getCarById(this.carId).subscribe(data => {
      this.car = data
    })

    this.expenseService.getExpensesByCarId(this.carId).subscribe(expenses => {
      this.expense = expenses[0]
    })
  }

}
