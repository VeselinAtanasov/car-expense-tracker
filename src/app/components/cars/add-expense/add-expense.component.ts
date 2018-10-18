import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { CarModel } from '../../../core/models/cars/car.model';
import { CarsService } from '../../../core/services/cars-service/cars.service';
import { ExpenseService } from '../../../core/services/expense-service/expense.service';
import { ExpensesModel } from '../../../core/models/expenses/expenses';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';


const priceRegex: RegExp = /^(\+?(0|[1-9]\d*))(\.(0|[0-9]\d*))?$/;

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  public carId: string;
  public car: CarModel;
  public expenseForm: FormGroup;
  public originalExpense : ExpensesModel

  @Input('editCarId') editCarId: any;
  @Output() expenseEmitter = new EventEmitter<any>()
  constructor(
    private route: ActivatedRoute,
    private carService: CarsService,
    private expenseService: ExpenseService,
    private toastr: ToastrService,
    private router: Router,
  ) { }


  initExpenseForm() {
    this.expenseForm = new FormGroup({
      'initialInvestment': new FormControl({ value: '', disabled: true }, [
        Validators.pattern(priceRegex)
      ]),
      'fuel': new FormControl(0, [
        Validators.pattern(priceRegex)
      ]),
      'others': new FormControl(0, [
        Validators.pattern(priceRegex)
      ]),
      'carRepair': new FormControl(0, [
        Validators.pattern(priceRegex)
      ]),
      'consumables': new FormControl(0, [
        Validators.pattern(priceRegex)
      ]),
      'accessories': new FormControl(0, [
        Validators.pattern(priceRegex)
      ]),
      'cleaning': new FormControl(0, [
        Validators.pattern(priceRegex)
      ]),
      'taxes': new FormControl(0, [
        Validators.pattern(priceRegex)
      ]),
    });
  }

  ngOnInit() {

    if(this.editCarId){
      
      this.initExpenseForm();
      this.expenseService.getExpensesByCarId(this.editCarId)
        .subscribe(expenses => {
          this.originalExpense=expenses[0];
          this.expenseForm.patchValue({ ...expenses[0]})
        })
      return;
    }
    this.carId = this.route.snapshot.paramMap.get('id');
    this.initExpenseForm();
    this.expenseService.getExpensesByCarId(this.carId)
      .subscribe(expenses => {
        this.expenseForm.patchValue({ initialInvestment: expenses[0]['initialInvestment'] })
      })

    this.carService.getCarById(this.carId).subscribe(data => {
      this.car = data
    })
  }

  dataNormalization(input: Object) {
    for (let prop in input) {
      if (input[prop] === null) {
        input[prop] = 0;
      }
      input[prop] = Math.round(input[prop] * 100) / 100;
    }
  }

  updateCarExpenses() {
    this.dataNormalization(this.expenseForm.value);
    if(this.editCarId){
      let obj = {
        edited: this.expenseForm.value,
        original: this.originalExpense
      }
      this.expenseEmitter.emit(obj);
      return;
    }
    
    this.expenseForm.value['carId'] = this.carId;
    this.expenseForm.value['garageId'] = this.car['garageId'];
    let currentExpense = Object.assign(this.expenseForm.value);

    this.expenseService.getExpensesByCarId(this.carId).subscribe(expenses => {
      let expense = expenses[0];
      this.objectModifier(currentExpense, expense)
      currentExpense['initialInvestment'] = expense['initialInvestment']

      this.expenseService.updateExpenseById(expense['_id'], currentExpense).subscribe(response => {
        this.toastr.success('You just add an expense', "Success:");
        this.router.navigate(['/cars/details/' + this.carId])
      }, err => console.log(err))
    })
  }

  objectModifier(currentExpense, expense) {
    for (let e in currentExpense) {
      if (expense.hasOwnProperty(e) && e !== 'carId' && e !== 'garageId') {
        if (e !== 'initialInvestment') {
          currentExpense[e] += expense[e]
        } else {
          currentExpense[e] = expense[e]
        }
      }
    }
  }

  get initialInvestment(): AbstractControl {
    return this.expenseForm.get('initialInvestment');
  }
  get fuel(): AbstractControl {
    return this.expenseForm.get('fuel');
  }
  get others(): AbstractControl {
    return this.expenseForm.get('others');
  }
  get carRepair(): AbstractControl {
    return this.expenseForm.get('carRepair');
  }
  get consumables(): AbstractControl {
    return this.expenseForm.get('consumables');
  }
  get accessories(): AbstractControl {
    return this.expenseForm.get('accessories');
  }
  get cleaning(): AbstractControl {
    return this.expenseForm.get('cleaning');
  }
  get taxes(): AbstractControl {
    return this.expenseForm.get('taxes');
  }
}
