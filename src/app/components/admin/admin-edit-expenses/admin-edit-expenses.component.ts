import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { ExpenseService } from '../../../core/services/expense-service/expense.service';

@Component({
  selector: 'app-admin-edit-expenses',
  templateUrl: './admin-edit-expenses.component.html',
  styleUrls: ['./admin-edit-expenses.component.css']
})
export class AdminEditExpensesComponent implements OnInit {

  public id :string;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private expenseService: ExpenseService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  getExpenseProfileAndUpdate(event){
    let expense = event['edited'];
    expense['carId']=event['original']['carId']
    expense['garageId']=event['original']['garageId']
    expense['initialInvestment']=event['original']['initialInvestment']

    this.expenseService.getExpensesByCarId(this.id).subscribe(resp => {
     
      let expenseId = resp[0]['_id'];
      this.expenseService.updateExpenseById(expenseId,expense).subscribe(edited =>{
        
      this.toastr.success("You just modified expense content!", "Success: ")
      this.router.navigate(['/admin/garages'])
      }, err => this.toastr.error("Error during retrieval of expense!", "Error: "))
    }, err => this.toastr.error("Error during retrieval of expense!", "Error: "))
  }

}
