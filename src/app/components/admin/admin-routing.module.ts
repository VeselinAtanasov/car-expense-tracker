import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminModifyComponent } from './admin-modify/admin-modify.component';
import { AdminGaragesComponent } from './admin-garages/admin-garages.component';
import { AdminEditGarageComponent } from './admin-edit-garage/admin-edit-garage.component';
import { AdminEditExpensesComponent } from './admin-edit-expenses/admin-edit-expenses.component';
import { AdminEditCarComponent } from './admin-edit-car/admin-edit-car.component';


const adminRoutes: Routes = [
  { path: 'panel', component: AdminPanelComponent },
  { path: 'users', component: AdminUsersComponent },
  { path: 'register', component: AdminRegisterComponent },
  { path: 'editUser/:id', component: AdminModifyComponent },
  { path: 'garages', component: AdminGaragesComponent },
  { path: 'modifyGarage/:id', component: AdminEditGarageComponent },
  { path: 'expenseEdit/:id', component: AdminEditExpensesComponent },
  { path: 'carEdit/:id', component: AdminEditCarComponent },

]

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
 
exports: [RouterModule]
})
export class AdminRoutingModule { }
